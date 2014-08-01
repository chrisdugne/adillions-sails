
var Marionette = require('Marionette'),
    template   = require('../../templates/application.hbs'),
    MenuView   = require('./menu-view'),
    PlayView   = require('./play-view');

var Layout = module.exports = Marionette.LayoutView.extend({

    template:  template,
    el: '.webapp-container',

    regions: {
        menu: '.menu',
        main: '.main'
    },

    onRender : function(){
        this.menu.show(new MenuView());
        this.main.show(new PlayView());
    }
});