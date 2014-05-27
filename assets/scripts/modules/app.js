import login from 'registration/login';
import signup from 'registration/signup';

import team from 'team/index';

(function ($) {
  'use strict';

  login();
  signup();

  team();

})(window.jQuery);
