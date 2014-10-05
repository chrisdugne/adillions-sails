var _ = require('lodash'),
  url = require('url');

/**
 * UserController.js
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {

  profile: function (req, res) {
    res.view({
      isProfile: true,
      usePopTitle: true,
      bodyClass: 'profile',
      layout: 'layout'
    });
  }

};
