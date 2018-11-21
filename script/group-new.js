// Events for the group-new page
$(document).ready(function() {

  debug('group-new.js');

  // Hide the initials
  $('.initials_container').hide();

  // Form submit
  $('.group-new-wrapper form').on('submit', (event) => {
    event.preventDefault();

    // Retrieve all information from user input
    var name = $('#groupNew-subject').val();
    var description = $('#groupNew-description').val();
    var private = false;
    debug(name, description, private);

    // Validate the input
    if (name == '') {
      errorMessage('Name is required');
      return;
    }

    var jsonData = `{\"name\":  \"${name}\", \"description\":\"${description}\", \"private\":\"${private}\"}`;
    $.ajax({
      "async": true,
      "crossDomain": true,
      "dataType": "json",
      "url": endpoint + "groups/",
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
        sucessMessage('Your group was created succesfully');
        navigate('group-list.html');
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
