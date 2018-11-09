var debugActivated = true;
var debug = (message) => {
  if (debugActivated) {
    console.log(message);
  }
}

var errorMessage = (message) => {
  alert('[ERROR]: ' + message);
}

var sucessMessage = (message) => {
  alert(message);
}

// This function is used to navigate from one screen to another
var navigate = (page) => {
  // if (!$.mobile) {
  //   alert('It was not possible to load the page');
  //   return;
  // }

  // $.mobile.loadPage(page);
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
  // alert('login', basicAuthInfo, silent);
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
  console.log('getAllFeedback');
  console.log('localStorage.basicAuthInfo: ' + localStorage.basicAuthInfo);
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
        let tag_class = '';
        switch (user.tag) {
          case 'KEEP':
            tag_class = 'feedback-keep';
            break;
          case 'IMPROVE':
            tag_class = 'feedback-improve';
            break;
          case 'KEEP & IMPROVE':
            tag_class = 'feedback-keep-improve';
            break;
          default:
            tag_class = 'feedback-keep';
        }

        let html = `
          <div class="feedback-box">
            <div class="feedback-type ${tag_class}">
              <span class="keep">${user.tag}</span>
            </div>
            <div class="initials_container">
              <span class="initials_text">${user.user_from_initials}</span>
            </div>
            <div class="feedback-owner">
              <h3>${user.user_from_name}</h3>
              <span class="title-company">${user.user_from_job_title}</span>
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

// This function attaches functionality to each button in the footer menu
var setupFooterMenuActions = () => {

  // Home button
  $('.home-label, .home-icon').on('click', () => {
    navigateToHome();
  });

  // Groups button
  $('.groups-label, .groups-icon').on('click', () => {
    navigate('group-list.html');
  });

  // Feedback button
  $('.feedback-label, .feedballoon-icon').on('click', () => {
    navigate('feedback-new.html');
  });

  // Favorites button
  $('.favorites-label, .favorites-icon-footer-button').on('click', () => {
    navigate('favorites.html');
  });

  // $('.settings-icon:before').css('content', "\e907");
  // alert($('.settings-icon:before').css('content') );
  //
  //
  // $('.settings-icon').css('color', 'red !important');
  // $('.settings-icon').parent().css('color', 'blue !important');
  //
  // $('.settings-icon:before').on('click', () => {
  //   alert('click');
  // })

  $('#link').on('click', () => { alert('test'); })

  // Profile button
  $('#settings-link').on('click', () => {
    alert('clicked');
  })


  $('.profile-label, a').on('click', () => {
    navigate('profile.html');
  });
}

function validateEmail(sEmail) {
  var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
  if (filter.test(sEmail)) {
    return true;
  } else {
    return false;
  }
}
// $(document).delegate(".launch-page", "pagebeforecreate", function() {
//   setupIndex();
// });
//
// $(document).delegate(".wrapper-index", "pagecreate", function() {
//   setupHome();
// });
//
// $(document).delegate(".sign-up-page", "pagebeforecreate", function() {
//   setupSignUp();
// });
//
// $(document).delegate(".wrapper-feedbackWritePage", "pagebeforecreate", function() {
//   setupFeedbackNew();
// });
