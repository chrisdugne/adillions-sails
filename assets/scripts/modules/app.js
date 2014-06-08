import login from 'registration/login';
import signup from 'registration/signup';

import team from 'team/index';
import landing from 'landing/index';

(function ($) {
  'use strict';

  login();
  signup();

  landing();
  team();

})(window.jQuery);
