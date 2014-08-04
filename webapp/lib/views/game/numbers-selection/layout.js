
//---------------------------------------------------------------

var Marionette    = require('Marionette'),
    template      = require('./layout.hbs'),
    BallsView     = require('./balls-view'),
    SelectionView = require('./selection-view');

//---------------------------------------------------------------

var PickNumbersLayout = module.exports = Marionette.LayoutView.extend({

    template: template,

    regions: {
        numbers:   '.numbers',
        selection: '.selection'
    },

    onRender : function(){
      this.numbers.show( new BallsView() );
      this.selection.show( new SelectionView() );
    }
});

//---------------------------------------------------------------
