// Events for the feedback-view page
$(document).ready(function() {

  debug('feedback-view.js');

  $('.wrapper-feedbackView .close-icon').on('click', () => {
    navigate('home.html');
  });

});
