// This function is used to navigate from one screen to another
var navigate = (page) => {
  //$.mobile.loadPage(page);
  // $.mobile.changePage(page, { transition: "slideup"} );
  document.location.href = page;
}

// This function clears user info from the localStorage
var clearUserInfo = (user) => {
  storeUserInfo('', '');
}

// This function stores user info into the localStorage
var storeUserInfo = (user, basicAuthInfo) => {
  localStorage.basicAuthInfo = basicAuthInfo;
  localStorage.userId = user ? user.id : '';
  localStorage.username = user ? user.username : '';
  localStorage.firstName = user ? user.firstName : '';
  localStorage.lastName = user ? user.lastName : '';
}

// This function is used to authenticate the user
var login = (basicAuthInfo, silent) => {
  $.ajax({
    "async": true,
    "crossDomain": true,
    "dataType": "json",
    "url": "http://localhost/feedballoon-api/api/users/login",
    "method": "POST",
    "headers": {
      "Authorization": basicAuthInfo,
      "Cache-Control": "no-cache"
    },

    success: function(response) {
      console.log('success', response);
      // The login was successful, so let's store the user and basic info
      storeUserInfo(response.data, basicAuthInfo);
      navigate('home.html');
    },

    error: function(req, status, error) {
      console.log('error', req, status, error);
      clearUserInfo();
      if (!silent) {
        var userInfo = jQuery.parseJSON(req.responseText);
        alert(userInfo.message);
      } else {
        navigate('sign-in.html');
      }
    },

    fail: function() {
      console.log('fail');
      clearUserInfo();
    }
  });
}

// This function retrieves all feedback
var getAllFeedback = () => {
  $.ajax({
    "async": true,
    "crossDomain": true,
    "dataType": "json",
    "url": "http://localhost/feedballoon-api/api/feedback/",
    "method": "GET",
    "headers": {
      "Authorization": localStorage.basicAuthInfo,
      "Cache-Control": "no-cache"
    },

    success: function(response) {
      console.log('success', response);

      // <div class="feedback-box">
      //   <div class="feedback-type feedback-keep">
      //     <span class="keep">KEEP</span>
      //   </div>
      //   <img src="images/joao.png" alt="feedback owner image">
      //   <div class="feedback-owner">
      //     <h3>John Mosby</h3>
      //     <span class="title-company">Account Manager @Langara College</span>
      //     <span class="feedback-time">Feb 14, 2018 - 11:00am</span>
      //   </div>
      //   <span class="favorite-icon"></span>
      //   <span class="repply-icon"></span>
      // </div>


      $.each(response.data, function(key, user) {
        let html = `
          <div class="feedback-box">
            <div class="feedback-type feedback-keep">
              <span class="keep">KEEP</span>
            </div>
            <img src="images/joao.png" alt="feedback owner image">
            <div class="feedback-owner">
              <h3>${user.user_from_name}</h3>
              <span class="title-company">Account Manager @Langara College</span>
              <span class="feedback-time">${user.date}</span>
            </div>
            <span class="favorite-icon"></span>
            <span class="repply-icon"></span>
          </div>
        `;
        $('.feedback-list').append(html);
          // $('#myTable > tbody').append(
          //     '<tr><td>'
          //     + user.userName
          //     + '</td><td>'
          //     + user.count +
          //     '</td></tr>'
          // );
      });

      // Update the list with the information retrieved
    },

    error: function(req, status, error) {
      console.log('error', req, status, error);
      var userInfo = jQuery.parseJSON(req.responseText);
      alert(userInfo.message);
    },

    fail: function() {
      console.log('fail');
    }
  });
}

// Index page
// $(document).delegate("#index", "pagebeforecreate", function() {
$(document).delegate(".launch-page", "pagebeforecreate", function() {
  setupIndex();
});

// Events for the feedback-new page
var setupFeedbackNew = () => {
  $('.wrapper-feedbackWritePage .close-icon').on('click', () => {
    navigate('home.html');
  });
}

// Events for the home page
var setupHome = () => {

  getAllFeedback();

  // Home button
  $('li:contains("Home"), .home-icon').on('click', () => {
    navigate('home.html');
  });

  // Groups button
  $('li:contains("Groups"), .groups-icon').on('click', () => {
    navigate('group-list.html');
  });

  // Feedback button
  $('li:contains("Feedback"), .feedballoon-icon').on('click', () => {
    navigate('feedback-new.html');
  });

  // Favorites button
  $('li:contains("Favorites"), .favorites-icon-footer-button').on('click', () => {
    alert('Open favorites');
  });

  // Profile button
  $('li:contains("Profile"), feedballoon-icon').on('click', () => {
    navigate('profile.html');
  });
}

// Events for the index page
var setupIndex = () => {
  // If there is a basicAuthInfo, tries to authenticate
  if (localStorage.basicAuthInfo !== '') {
    login(localStorage.basicAuthInfo, true);
  } else { // If not, navigates to the sign in page
    navigate('sign-in.html');
  }
}

// Events for the sign-in page
var setupSignIn = () => {
  $('.sign-in-page form').on('submit', (event) => {
    event.preventDefault();

    // Retrieve username and password from user input
    var username = $('#fname').val();
    var password = $('#email').val();
    var basicAuthInfo = "Basic " + btoa(username + ':' + password);
    login(basicAuthInfo);
  });

  // Create an account button
  $('.newAccount').on('click', () => {
    navigate('sign-up.html');
  });
}

// Events for the sign-up page
var setupSignUp = () => {
  // Form submit
  $('.sign-up-page form').on('submit', (event) => {
    event.preventDefault();

    // Retrieve all information from user input
    var firstname = $('#firstname').val();
    var lastname = $('#lastname').val();
    var jobTitle = $('#jobTitle').val();
    var email = $('#email').val();
    var password = $('#password').val();
    var confirmPassword = $('#confirmPassword').val();
    var formData = {
      firstname: firstname,
      lastname: lastname,
      jobTitle: jobTitle,
      email: email,
      password: password
    };

    $.ajax({
      "async": true,
      "crossDomain": true,
      "dataType": "json",
      "url": "http://localhost/feedballoon-api/api/users/",
      "method": "POST",
      "headers": {
        "Authorization": localStorage.basicAuthInfo,
        "Cache-Control": "no-cache"
      },
      "mimeType": "multipart/form-data",
      "body": formData,

      success: function(response) {
        console.log('success', response);
        alert('User was created succesfully');
        // TODO redirect to sign-in
        // navigate('sign-in.html');
      },

      error: function(req, status, error) {
        console.log('error', req, status, error);
        var userInfo = jQuery.parseJSON(req.responseText);
        alert(userInfo.message);
      },

      fail: function() {
        console.log('fail');
        alert('fail');
      }
    });


  });

  // Sign in button
  $('.sup-signIn').on('click', () => {
    navigate('sign-in.html');
  });
}


//Sign in page
//TODO selectors are not working, that is why I am using document ready
//TODO test if events are being attached every time a page is open
$(document).ready(function() {

  setupHome();
  setupSignIn();
  setupSignUp();
  setupFeedbackNew();

});








  // assign an action to the login button
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
