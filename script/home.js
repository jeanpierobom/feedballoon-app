// Events for the home page
$(document).ready(function() {

  console.log('home.js');

  setupFooterMenuActions();

  // Search button
  var searchBarOpened = false;
  $('.search-icon').on('click', () => {
    $('.header-top-home a').toggleClass('search-icon');
    $('.header-top-home a').toggleClass('searchClose');
    $('.searchBar').toggle();
    $('.wrapper-index').toggleClass('wrapper-index-search');

    if (searchBarOpened) {
      getAllFeedback(localStorage.userId);
    }

    searchBarOpened = !searchBarOpened;

  });

  // Second search Buttons
  $('.searchIcon-Bar').on('click', () => {
    // Load data based on search
    let search = $('.group-search-field').val();
    getAllFeedback(localStorage.userId, false, search);
  });

  // Sent button
  $('.feedback-sent a').on('click', () => {

    //Buttons
    $('.feedback-sent').addClass('selected');
    $('.feedback-received').removeClass('selected');

    //Boxes
    $('.feedback-type-sent').show();
    $('.feedback-type-received').hide();

    //Control the empty state
    let count = $('.feedback-type-sent').length;
    if (count > 0) {
      $('.emptyState').hide();
    } else {
      $('.emptyState').show();
    }

    return false;
  });

  // Received button
  $('.feedback-received a').on('click', () => {

    //Buttons
    $('.feedback-sent').removeClass('selected');
    $('.feedback-received').addClass('selected');

    //Boxes
    $('.feedback-type-sent').hide();
    $('.feedback-type-received').show();

    // Refresh all feedback
    getAllFeedback(localStorage.userId);

    //Control the empty state
    let count = $('.feedback-type-received').length;
    if (count > 0) {
      $('.emptyState').hide();
    } else {
      $('.emptyState').show();
    }

    return false;
  });

  // Load data
  getAllFeedback(localStorage.userId);

});
