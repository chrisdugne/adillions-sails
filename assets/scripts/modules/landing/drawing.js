var drawing = function () {
  var lang = $('html').attr('lang'),
    $drawing = $('#js-highlight-drawing'),
    day = $drawing.data('day'),
    days = $drawing.data('days'),
    timestampMs = Number($drawing.data('timestamp')) * 1000;

  $drawing.find('.text')
    .countdown(timestampMs)
    .on('update.countdown', function (event) {
      var format = ' %H:%M:%S';
      if (event.offset.days === 1) {
        format = '%-D ' + day + format;
      } else if (event.offset.days > 1) {
        format = '%-D ' + days + format;
      }
      $(this).html(event.strftime(format));
    }).on('finish.countdown', function (event) {

    });

  $('#js-lucky-balls .lucky-ball').tooltip();
};
export
default drawing;
