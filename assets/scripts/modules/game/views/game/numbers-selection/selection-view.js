/*global GameApp:false */
import BallView from 'game/views/components/ball-view';

//---------------------------------------------------------------

export
default Marionette.CollectionView.extend({

  tagName: 'ul',
  className: 'drawing-balls',
  childView: BallView,

  initialize: function (options) {
    this.collection = GameApp.user.get('currentSelection');
  }

});

//---------------------------------------------------------------
