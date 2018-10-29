$(document).ready(function() {

  // assign an action to the login button
  $('#login-button').click(() => {
    // retrieve username and password from user input
    var username = $('#username').val();
    var password = $('#password').val();

    $.ajax({
      "async": true,
      "crossDomain": true,
      "dataType": "json",
      "url": "http://localhost/feedballoon-api/api/quotes/",
      "method": "GET",
      "headers": {
        //"Authorization": "Basic YWlsc3VuZmF5MTk6YWlsc3VuZmF5MTlwYXNzd29yZA==",
        "Authorization": basicAuthInfo(username, password),
        "Cache-Control": "no-cache",
        "Postman-Token": "3679aae9-5a2e-40a9-a274-331c022b26c2"
      },

      success: function(data) {
        console.log('success', data);
      },

      error: function(req, status, error) {
        console.log('fail', req, status, error);
      },

      fail: function() {
        console.log('fail');
      },

      always: function() {
        console.log('always');
      },

      complete: function(jqXHR) {
        console.log('complete', jqXHR.status);
      }
    });


    // console.log('test');
    // var settings = {
    //   "async": true,
    //   "crossDomain": true,
    //   "url": "http://localhost/feedballoon-api/api/quotes/",
    //   "method": "GET",
    //   "dataType": "json",
    //   "headers": {
    //     "Authorization": "Basic YWlsc3VuZmF5MTk6YWlsc3VuZmF5MTlwYXNzd29yZA==",
    //     "Cache-Control": "no-cache",
    //     "Postman-Token": "a4978a64-5dc7-4cfc-9089-369ff3fb8bf2"
    //   }
    // }
    //
    // $.ajax(settings).complete(function (response) {
    //   console.log('go');
    //   console.log(response);
    // });

  })
});
