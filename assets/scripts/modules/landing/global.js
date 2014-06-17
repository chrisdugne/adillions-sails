import Map from 'main/map';

var global = function () {
  // enable tooltip
  $('#js-global-players .badge-wrap').tooltip();

  var globalMap = new Map();
  globalMap.init('js-global-map').setCenter(40, -15).setZoom(2);

  $('#js-global-players').on('click', '.global-player', function (e) {
    if ($(this).hasClass('active')) {
      return;
    }

    $(this).addClass('active').siblings().removeClass('active');

    var self = this,
      title = $(this).data('title'),
      country = $(this).data('country'),
      position = $(this).data('position');

    globalMap.clearMarkers();

    if (position) {
      globalMap.setMarker({
        position: position,
        title: title,
        animation: google.maps.Animation.DROP
      });
      return;
    }

    globalMap.geocode({
      'address': country
    }, function (results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        globalMap.setMarker({
          position: results[0].geometry.location,
          title: title,
          animation: google.maps.Animation.DROP
        });
        $(self).data('position', results[0].geometry.location);
      }
    });
  });

  $('#js-global-players .global-player:eq(1)').trigger('click');

};
export
default global;
