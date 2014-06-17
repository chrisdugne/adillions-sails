import Map from 'main/map';

var global = function () {
  // enable tooltip
  $('#js-global-players .badge-wrap').tooltip();

  var globalMap = new Map();
  globalMap.init('js-global-map').setCenter(40, 12).setZoom(2);

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
      })
      .clearBounds()
      .setBounds(position.lat(), position.lng())
      .panToBounds();
      return;
    }

    globalMap.geocode({
      'address': country
    }, function (results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        var position = results[0].geometry.location;
        globalMap.setMarker({
          position: position,
          title: title,
          animation: google.maps.Animation.DROP
        })
        .clearBounds()
        .setBounds(position.lat(), position.lng())
        .panToBounds();
        $(self).data('position', results[0].geometry.location);
      }
    });
  });

  $('#js-global-players .global-player:eq(1)').trigger('click');

};
export
default global;
