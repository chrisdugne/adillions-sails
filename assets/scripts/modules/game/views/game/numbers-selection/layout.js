import BallsView from 'game/views/game/numbers-selection/balls-view';
import SelectionView from 'game/views/game/numbers-selection/selection-view';

//---------------------------------------------------------------

export
default = Marionette.LayoutView.extend({

  template: Handlebars.partials['game/_partials/game/numbers-selection/layout'],

  regions: {
    numbers: '.numbers',
    selection: '.selection'
  },

  onRender: function () {
    this.numbers.show(new BallsView());
    this.selection.show(new SelectionView());
  }
});

//---------------------------------------------------------------
