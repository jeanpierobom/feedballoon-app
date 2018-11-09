// Events for the profile page
$(document).ready(function() {

  debug('profile.js');

  // Event for logout
  $('#logOut').on('click', () => {
    logout();
  })

});
