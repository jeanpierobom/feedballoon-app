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
    var email = $('#email').val();
    var password = $('#password').val();
    var confirmPassword = $('#confirmPassword').val();
    var formData = {
      firstname: firstname,
      lastname: lastname,
      jobTitle: jobTitle,
      email: email,
      password: password
    };

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
      "mimeType": "multipart/form-data",
      "body": formData,

      success: function(response) {
        console.log('success', response);
        alert('User was created succesfully');
        // TODO redirect to sign-in
        // navigate('sign-in.html');
      },

      error: function(req, status, error) {
        console.log('error', req, status, error);
        var userInfo = jQuery.parseJSON(req.responseText);
        alert(userInfo.message);
      },

      fail: function() {
        console.log('fail');
        alert('fail');
      }
    });
  });

});
