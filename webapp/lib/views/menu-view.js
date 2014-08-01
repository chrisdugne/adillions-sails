
var Marionette = require('Marionette'),
    template   = require('../../templates/menu.hbs');

var Menu = module.exports = Marionette.ItemView.extend({
    
    template:  template,

    events : {
        "click .play-btn":    "onOpenPlay",
        "click .tickets-btn": "onOpenTickets",
        "click .profile-btn": "onOpenProfile"
    },

    onOpenPlay : function(){
        console.log('onOpenPlay');
    },

    onOpenTickets : function(){
        console.log('onOpenTickets');
    },

    onOpenProfile : function(){
        console.log('onOpenProfile');
    },

});