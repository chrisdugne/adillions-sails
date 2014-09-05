var _ = require('lodash'),
  url = require('url');

/**
 * GameController.js
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {
  index: function (req, res) {
    res.view({
      usePopTitle: true,
      bodyClass: 'profile',
      layout: 'layout'
    });
  }
};
