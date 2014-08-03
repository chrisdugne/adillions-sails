
//---------------------------------------------------------------

var Marionette      = require('Marionette'),
    app             = require('./application'),
    lotteryTools    = require('./tools/lottery-tools'),
    TicketsView     = require('./views/main/tickets-view'),
    ProfileView     = require('./views/main/profile-view'),
    PlayView        = require('./views/main/play-view'),
    PickNumbersView = require('./views/game/pick-numbers-view');

//---------------------------------------------------------------

var mainRouting = {

  openPlay: function(){
    if(app.user.isLoggedIn()){
      app.layout.main.show(new PlayView());
    }
    else{
      window.location.href = '/login';
    }
  },

  openTickets: function(){
    console.log('on tickets : ', app.user.get('currentSelection'));
    app.layout.main.show(new TicketsView());
  },
  
  openProfile: function(){
    app.layout.main.show(new ProfileView());
  },

  checkTickets: function(){
    if(app.user.canFillOutATicket()){
      app.layout.main.show(new PickNumbersView({
        model : app.nextDrawing
      }));
    }
  },

};

//---------------------------------------------------------------

app.router = new Marionette.AppRouter({

  controller: mainRouting,
  
  appRoutes: {
    "play":    "openPlay",
    "tickets": "openTickets",
    "profile": "openProfile",
    
    "fill-ticket": "checkTickets"
  },
});

//---------------------------------------------------------------

app.router.start = function(){
  Backbone.history.start();
  this.navigate('play', {trigger : true});
};

//---------------------------------------------------------------
