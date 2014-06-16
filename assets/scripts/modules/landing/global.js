var global = function () {
  // enable tooltip
  $('#js-global-players .badge-wrap').tooltip();

  google.maps.event.addDomListener(window, 'load', function(){
    var map = new google.maps.Map(document.getElementById('js-global-map'), {
      panControl: false,
      zoomControl: false,
      scaleControl: false,
      scrollwheel: false,
      draggable: false,
      overviewMapControl: false,
      streetViewControl: false,
      mapTypeControl: false,
      disableDoubleClickZoom: true,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      mapTypeControlOptions: {
        mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'simple']
      }
    });
  });


};
export
default global;
