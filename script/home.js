// Events for the home page
$(document).ready(function() {

  console.log('home.js');

  getAllFeedback();

  // Home button
  $('li:contains("Home"), .home-icon').on('click', () => {
    navigateToHome();
  });

  // Groups button
  $('li:contains("Groups"), .groups-icon').on('click', () => {
    navigate('group-list.html');
  });

  // Feedback button
  $('li:contains("Feedback"), .feedballoon-icon').on('click', () => {
    alert('go to feedback new');
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
});
