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
      usePopTitle: true,
      bodyClass: 'profile',
      layout: 'layout'
    });
  },
  account: function (req, res) {
    res.view({
      usePopTitle: true,
      bodyClass: 'account',
      layout: 'layout'
    });
  },

  endpoints: function(){
      return {
        read: function (req, res) {
          console.log('------------------> NEW FETCH USER');
        }
      }
  }
};
