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

      let feedback = response.data;
      let type = feedback.type;
      let userInitials = feedback.user_from_initials;
      let userName = feedback.user_from_name;
      let userJobTitle = feedback.user_from_job_title;
      if (type == 'sent') {
        userInitials = feedback.user_to_initials;
        userName = feedback.user_to_name;
        userJobTitle = feedback.user_to_job_title;
      }

      // Update the name of the person
      $('.feedbackView-owner h3').text(userName);

      // Update the user initials
      $('.initials_text').text(userInitials);

      // Update the job title of the person
      $('.feedbackView-owner .title-company').text(userJobTitle);

      // Update the date of the feedback
      $('.feedbackView-owner .feedback-time').text(response.data.date);

      // Update the tag of the feedback
      $('.feedbackView-middle h3').text(response.data.tag);

      // Update the text of the feedback
      // $('.feedbackView-feedback').text(response.data.message);

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

// Events for the feedback-reply page
$(document).ready(function() {

  debug('feedback-reply.js');

  let id = urlParam('id');
  if (id == null || id == undefined || id == 0) {
    errorMessage('Invalid parameters');
    navigate('home.html');
  }

  getFeedbackInfo(id);

  $('#closePage, .wrapper-feedbackView .close-icon').on('click', () => {
    navigate('home.html');
  });

  // Form submit
  $('.wrapper-feedbackView form').on('submit', (event) => {
    event.preventDefault();

    // Retrieve all information from user input
    var userId = localStorage.userId;
    var message = $('.feedbackReply-feedback').val();
    debug(message);

    // Validate the input
    if (message == '') {
      errorMessage('Message is required');
      return;
    }

    var jsonData = `{\"feedbackId\":  \"${id}\", \"userId\":\"${userId}\", \"message\":\"${message}\"}`;
    $.ajax({
      "async": true,
      "crossDomain": true,
      "dataType": "json",
      "url": endpoint + "feedback_reply/",
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
        sucessMessage('Your reply was sent succesfully');
        navigate('home.html');
      },

      error: function(req, status, error) {
        errorMessage('An error occured. ' + JSON.parse(req.responseText).message);
        console.log('!error', req, status, error);
      },

      fail: function() {
        console.log('fail');
      }
    });
  });


});
