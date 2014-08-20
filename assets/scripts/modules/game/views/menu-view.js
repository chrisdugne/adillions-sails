/*global GameApp:false */

import app from 'game/application';

//---------------------------------------------------------------

var menu = Marionette.ItemView.extend({

  template: Handlebars.partials['game/_partials/menu-view'],

  events: {
    'click .play-btn': 'onClickPlayButton',
    'click .tickets-btn': 'onClickTicketsButton',
    'click .profile-btn': 'onClickProfileButton'
  },

  onClickPlayButton: function () {
    GameApp.router.navigate('play', {
      trigger: true
    });
  },

  onClickTicketsButton: function () {
    GameApp.router.navigate('tickets', {
      trigger: true
    });
  },

  onClickProfileButton: function () {
    GameApp.router.navigate('profile', {
      trigger: true
    });
  }

});

export
default menu;

//---------------------------------------------------------------
