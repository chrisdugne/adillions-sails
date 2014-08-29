/*global GameApp:false */
import BallView from 'game/views/components/ball-view';

//---------------------------------------------------------------

export
default Marionette.CompositeView.extend({

  template: Handlebars.partials['game/_partials/game/numbers-selection/balls-view'],
  childView: BallView,
  childViewContainer: '.drawing-balls',

  initialize: function (options) {
    this.collection = GameApp.nextDrawing.get('balls');
  }

});

//---------------------------------------------------------------
