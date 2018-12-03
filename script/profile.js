// This function loads the user info
var getUserInfo = (id) => {
  debug('getUserInfo');
  $.ajax({
    "async": true,
    "crossDomain": true,
    "dataType": "json",
    "url": endpoint + "users/" + id,
    "method": "GET",
    "headers": {
      "Authorization": localStorage.basicAuthInfo,
      "Cache-Control": "no-cache"
    },

    success: function(response) {
      debug('success', response);

      // Update the user name
      $('.headerMiddle-leftBox .name').val(response.data.name);

      // Update the user initials
      $('.initials_text').text(response.data.name_initials);

      // Update the user email
      $('.headerMiddle-leftBox .email').val(response.data.username);

      // Update the job title
      $('.jobTitle .inputBox').val(response.data.job_title);

      //TODO remove this code
      $('.company').hide();
      $('.location').hide();

    },

    error: function(req, status, error) {
      debug('error', req, status, error);
      try {
        var userInfo = jQuery.parseJSON(req.responseText);
        errorMessage(userInfo.message);
      } catch (err) {
        defaultErrorMessage();
      }
    },

    fail: function() {
      debug('fail');
    }
  });
}


// Events for the profile page
$(document).ready(function() {

  debug('profile.js');
  setupFooterMenuActions();

  let userId = localStorage.userId;
  getUserInfo(userId);

  // Event for logout
  $('#logOut').on('click', () => {
    logout();
  });

  // Form submit
  $('.profile-wrapper form').on('submit', (event) => {
    event.preventDefault();

    //Remove error classes
    $('#newPassword').removeClass('error');
    $('#confirmNewPassword').removeClass('error');

    // Retrieve all information from user input
    var password = $('#newPassword').val();
    var confirmPassword = $('#confirmNewPassword').val();

    // Validate the input
    if (password == '' || confirmPassword == '') {
      errorMessage('All fields are required');
      return;
    }

    // Validate the password minimum length
    if (password.length < 6) {
      errorMessage('The new password must have at least 6 characters');
      $('#newPassword').addClass('error');
      return;
    }

    // Validate if password was confirmed properly
    if (password != confirmPassword) {
      errorMessage('New password was not confirmed properly');
      $('#confirmNewPassword').addClass('error');
      return;
    }

    var jsonData = `{\"password\": \"${password}\"}`;
    $.ajax({
      "async": true,
      "crossDomain": true,
      "dataType": "json",
      "url": endpoint + "users/change-password/",
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

        // Create a basic auth info to authenticate with new password
        var basicAuthInfo = "Basic " + btoa(localStorage.username + ':' + password);
        localStorage.basicAuthInfo = basicAuthInfo;
        sucessMessage('New password was changed succesfully');
      },

      error: function(req, status, error) {
        debug('error', req, status, error);
        try {
          var userInfo = jQuery.parseJSON(req.responseText);
          errorMessage(userInfo.message);
        } catch (err) {
          defaultErrorMessage();
        }
      },

      fail: function() {
        console.log('fail');
      }
    });

  });


});
