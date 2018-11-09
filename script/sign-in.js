// Events for the sign-in page
$(document).ready(function() {

  console.log('sign-in.js');

  $('.sign-in-page form').on('submit', (event) => {
    event.preventDefault();

    // Retrieve username and password from user input
    var username = $('#email').val();
    var password = $('#password').val();
    
    // Validate the input
    if (username == '' || password == '') {
      alert('Username and password required');
      return;
    }

    // Create a basic auth info to authenticate
    var basicAuthInfo = "Basic " + btoa(username + ':' + password);
    login(basicAuthInfo);
  });

  // Create an account button
  $('.newAccount').on('click', () => {
    navigate('sign-up.html');
  });

});
