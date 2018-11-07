// Events for the sign-in page
$(document).ready(function() {

  console.log('index.js');

  // If there is a basicAuthInfo, tries to authenticate
  if (localStorage.basicAuthInfo !== '') {
    login(localStorage.basicAuthInfo, true);
  } else { // If not, navigates to the sign in page
    navigate('sign-in.html');
  }

});
