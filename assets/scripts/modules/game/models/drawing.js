import Balls from 'game/collections/balls';

export
default Backbone.Model.extend({

  url : '/api/nextLottery',

  defaults: {
    maxPick: 5,
    balls: null,
    result: null
  },

  initialize: function (options) {
    var balls = new Balls();
    for (var i = 0; i < 49; i++) {
      balls.add({
        selectable: true,
        value: i + 1
      });
    }

    this.set('balls', balls);
  }
});
