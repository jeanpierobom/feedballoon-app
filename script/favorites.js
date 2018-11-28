// Events for the favorites page
$(document).ready(function() {

  console.log('favorites.js');
  debug('retrieving feedback for user id: ' + localStorage.userId)
  getAllFeedback(localStorage.userId, true);

  setupFooterMenuActions();
});
