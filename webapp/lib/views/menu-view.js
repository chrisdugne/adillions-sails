
//---------------------------------------------------------------

var Marionette = require('Marionette'),
    app        = require('../application'),
    template   = require('./menu-view.hbs');

//---------------------------------------------------------------

var Menu = module.exports = Marionette.ItemView.extend({
    
    template:  template,

    events : {
        "click .play-btn":    "onClickPlayButton",
        "click .tickets-btn": "onClickTicketsButton",
        "click .profile-btn": "onClickProfileButton"
    },

    onClickPlayButton : function(){
        app.router.navigate('play', {trigger : true});
    },

    onClickTicketsButton : function(){
        app.router.navigate('tickets', {trigger : true});
    },

    onClickProfileButton : function(){
        app.router.navigate('profile', {trigger : true});
    }

});

//---------------------------------------------------------------
