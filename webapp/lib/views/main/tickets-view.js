
//---------------------------------------------------------------

var Marionette = require('Marionette'),
    template   = require('./tickets-view.hbs');

//---------------------------------------------------------------

var Tickets = module.exports = Marionette.ItemView.extend({
    template:  template
});

//---------------------------------------------------------------
