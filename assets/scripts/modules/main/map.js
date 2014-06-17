var map = function () {
  this.map = null;
  this.geocoder = null;
  this.markers = [];
};

map.prototype.init = function (id, params) {
  var options = params || {
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
    styles: this.getStyle()
  };
  this.map = new google.maps.Map(document.getElementById(id), options);
  this.geocoder = new google.maps.Geocoder();
  this.bindMarkers();
  return this;
};

map.prototype.bindMarkers = function () {
  for (var i = 0; i < this.markers.length; i++) {
    if (this.markers[i].getMap()) {
      continue;
    }
    this.markers[i].setMap(this.map);
  }
  return this;
};

map.prototype.setInfoWindow = function (html, marker) {
 var infowindow = new google.maps.InfoWindow({
      content: html,
      maxWidth: 300
  });
  google.maps.event.addListener(marker, 'click', function() {
    infowindow.open(this.map, marker);
  }.call(this));
};

map.prototype.setMarker = function (options) {
  var marker = new google.maps.Marker(options);
  marker.setIcon({
    path: google.maps.SymbolPath.CIRCLE,
    fillColor: '#ffb413',
    fillOpacity: 0.8,
    strokeColor: '#ffb413',
    strokeWeight: 25,
    strokeOpacity: 0.4,
    scale: 8
  });
  this.markers.push(marker);
  if (this.map) {
    marker.setMap(this.map);
  }
  return this;
};

map.prototype.clearMarkers = function () {
  for (var i = 0; i < this.markers.length; i++) {
    this.markers[i].setMap(null);
  }
  return this;
};

map.prototype.clearMarker = function (marker) {
  marker.setMap(null);
  return this;
};

map.prototype.setCenter = function (lat, lng) {
  this.map.setCenter(new google.maps.LatLng(lat, lng));
  return this;
};

map.prototype.setZoom = function (zoom) {
  this.map.setZoom(zoom);
  return this;
};

map.prototype.geocode = function (options, cb) {
  this.geocoder.geocode(options, cb);
  return this;
};

map.prototype.getStyle = function () {
  return [{
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
  }];
};

export
default map;
