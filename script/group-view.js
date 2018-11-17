// This function retrieves all group info
var getGroupInfo = (id) => {
  debug('getGroupInfo');
  $.ajax({
    "async": true,
    "crossDomain": true,
    "dataType": "json",
    "url": "http://localhost/feedballoon-api/api/groups/" + id,
    "method": "GET",
    "headers": {
      "Authorization": localStorage.basicAuthInfo,
      "Cache-Control": "no-cache"
    },

    success: function(response) {
      debug('success', response);

      // Update the initials of the group
      $('.group-id').text(response.data.name_initials);

      // Update the name of the group
      $('.group-view-info h3').text(response.data.name);

      // Update the number of members in the group
      $('.group-view-members').text(`${response.data.members_count} members`);

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

// This function retrieves all group members
var getGroupMembers = (id) => {
  debug('getGroupInfo');
  $.ajax({
    "async": true,
    "crossDomain": true,
    "dataType": "json",
    "url": "http://localhost/feedballoon-api/api/groups_members/" + id,
    "method": "GET",
    "headers": {
      "Authorization": localStorage.basicAuthInfo,
      "Cache-Control": "no-cache"
    },

    success: function(response) {
      debug('success', response);

      $.each(response.data, function(key, user) {

        let html = `
          <div class="group-members-list">
            <img src="images/jean.png" alt="member-image">
            <div class="initials_container">
              <span class="initials_text">${user.name_initials}</span>
            </div>
            <h3>${user.name}</h3>
            <span class="group-members-jobTitle">${user.job_title}</span>
            <button class="group-members-feedbackBbutton" type="button" name="button" onclick="goToFeedbackNew(${user.id})">Feedback</button>
          </div>
        `;

        // Update the list with the information retrieved
        $('main').append(html);

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
   "url": "http://localhost/feedballoon-api/api/groups_members/",
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
   "url": "http://localhost/feedballoon-api/api/groups_members/",
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

// Events for the group-view page
$(document).ready(function() {

  debug('group-view.js');
  let id = urlParam('id');
  if (id == null || id == undefined || id == 0) {
    showErrorMessage('Invalid parameters');
  }

  getGroupInfo(id);
  getGroupMembers(id);

  $('.button-join').on('click', () => {
    joinGroup(id);
  });

  $('.button-leave').on('click', () => {
    leaveGroup(id);
  });

});
