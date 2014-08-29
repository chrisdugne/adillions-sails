var app = new Marionette.Application();

import lotteryTools from 'game/tools/lottery-tools';
import User from 'game/models/user';
import Drawing from 'game/models/drawing';
import Globals from 'game/models/globals';
import layout from 'game/views/application-layout';
import MenuView from 'game/views/menu-view';

import TicketsView from 'game/views/main/tickets-view';
import ProfileView from 'game/views/main/profile-view';
import PlayView from 'game/views/main/play-view';
import PickNumbersLayout from 'game/views/game/numbers-selection/layout';

//---------------------------------------------------------

var mainRouting = {

  openPlay: function () {
    if (app.user.isLoggedIn()) {
      app.layout.main.show(new PlayView());
    } else {
      window.location.href = '/login';
    }
  },

  openTickets: function () {
    console.log('on tickets : ', app.user.get('currentSelection'));
    app.layout.main.show(new TicketsView());
  },

  openProfile: function () {
    app.layout.main.show(new ProfileView());
  },

  checkTickets: function () {
    if (app.user.canFillOutATicket()) {
      app.layout.main.show(new PickNumbersLayout({
        model: app.nextDrawing
      }));
    }
  }

};

//---------------------------------------------------------------

app.router = new Marionette.AppRouter({

  controller: mainRouting,

  appRoutes: {
    'play': 'openPlay',
    'tickets': 'openTickets',
    'profile': 'openProfile',

    'fill-ticket': 'checkTickets'
  }
});

//---------------------------------------------------------------

app.router.start = function () {
  Backbone.history.start();
  this.navigate('play', {
    trigger: true
  });
};

//---------------------------------------------------------

app.addInitializer(function () {

  console.log('initialize');

  // models
  this.user        = new User();
  this.nextDrawing = new Drawing();
  this.globals     = new Globals();

  // view
  this.layout = new layout().render();
  this.layout.menu.show(new MenuView());

  // routing
  this.router.start();

});

//---------------------------------------------------------

export
default app;
