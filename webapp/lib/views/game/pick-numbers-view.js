
//---------------------------------------------------------------

var Marionette = require('Marionette'),
    app        = require('../../application.js'),
    template   = require('./pick-numbers-view.hbs'),
    NumView    = require('./num-view');

//---------------------------------------------------------------

var PickNumbers = module.exports = Marionette.CompositeView.extend({
    
    template:  template,
    childView: NumView,
    childViewContainer: ".drawing-balls",

    initialize : function(options){
      this.collection = app.nextDrawing.get('numbers');
    }
});

//---------------------------------------------------------------
