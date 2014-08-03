
//---------------------------------------------------------------

var Marionette = require('Marionette'),
    template   = require('../../templates/tickets.hbs');

//---------------------------------------------------------------

var Tickets = module.exports = Marionette.ItemView.extend({
    template:  template
});

//---------------------------------------------------------------
