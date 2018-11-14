// Events for the home page
$(document).ready(function() {

  console.log('home.js');
  debug('retrieving feedback for user id: ' + localStorage.userId)
  getAllFeedback(localStorage.userId);

  setupFooterMenuActions();

  $('.search-icon').on('click', () => {
    $('.header-top-home a').toggleClass('search-icon');
    $('.header-top-home a').toggleClass('searchClose');
    $('.searchBar').toggle();
    $('.wrapper-index').toggleClass('wrapper-index-search');
  });

  // Sent button
  $('.feedback-sent a').on('click', () => {

    //Buttons
    $('.feedback-sent').addClass('selected');
    $('.feedback-received').removeClass('selected');

    //Boxes
    $('.feedback-type-sent').show();
    $('.feedback-type-received').hide();
    return false;
  })

  // Received button
  $('.feedback-received a').on('click', () => {

    //Buttons
    $('.feedback-sent').removeClass('selected');
    $('.feedback-received').addClass('selected');

    //Boxes
    $('.feedback-type-sent').hide();
    $('.feedback-type-received').show();
    return false;
  })
});
