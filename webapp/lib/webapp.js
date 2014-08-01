
var Game = require('./game.js');
// var _ = require('underscore');
var Marionette = require('Marionette');
// var Backbone = require('Backbone');

/* app startup */
$(function() {
    var game = Game();
    // game.setElement($(".webapp-container"));
    console.log('webapp ready');
    console.log(Marionette);
});
