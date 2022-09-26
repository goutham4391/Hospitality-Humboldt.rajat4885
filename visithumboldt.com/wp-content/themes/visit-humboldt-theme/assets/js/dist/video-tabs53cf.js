"use strict";

jQuery(document).ready(function ($) {
  var previousActiveTabIndex = 0;
  $('.tab-switcher').on('click', function () {
    var tabClicked = $(this).data('tab-index');
    var switcher = this;

    if (tabClicked != previousActiveTabIndex) {
      $('.all-tabs .tab-container').each(function () {
        if ($(this).data('tab-index') == tabClicked) {
          // $( '.tab-container' ).hide();
          $('.tab-container').removeClass('active');
          $('.tab-switcher').removeClass('active');
          $(switcher).addClass('active'); // $( this ).show();

          $(this).addClass('active');
          previousActiveTabIndex = $(this).data('tab-index');
          return;
        }
      });
    }
  });
});