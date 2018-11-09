// Events for the sign-up page
$(document).ready(function() {

  console.log('sign-up.js');

  // Form submit
  $('.sign-up-page form').on('submit', (event) => {
    event.preventDefault();

    // Retrieve all information from user input
    var firstname = $('#firstname').val();
    var lastname = $('#lastname').val();
    var jobTitle = $('#jobTitle').val();
    var username = $('#email').val();
    var password = $('#password').val();
    var confirmPassword = $('#confirmPassword').val();

    // Validate the input
    if (firstname == '' || lastname == '' || password == '' || jobTitle == '' || username == '' || password == '' || confirmPassword == '') {
      errorMessage('All fields are required');
      return;
    }

    // Validate email format
    if (!validateEmail(username)) {
      errorMessage('Invalid e-mail address');
      return;
    }

    // Validate if password was confirmed properly
    if (password != confirmPassword) {
      errorMessage('Password was not confirmed properly');
      return;
    }

    var jsonData = `{\"firstName\":\"${firstname}\", \"lastName\":\"${lastname}\", \"jobTitle\":\"${jobTitle}\", \"username\": \"${username}\", \"password\": \"${password}\"}`;
    $.ajax({
      "async": true,
      "crossDomain": true,
      "dataType": "json",
      "url": "http://localhost/feedballoon-api/api/users/",
      "method": "POST",
      "headers": {
        "Authorization": localStorage.basicAuthInfo,
        "Cache-Control": "no-cache"
      },
      "processData": false,
      "contentType": false,
      "mimeType": "multipart/form-data",
      "data": jsonData,

      success: function(response) {
        console.log('success', response);
        sucessMessage('Your account was created succesfully');
        navigate('sign-in.html');
      },

      error: function(req, status, error) {
        console.log('error', req, status, error);
        errorMessage('An error occured: ' + JSON.parse(req.responseText).message);
      },

      fail: function() {
        console.log('fail');
      }
    });

  });
});
