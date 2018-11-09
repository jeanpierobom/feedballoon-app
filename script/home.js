// Events for the home page
$(document).ready(function() {

  console.log('home.js');
  debug('retrieving feedback for user id: ' + localStorage.userId)
  getAllFeedback(localStorage.userId);

  setupFooterMenuActions();

  // Sent button
  $('.feedback-sent a').on('click', () => {
    $('.feedback-type-sent').show();
    $('.feedback-type-received').hide();
    return false;
  })

  // Received button
  $('.feedback-received a').on('click', () => {
    $('.feedback-type-sent').hide();
    $('.feedback-type-received').show();
    return false;
  })
});
