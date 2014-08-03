
//---------------------------------------------------------------

var Marionette = require('Marionette'),
    app        = require('../../application'),
    template   = require('./play-view.hbs');

//---------------------------------------------------------------

var Play = module.exports = Marionette.ItemView.extend({
    
    template:  template,

    events : {
        "click .fill-ticket-btn": "onClickFillButton"
    },

    onClickFillButton : function(){
        app.router.navigate('fill-ticket', {trigger : true});
    },
});

//---------------------------------------------------------------
