import login from 'main/login';
import register from 'main/register';

import team from 'main/team';

(function ($) {
  'use strict';

  var loginView = new login();
  var registerView = new register();
  team();

})(window.jQuery);
