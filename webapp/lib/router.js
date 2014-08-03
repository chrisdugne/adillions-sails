
//---------------------------------------------------------------

var Marionette  = require('Marionette'),
    app         = require('./application'),
    TicketsView = require('./views/tickets-view'),
    ProfileView = require('./views/profile-view'),
    PlayView    = require('./views/play-view');

//---------------------------------------------------------------

var appController = {

  openPlay: function(){
    app.layout.main.show(new PlayView());
  },
  
  openTickets: function(){
    app.layout.main.show(new TicketsView());
  },
  
  openProfile: function(){
    app.layout.main.show(new ProfileView());
  }

};

//---------------------------------------------------------------

app.router = new Marionette.AppRouter({
  controller: appController,
  appRoutes: {
    "play":    "openPlay",
    "tickets": "openTickets",
    "profile": "openProfile"
  },
});

//---------------------------------------------------------------

app.router.start = function(){
  Backbone.history.start();
  this.navigate('play', {trigger : true});
};

//---------------------------------------------------------------
