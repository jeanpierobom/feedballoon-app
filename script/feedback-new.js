// Events for the feedback-new page
$(document).ready(function() {

  console.log('feedback-new.js');

  let userToId = urlParam('userToId');
  debug(userToId);

  function log( message ) {
    $( "<div>" ).text( message ).prependTo( "#log" );
    $( "#log" ).scrollTop( 0 );
  }

  $( "#email" ).autocomplete({
    source: function( request, response ) {
      $.ajax({
        //url: "http://gd.geobytes.com/AutoCompleteCity",
        url: "http://localhost/feedballoon-api/api/users/search/",
        dataType: "jsonp",
        data: {
          q: request.term
        },
        "headers": {
          "Authorization": localStorage.basicAuthInfo,
          "Cache-Control": "no-cache"
        },
        success: function( data ) {
          response( data );
          //alert('sucess data: ' + data);
        },
        error: function(req, status, error) {
          console.log('error', req, status, error);
          errorMessage('1 An error occured: ' + JSON.parse(req.responseText));
          alert(error);
        },

        fail: function() {
          console.log('fail');
        }
      });
    },
    minLength: 3,
    select: function( event, ui ) {
      $('#toUserId').val(ui.item.id);
    }
  });



  // Tag buttons
  $('.keepBtn').on('click', () => { selectTag('AWESOME'); });
  $('.reviseBtn').on('click', () => { selectTag('REVISE'); });
  $('.keep-revise-Btn').on('click', () => { selectTag('KEEP & REVISE'); });

  $('.wrapper-feedbackWritePage .close-icon').on('click', () => {
    navigate('home.html');
  });

  // Form submit
  $('.wrapper-feedbackWritePage form').on('submit', (event) => {
    event.preventDefault();

    // Retrieve all information from user input
    var fromUserId = '1';
    var toUserId = '5';
    var tag = $('#tagSelected').val();
    var message = $('.feedbackView-feedback').val();
    console.log(fromUserId, toUserId, tag, message);

    // Validate the input
    if (fromUserId == '' || toUserId == '' || tag == '' || message == '') {
      errorMessage('All fields are required');
      return;
    }

    var jsonData = `{\"fromUserId\":\"${fromUserId}\", \"toUserId\":\"${toUserId}\", \"tag\":\"${tag}\", \"message\": \"${message}\"}`;
    $.ajax({
      "async": true,
      "crossDomain": true,
      "dataType": "json",
      "url": "http://localhost/feedballoon-api/api/feedback/",
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
        sucessMessage('Your feedback was posted succesfully');
        navigate('home.html');
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

let selectTag = (tag) => {
  $('#tagSelected').val(tag);
  switch (tag) {
    case 'KEEP':
      $('.keepBtn').addClass('selected');
      $('.reviseBtn').removeClass('selected');
      $('.keep-revise-Btn').removeClass('selected');
      break;
    case 'REVISE':
      $('.keepBtn').removeClass('selected');
      $('.reviseBtn').addClass('selected');
      $('.keep-revise-Btn').removeClass('selected');
      break;
    case 'KEEP & REVISE':
      $('.keepBtn').removeClass('selected');
      $('.reviseBtn').removeClass('selected');
      $('.keep-revise-Btn').addClass('selected');
      break;
    default:
  }
}

// <div class="feedbackWritePage-Border"><button class="selected" type="button" name="button">Keep</button></div>
//
// <div class="feedbackWritePage-Border"><button class="reviseBtn" type="button" name="button">Revise</button></div>
//
// <div class="feedbackWritePage-Border"><button class="keep-revise-Btn" type="button" name="button">Keep & Revise</button></div>
