var debugActivated = true;
var debug = (message) => {
  if (debugActivated) {
    console.log(`[DEBUG] ${message}`);
  }
}

var errorMessage = (message) => {
  alert('[ERROR] ' + message);
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
var clearUserInfo = () => {
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

// This function is used to remove the user authentication info
var logout = () => {
  clearUserInfo();
  navigate('sign-in.html');
}

// This function retrieves all feedback
var getAllFeedback = (userId) => {
  debug('getAllFeedback');
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
      debug('success', response);

      $.each(response.data, function(key, feedback) {
        let tag_class = '';
        switch (feedback.tag) {
          case 'KEEP':
            tag_class = 'feedback-keep';
            break;
          case 'REVISE':
            tag_class = 'feedback-REVISE';
            break;
          case 'KEEP & REVISE':
            tag_class = 'feedback-keep-REVISE';
            break;
          default:
            tag_class = 'feedback-keep';
        }

        let html = `
          <div class="feedback-box feedback-type-${feedback.type}">
            <div class="feedback-type ${tag_class}">
              <span class="keep">${feedback.tag}</span>
            </div>
            <div class="initials_container">
              <span class="initials_text">${feedback.user_from_initials}</span>
            </div>
            <div class="feedback-owner">
              <h3>${feedback.user_from_name}</h3>
              <span class="title-company">${feedback.user_from_job_title}</span>
              <span class="feedback-time">${feedback.date}</span>
            </div>
            <span class="favorite-icon"></span>
            <span class="repply-icon"></span>
          </div>
        `;

        // Update the list with the information retrieved
        $('.feedback-list').append(html);

        // Show received feedback as default
        $('.feedback-type-sent').hide();
        $('.feedback-type-received').show();

      });
    },

    error: function(req, status, error) {
      debug('error', req, status, error);
      var userInfo = jQuery.parseJSON(req.responseText);
      showErrorMessage(userInfo.message);
    },

    fail: function() {
      debug('fail');
    }
  });
}

// This function retrieves all groups
var getAllGroups = () => {
  debug('getAllGroups');
  $.ajax({
    "async": true,
    "crossDomain": true,
    "dataType": "json",
    "url": "http://localhost/feedballoon-api/api/groups/",
    "method": "GET",
    "headers": {
      "Authorization": localStorage.basicAuthInfo,
      "Cache-Control": "no-cache"
    },

    success: function(response) {
      debug('success', response);

      $.each(response.data, function(key, group) {
        // Update the list with the information retrieved
        let html = `
          <div class="group-box">
            <div class="group-type group-keep">
              <span class="name">${group.name_initials}</span>
            </div>
            <div class="group-name">
              <h3>${group.name}</h3>
              <span class="member">${group.members_count} Members</span>
              <span class="request">*** Pending</span>
            </div>
          </div>
        `;
        $('.group-list').append(html);
      });

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

  // Profile button
  $('#settings-link').on('click', () => {
    alert('clicked');
  })


  $('.profile-label a').on('click', () => {
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
