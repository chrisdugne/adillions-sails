
//---------------------------------------------------------------

var Marionette = require('Marionette'),
    app        = require('../../../application.js'),
    BallView   = require('../../components/ball-view'),
    template   = require('./balls-view.hbs');

//---------------------------------------------------------------

var NumbersView = module.exports = Marionette.CompositeView.extend({
    
    template:  template,
    childView: BallView,
    childViewContainer: ".drawing-balls",

    initialize : function(options){
      this.collection = app.nextDrawing.get('balls');
    }

});

//---------------------------------------------------------------
