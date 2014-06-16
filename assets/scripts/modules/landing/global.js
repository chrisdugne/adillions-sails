var getStyledMap = function () {
  return {
    grayscale: [{
      'featureType': 'administrative',
      'stylers': [{
        'visibility': 'off'
      }]
    }, {
      'featureType': 'landscape',
      'stylers': [{
        'color': '#e1e6e6'
      }, {
        'visibility': 'on'
      }]
    }, {
      'featureType': 'poi',
      'stylers': [{
        'saturation': -100
      }, {
        'lightness': 51
      }, {
        'visibility': 'simplified'
      }]
    }, {
      'featureType': 'road.highway',
      'stylers': [{
        'saturation': -100
      }, {
        'visibility': 'simplified'
      }]
    }, {
      'featureType': 'road.arterial',
      'stylers': [{
        'saturation': -100
      }, {
        'lightness': 30
      }, {
        'visibility': 'on'
      }]
    }, {
      'featureType': 'road.local',
      'stylers': [{
        'saturation': -100
      }, {
        'lightness': 40
      }, {
        'visibility': 'on'
      }]
    }, {
      'featureType': 'transit',
      'stylers': [{
        'saturation': -100
      }, {
        'visibility': 'simplified'
      }]
    }, {
      'featureType': 'administrative.province',
      'stylers': [{
        'visibility': 'off'
      }]
    }, {
      'featureType': 'water',
      'elementType': 'labels',
      'stylers': [{
        'visibility': 'on'
      }, {
        'lightness': -25
      }, {
        'saturation': -100
      }]
    }, {
      'featureType': 'water',
      'elementType': 'geometry',
      'stylers': [{
        'color': '#ffffff'
      }]
    }]
  };
};

var clearMarkers = function (markers) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
  }
};

var global = function () {
  // enable tooltip
  $('#js-global-players .badge-wrap').tooltip();

  google.maps.event.addDomListener(window, 'load', function () {
    var options = {
        center: new google.maps.LatLng(40, -15),
        zoom: 2,
        panControl: false,
        zoomControl: false,
        scaleControl: false,
        scrollwheel: false,
        draggable: true,
        overviewMapControl: false,
        streetViewControl: false,
        mapTypeControl: false,
        disableDoubleClickZoom: true,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        styles: getStyledMap().grayscale
      },
      map = new google.maps.Map(document.getElementById('js-global-map'), options),
      geocoder = new google.maps.Geocoder(),
      markers = [];

    $('#js-global-players .global-player').click(function (e, elm) {
      if ($(this).hasClass('active')) {
        return;
      }
      $(this).addClass('active').siblings().removeClass('active');
      clearMarkers(markers);
      geocoder.geocode({
        'address': $(this).data('country')
      }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          var marker = new google.maps.Marker({
            map: map,
            position: results[0].geometry.location
          });
          marker.setAnimation(google.maps.Animation.DROP);
          markers.push(marker);
        }
      });
    });
    $('#js-global-players .global-player').eq(1).trigger('click');

  });

};
export
default global;
