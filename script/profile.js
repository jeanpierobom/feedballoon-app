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
  })

});
