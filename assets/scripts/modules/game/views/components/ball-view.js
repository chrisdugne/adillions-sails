/*global GameApp:false */

//---------------------------------------------------------------

var ball = Marionette.ItemView.extend({

  tagName: 'li',
  className: 'ball',

  events: {
    'click': 'onClick'
  },

  modelEvents: {
    'change': 'render'
  },

  render: function () {
    this.$el.html(this.model.get('value'));

    if (this.model.get('selected'))
      this.$el.addClass('selected');
    else
      this.$el.removeClass('selected');

    if (this.model.get('won'))
      this.$el.addClass('won');
    else
      this.$el.removeClass('won');
  },

  onClick: function () {
    if (this.model.get('selectable')) {
      if (this.model.get('selected')) {
        GameApp.user.unselect(this.model);
        this.model.set('selected', false);
      } else {
        var couldSelect = GameApp.user.tryToSelect(this.model);
        this.model.set('selected', couldSelect);
      }
    }
  }
});

export
default ball;

//---------------------------------------------------------------
