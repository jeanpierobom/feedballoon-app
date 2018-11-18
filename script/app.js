var production = 'http://18.209.101.158';
var desenv = 'http://localhost';

var endpoint = desenv + '/feedballoon-api/api/';
//var endpoint = production + '/feedballoon-api/api/';

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
    "url": endpoint + "users/login",
    "method": "POST",
    "headers": {
      "Authorization": basicAuthInfo,
      "Cache-Control": "no-cache"
    },
    "processData": false,
    "contentType": false,
    "mimeType": "multipart/form-data",

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
    "url": endpoint + "feedback/",
    "method": "GET",
    "headers": {
      "Authorization": localStorage.basicAuthInfo,
      "Cache-Control": "no-cache"
    },

    success: function(response) {
      debug('success', response);

      let hasData = false;
      $.each(response.data, function(key, feedback) {
        let tag_class = '';
        switch (feedback.tag) {
          case 'AWESOME':
            tag_class = 'feedback-keep';
            break;
          case 'KEEP':
            tag_class = 'feedback-keep';
            break;
          case 'REVISE':
            tag_class = 'feedback-REVISE feedback-revise';
            break;
          case 'KEEP & REVISE':
            tag_class = 'feedback-keep-REVISE';
            break;
          default:
            tag_class = 'feedback-keep';
        }

        let html = `
          <div class="feedback-box feedback-type-${feedback.type}" onclick="goToFeedbackDetails(${feedback.id})">
            <div class="feedback-type ${tag_class}">
              <span class="keep">${feedback.tag}</span>
            </div>
            <!--<div class="initials_container">
              <span class="initials_text">${feedback.user_from_initials}</span>
            </div>-->
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
        hasData = true;
      });

      // Show received feedback as default
      $('.feedback-type-sent').hide();
      $('.feedback-type-received').show();

      // Hide the empty state
      if (hasData) {
        $('.emptyState').hide();
      }
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

// This function retrieves all groups
var getAllGroups = () => {
  debug('getAllGroups');
  $.ajax({
    "async": true,
    "crossDomain": true,
    "dataType": "json",
    "url": endpoint + "groups/",
    "method": "GET",
    "headers": {
      "Authorization": localStorage.basicAuthInfo,
      "Cache-Control": "no-cache"
    },

    success: function(response) {
      debug('success', response);

      let hasData = false;
      $.each(response.data, function(key, group) {
        // Update the list with the information retrieved
        let html = `
          <div class="group-box" onclick="goToGroupDetails(${group.id})">
            <div class="group-type group-keep">
              <span class="name">${group.name_initials}</span>
            </div>
            <div class="group-name">
              <h3>${group.name}</h3>
              <span class="member">${group.members_count} Members</span>`;
        if (group.current_member > 0) {
          html += `<span class="status">Joined</span>`;
        }

        let hideExit = group.current_member > 0 ? '' : 'hide';
        let hideJoin = group.current_member > 0 ? 'hide' : '';

        html += `
            </div>
            <div class="groupJoinExit">
              <button class="exitBtn ${hideExit}" type="button" name="button" onclick="leaveGroup(${group.id})">Exit Group</button>
              <button class="joinBtn ${hideJoin}" type="button" name="button" onclick="joinGroup(${group.id})">Join Group</button>
            </div>
          </div>
        `;

        $('.group-list').append(html);
        hasData = true;
      });

      if (hasData) {
        $('.emptyState').hide();
      }

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

var goToFeedbackDetails = (id) => {
  debug('goToFeedbackDetails');
  navigate(`feedback-view.html?id=${id}`);
}

var goToFeedbackNew = (userToId) => {
  debug('goToFeedbackNew');
  navigate(`feedback-new.html?userToId=${userToId}`);
}

var goToGroupDetails = (id) => {
  debug('goToGroupDetails');
  navigate(`group-view.html?id=${id}`);
}

// This function joins the current user into a group
var joinGroup = (groupId) => {
  debug('joinGroup');

  // Retrieve all information from user input
  var userId = localStorage.userId;
  console.log(groupId, userId);

  // Validate the input
  if (groupId == '' || userId == '') {
   errorMessage('No group or user were selected');
   return;
  }

  var jsonData = `{\"groupId\":\"${groupId}\", \"userId\":\"${userId}\"}`;
  $.ajax({
   "async": true,
   "crossDomain": true,
   "dataType": "json",
   "url": endpoint + "groups_members/",
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
     sucessMessage('You joined the group succesfully');
     navigate(`group-view.html?id=${groupId}`);
   },

   error: function(req, status, error) {
     console.log('error', req, status, error);
     errorMessage('An error occured: ' + JSON.parse(req.responseText).message);
   },

   fail: function() {
     console.log('fail');
   }
  });
}

// This function removes the current user from a group
var leaveGroup = (groupId) => {
  debug('leaveGroup');

  debug('joinGroup');

  // Retrieve all information from user input
  var userId = localStorage.userId;
  console.log(groupId, userId);

  // Validate the input
  if (groupId == '' || userId == '') {
   errorMessage('No group or user were selected');
   return;
  }

  var jsonData = `{\"groupId\":\"${groupId}\", \"userId\":\"${userId}\", \"action\":\"leave\"}`;
  $.ajax({
   "async": true,
   "crossDomain": true,
   "dataType": "json",
   "url": endpoint + "groups_members/",
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
     sucessMessage('You left the group succesfully');
   },

   error: function(req, status, error) {
     console.log('error', req, status, error);
     errorMessage('An error occured: ' + JSON.parse(req.responseText).message);
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
    navigate('home.html');
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

function urlParam(name){
    var results = new RegExp('[\?&]' + name + '=([^]*)').exec(window.location.href);
    if (results==null){
       return null;
    }
    else{
       return results[1] || 0;
    }
}
