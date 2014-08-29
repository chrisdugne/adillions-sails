import Balls from 'game/collections/balls';

export
default Backbone.Model.extend({

  defaults: {
    currentSelection: null
  },

  initialize: function () {
    this.set('currentSelection', new Balls());
  },

  unselect: function (ball) {
    var selection = this.get('currentSelection');
    selection.remove(ball);
    this.set('currentSelection', selection);
  },

  tryToSelect: function (ball) {
    var selection = this.get('currentSelection'),
      canSelect = selection.length < 5;

    if (canSelect) {
      selection.add(ball);
      this.set('currentSelection', selection);
    }

    return canSelect;
  },

  isLoggedIn: function () {
    // TODO : link with Antoine's login strategy
    return true;
  },

  canFillOutATicket: function () {
    // TODO :
    //   - check if at least one ticket remains
    //   - check timer
    return true;
  }

});
