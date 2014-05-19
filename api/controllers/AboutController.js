/**
 * AboutController.js
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {

  index: function (req, res) {
    res.view({
      usePopTitle: true
    });
  },

  reward: function (req, res) {
    return res.view({
      usePopTitle: true
    });
  },

  prizes: function (req, res) {
    return res.view({
      usePopTitle: true
    });
  },

  press: function (req, res) {
    return res.view({
      usePopTitle: true
    });
  },

  faq: function (req, res) {
    return res.view({
      usePopTitle: true
    });
  },

  rules: function (req, res) {
    return res.view({
      usePopTitle: true
    });
  },

  jobs: function (req, res) {
    return res.view({
      usePopTitle: true
    });
  },

  privacy: function (req, res) {
    return res.view({
      usePopTitle: true
    });
  },

  terms: function (req, res) {
    return res.view({
      usePopTitle: true
    });
  },

  advertisers: function (req, res) {
    return res.view({
      usePopTitle: true
    });
  }
};
