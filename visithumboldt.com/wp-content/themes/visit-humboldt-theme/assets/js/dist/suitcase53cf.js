"use strict";

// Example if you have bower package scripts
// include ../bower_components/magnific-popup/dist/jquery.magnific-popup.js
// Your scripts inside js/src directory

/**
 * File general.js.
 *
 */
var forEach = function forEach(array, callback, scope) {
  var i;

  for (i = 0; i < array.length; i++) {
    callback.call(scope, i, array[i]);
  }
};

var ready = function ready(fn) {
  if (document.attachEvent ? 'complete' === document.readyState : 'loading' !== document.readyState) {
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
};

var dropCookie = true; // false disables the Cookie, allowing you to style the banner

var cookieDuration = 14; // Number of days before the cookie expires, and the banner reappears

var cookieName = 'complianceCookie'; // Name of our cookie

var cookieValue = 'on';

function createDiv() {
  var bodytag = document.getElementsByTagName('body')[0];
  var div = document.createElement('div');
  div.setAttribute('id', 'cookie-law');
  div.innerHTML = '<p>We use cookies to offer you a better browsing experience, analyze site traffic, and personalize content. Read about how we use cookies and how you can control them by visiting our <a href="/privacy-policy" target="_blank"><b>Privacy Policy</b></a>. If you continue to use this site, you consent to the use of cookies.</p>  <a class="close-cookie-banner" href="javascript:void(0);" onclick="removeMe();">&times;</a>';
  bodytag.appendChild(div); // bodytag.insertBefore( div, bodytag.firstChild ); // Adds the Cookie Law Banner just after the opening <body> tag

  document.getElementsByTagName('body')[0].className += ' cookiebanner'; //Adds a class tothe <body> tag when the banner is visible

  createCookie(window.cookieName, window.cookieValue, window.cookieDuration); // Create the cookie
}

function createCookie(name, value, days) {
  var date, expires;

  if (days) {
    date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = '; expires=' + date.toGMTString();
  } else {
    expires = '';
  }

  if (window.dropCookie) {
    document.cookie = name + '=' + value + expires + '; path=/';
  }
}

function checkCookie(name) {
  var nameEQ = name + '=';
  var ca = document.cookie.split(';');
  var index;
  var c;

  for (index = 0; index < ca.length; index++) {
    c = ca[index];

    while (' ' == c.charAt(0)) {
      c = c.substring(1, c.length);
    }

    if (0 == c.indexOf(nameEQ)) {
      return c.substring(nameEQ.length, c.length);
    }
  }

  return null;
}

function eraseCookie(name) {
  createCookie(name, '', -1);
}

window.onload = function () {
  if (checkCookie(window.cookieName) != window.cookieValue) {
    createDiv();
  }
};

function removeMe() {
  var element = document.getElementById('cookie-law');
  element.parentNode.removeChild(element);
}

(function () {
  ready(function () {
    var hoverItems = document.querySelectorAll('#secondary-menu .has-icon.suitcase');
    var revealItem = document.getElementById('suitcase-explainer');
    revealItem.addEventListener('mouseleave', function () {
      revealItem.classList.remove('active');
    }, false);
    forEach(hoverItems, function (i, hoverItem) {
      hoverItem.addEventListener('mouseenter', function () {
        revealItem.classList.add('active');
      }, false);
    });
  });
})();
/**
 * File map-popup.js.
 *
 */


var currentItemsArray,
    listViewEl,
    mapViewEl,
    mapButton,
    printButton,
    listButton,
    map,
    latlng,
    markers = [],
    bounds;

function initMapListSwitcher() {
  mapButton = document.getElementById('map-switcher');
  printButton = document.getElementById('print-button');
  listButton = document.getElementById('list-switcher');
  listViewEl = document.querySelectorAll('.list-view')[0];
  mapViewEl = document.querySelectorAll('.map-view')[0];

  mapButton.onclick = function () {
    // Switch Display
    listViewEl.style.display = 'none';
    mapViewEl.style.display = 'block';
    initSuitcaseMap();
  };

  printButton.onclick = function () {
    mapViewEl.style.display = 'block';
    initSuitcaseMap();
    setTimeout(function () {
      window.print();
      mapViewEl.style.display = 'none';
      mapViewEl.style.position = 'relative';
      mapViewEl.style.visibility = 'visable';
    }, 1000);
  };

  listButton.onclick = function () {
    // Switch Display
    listViewEl.style.display = 'block';
    mapViewEl.style.display = 'none';
  };
}

function initSuitcaseMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 10,
    center: new google.maps.LatLng(40.729521, -123.8827737),
    zoomControl: true,
    mapTypeControl: false,
    scaleControl: false,
    streetViewControl: false,
    rotateControl: false,
    fullscreenControl: false,
    // eslint-disable-next-line array-bracket-spacing, quotes, key-spacing, comma-spacing
    styles: [{
      "elementType": "geometry",
      "stylers": [{
        "color": "#f5f5f5"
      }]
    }, {
      "elementType": "labels.icon",
      "stylers": [{
        "visibility": "off"
      }]
    }, {
      "elementType": "labels.text.fill",
      "stylers": [{
        "color": "#616161"
      }]
    }, {
      "elementType": "labels.text.stroke",
      "stylers": [{
        "color": "#f5f5f5"
      }]
    }, {
      "featureType": "administrative.land_parcel",
      "elementType": "labels.text.fill",
      "stylers": [{
        "color": "#bdbdbd"
      }]
    }, {
      "featureType": "poi",
      "elementType": "geometry",
      "stylers": [{
        "color": "#eeeeee"
      }]
    }, {
      "featureType": "poi",
      "elementType": "labels.text.fill",
      "stylers": [{
        "color": "#757575"
      }]
    }, {
      "featureType": "poi.park",
      "elementType": "geometry",
      "stylers": [{
        "color": "#e5e5e5"
      }]
    }, {
      "featureType": "poi.park",
      "elementType": "labels.text.fill",
      "stylers": [{
        "color": "#9e9e9e"
      }]
    }, {
      "featureType": "road",
      "elementType": "geometry",
      "stylers": [{
        "color": "#ffffff"
      }]
    }, {
      "featureType": "road.arterial",
      "elementType": "labels.text.fill",
      "stylers": [{
        "color": "#757575"
      }]
    }, {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [{
        "color": "#dadada"
      }]
    }, {
      "featureType": "road.highway",
      "elementType": "labels.text.fill",
      "stylers": [{
        "color": "#616161"
      }]
    }, {
      "featureType": "road.local",
      "elementType": "labels.text.fill",
      "stylers": [{
        "color": "#9e9e9e"
      }]
    }, {
      "featureType": "transit.line",
      "elementType": "geometry",
      "stylers": [{
        "color": "#e5e5e5"
      }]
    }, {
      "featureType": "transit.station",
      "elementType": "geometry",
      "stylers": [{
        "color": "#eeeeee"
      }]
    }, {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [{
        "color": "#c6d5dd"
      }]
    }, {
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": [{
        "color": "#9e9e9e"
      }]
    }]
  });
  mapMarkers();
}

function addMarker(location) {
  var title = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var address = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var icon = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
  var infowindow = new google.maps.InfoWindow({
    content: "<div id=\"map-infowindow\">\n            <p class=\"map-infowindow-title\">".concat(title, "</p>\n            <p class=\"map-infowindow-address\">").concat(address, "</p>\n        </div>")
  });
  var marker = new google.maps.Marker({
    position: location,
    title: title,
    map: map,
    icon: icon
  });
  marker.addListener('click', function () {
    google.maps.event.trigger(map, 'click');
    infowindow.open(map, marker);
  });
  google.maps.event.addListener(map, 'click', function (infowindow) {
    return function () {
      infowindow.close();
    };
  }(infowindow));
  markers.push(marker);
}

function setMapOnAll(map) {
  forEach(markers, function (i, marker) {
    marker.setMap(map);
  });
}

function deleteMarkers() {
  setMapOnAll(null);
  markers = [];
}

function mapMarkers() {
  var currentItems = document.querySelectorAll('.activities-section .filter-item, .lodging-section .filter-item');
  deleteMarkers();
  currentItemsArray = [].slice.call(currentItems);
  forEach(currentItemsArray.reverse(), function (i, filteredItem) {
    var lat = filteredItem.getAttribute('data-map-lat');
    var lng = filteredItem.getAttribute('data-map-lng');
    var title = filteredItem.getAttribute('data-map-title');
    var address = filteredItem.getAttribute('data-map-address');
    var URLbase = '../wp-content/themes/visit-humboldt-theme/assets/images/index.html';
    var location = new google.maps.LatLng(lat, lng);

    if (title && lat) {
      if (filteredItem.classList.contains('type-activities')) {
        addMarker(location, title, address, URLbase + 'activities-map-icon.png');
      } else {
        addMarker(location, title, address, URLbase + 'lodging-map-icon.png');
      }
    }
  });
}