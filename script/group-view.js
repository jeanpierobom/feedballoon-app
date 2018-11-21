// This function retrieves all group members
var getGroupMembers = (id, waiting, approved, admin) => {
  debug('getGroupInfo');
  $.ajax({
    "async": true,
    "crossDomain": true,
    "dataType": "json",
    "url": endpoint + "groups_members/" + id,
    "method": "GET",
    "headers": {
      "Authorization": localStorage.basicAuthInfo,
      "Cache-Control": "no-cache"
    },

    success: function(response) {
      debug('success', response);

      // alert('logged user is waiting? ' + waiting);
      // alert('logged user is approved? ' + approved);
      // alert('logged user is admin? ' + admin);

      $.each(response.data, function(key, user) {
        // Verify if the user is the same
        let sameUser = localStorage.userId == user.id;
        let approvedUser = user.approved > 0;
        let adminUser = admin > 0;
        let feedbackControl = (approvedUser && !sameUser ? '' : 'hide');
        let removeControl = (adminUser && approvedUser && !sameUser ? '' : 'hide');
        let approveDeclineControl = (adminUser && !approvedUser && !sameUser ? '' : 'hide');
        //
        // // Control the admin panel
        // let showAdminPanel = !sameUser && admin == 1;
        // let adminPanelHide = (showAdminPanel ? '' : 'hide');
        //
        // // Control the remove button
        // let showRemoveButton = !sameUser;
        // let removeButtonHide = (showRemoveButton ? '' : 'hide');

        let html = `
        <div class="group-members-list admin">
          <div class="feedbackView-top">
            <div class="initials_container">
            <span class="initials_text">${user.name_initials}</span>
            </div>
            <h3>${user.name}</h3>
            <span class="group-members-jobTitle">${user.job_title}</span>

            <div class="adminPanel-Joined">
              <div class="stageJoined-admin">
                <button class="group-members-feedbackBbutton ${feedbackControl}" type="button" name="button" onclick="goToFeedbackNew(${user.id})">Feedback</button>
                <button class="removeUser ${removeControl}" type="button" name="button" onclick="declineMember(${id}, ${user.id})">REMOVE</button>
              </div>
            </div>

            <div class="adminPanel ${approveDeclineControl}">
              <div class="stageInvite">
                <button class="acceptBtn" type="button" name="button" onclick="acceptMember(${id}, ${user.id})">ACCEPT</button>
                <button class="declineBtn" type="button" name="button" onclick="declineMember(${id}, ${user.id})">DECLINE</button>
              </div>
            </div>
          </div>
        </div>
        `;

        // Update the list with the information retrieved
        $('main').append(html);

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

// This function retrieves all group info
var getGroupInfo = (id) => {
  debug('getGroupInfo');
  $.ajax({
    "async": true,
    "crossDomain": true,
    "dataType": "json",
    "url": endpoint + "groups/" + id,
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

      let waiting = response.data.current_member_waiting;
      let approved = response.data.current_member_approved;
      let admin = response.data.logged_user_is_admin;
      getGroupMembers(response.data.id, waiting, approved, admin);
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

// Events for the group-view page
$(document).ready(function() {

  debug('group-view.js');
  let id = urlParam('id');
  if (id == null || id == undefined || id == 0) {
    errorMessage('Invalid parameters');
  }
  let admin = urlParam('admin');

  getGroupInfo(id);
  //getGroupMembers(id);

  // $('.button-join').on('click', () => {
  //   joinGroup(id);
  // });
  //
  // $('.button-leave').on('click', () => {
  //   leaveGroup(id);
  // });

});
