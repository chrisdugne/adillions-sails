import drawing from 'landing/drawing';
import parallax from 'landing/parallax';
import global from 'landing/global';

(function ($) {
  'use strict';

  drawing();
  parallax();
  // wait load of google maps; see home/index.hbs
  //global();

})(window.jQuery);
