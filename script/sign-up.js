// Events for the sign-up page
$(document).ready(function() {

  console.log('sign-up.js');

  // Form submit
  $('.sign-up-page form').on('submit', (event) => {
    event.preventDefault();

    //Remove error classes
    $('#email').removeClass('error');
    $('#password').removeClass('error');
    $('#confirmPassword').removeClass('error');

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
      $('#email').addClass('error');
      return;
    }

    // Validate the password minimum length
    if (password.length < 6) {
      errorMessage('The password must have at least 6 characters');
      $('#password').addClass('error');
      return;
    }

    // Validate if password was confirmed properly
    if (password != confirmPassword) {
      errorMessage('Password was not confirmed properly');
      $('#confirmPassword').addClass('error');
      return;
    }

    var jsonData = `{\"firstName\":\"${firstname}\", \"lastName\":\"${lastname}\", \"jobTitle\":\"${jobTitle}\", \"username\": \"${username}\", \"password\": \"${password}\"}`;
    $.ajax({
      "async": true,
      "crossDomain": true,
      "dataType": "json",
      "url": endpoint + "users/",
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
