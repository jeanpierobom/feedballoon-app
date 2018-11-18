// This function retrieves all group members
var getGroupMembers = (id, admin) => {
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

      $.each(response.data, function(key, user) {

        // let html = `
        //   <div class="group-members-list">
        //     <img src="images/jean.png" alt="member-image">
        //     <div class="initials_container">
        //       <span class="initials_text">${user.name_initials}</span>
        //     </div>
        //     <h3>${user.name}</h3>
        //     <span class="group-members-jobTitle">${user.job_title}</span>
        //     <button class="group-members-feedbackBbutton" type="button" name="button" onclick="goToFeedbackNew(${user.id})">Feedback</button>
        //   </div>
        // `;

        // Verify if the user is the same
        let sameUser = localStorage.userId = user.id;

        // Control the admin panel
        let showAdminPanel = !sameUser && admin == 1;
        let adminPanelHide = (showAdminPanel ? '' : 'hide');

        // Control the remove button
        let showRemoveButton = !sameUser;
        let removeButtonHide = (showRemoveButton ? '' : 'hide');

        let removeHide = (admin == '0' ? 'hide' : '');

        let html = `
        <div class="group-members-list admin">
          <!--<img src="images/jean.png" alt="member-image">-->
          <div class="initials_container">
          <span class="initials_text">${user.name_initials}</span>
          </div>
          <h3>${user.name}</h3>
          <span class="group-members-jobTitle">${user.job_title}</span>

          <div class="adminPanel-Joined">
            <div class="stageJoined-admin">
              <button class="group-members-feedbackBbutton" type="button" name="button">Feedback</button>
              <button class="removeUser ${removeButtonHide}" type="button" name="button">REMOVE</button>
            </div>
          </div>

          <div class="adminPanel ${adminPanelHide}">
            <div class="stageInvite">
              <button class="acceptBtn" type="button" name="button">ACCEPT</button>
              <button class="declineBtn" type="button" name="button">DECLINE</button>
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

      getGroupMembers(response.data.id, response.data.logged_user_is_admin);
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
