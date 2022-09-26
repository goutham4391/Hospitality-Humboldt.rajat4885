"use strict";

jQuery(document).ready(function ($) {
  $(document).on('favorites-updated-single', function (event, favorites, postID, siteID, status) {
    $.ajax({
      url: data.ajaxurl,
      data: {
        'action': 'update_suitcase'
      },
      success: function success(data) {
        $('.ajax-swap').html(data);
      },
      error: function error(errorThrown) {
        console.log(errorThrown);
      }
    });
  });
});