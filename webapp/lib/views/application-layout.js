
//---------------------------------------------------------------

var Marionette = require('Marionette'),
    app        = require('../application.js'),
    template   = require('../../templates/application.hbs');

//---------------------------------------------------------------

var Layout = module.exports = Marionette.LayoutView.extend({

    template:  template,
    el: '.webapp-container',

    regions: {
        menu: '.menu',
        main: '.main'
    }
});

//---------------------------------------------------------------
