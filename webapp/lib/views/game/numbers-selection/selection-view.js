
//---------------------------------------------------------------

var Marionette  = require('Marionette'),
    app         = require('../../../application.js'),
    BallView    = require('../../components/ball-view');

//---------------------------------------------------------------

var NumbersView = module.exports = Marionette.CollectionView.extend({

    tagName:   'ul',    
    className: "drawing-balls",
    childView: BallView,

    initialize : function(options){
      this.collection = app.user.get('currentSelection');
    }

});

//---------------------------------------------------------------
