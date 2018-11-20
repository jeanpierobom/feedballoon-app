// This function retrieves all feedback info
var getFeedbackInfo = (id) => {
  debug('getFeedbackInfo');
  $.ajax({
    "async": true,
    "crossDomain": true,
    "dataType": "json",
    "url": endpoint + "feedback/" + id,
    "method": "GET",
    "headers": {
      "Authorization": localStorage.basicAuthInfo,
      "Cache-Control": "no-cache"
    },

    success: function(response) {
      debug('success', response);

      // Update the name of the person
      $('.feedbackView-owner h3').text(response.data.user_from_name);

      // Update the job title of the person
      $('.feedbackView-owner .title-company').text(response.data.user_from_job_title);

      // Update the date of the feedback
      $('.feedbackView-owner .feedback-time').text(response.data.date);

      // Update the tag of the feedback
      $('.feedbackView-middle h3').text(response.data.tag);

      // Update the text of the feedback
      $('.feedbackView-feedback').text(response.data.message);

      // Hide the photo for now
      //$('.feedbackView-top img').hide();
      // Append the initials_text
    },

    error: function(req, status, error) {
      debug('error', req, status, error);
      var userInfo = jQuery.parseJSON(req.responseText);
      errorMessage(userInfo.message);
    },

    fail: function() {
      debug('fail');
    }
  });
}

// Events for the feedback-view page
$(document).ready(function() {

  debug('feedback-view.js');

  let id = urlParam('id');
  if (id == null || id == undefined || id == 0) {
    errorMessage('Invalid parameters');
  }

  getFeedbackInfo(id);

  $('.wrapper-feedbackView .close-icon').on('click', () => {
    navigate('home.html');
  });

});
