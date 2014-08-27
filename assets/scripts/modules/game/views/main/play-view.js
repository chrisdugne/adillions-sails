/*global GameApp:false */
//---------------------------------------------------------------

export
default Marionette.ItemView.extend({

  template: Handlebars.partials['game/_partials/main/play-view'],

  events: {
    'click .fill-ticket-btn': 'onClickFillButton'
  },

  onClickFillButton: function () {
    GameApp.router.navigate('fill-ticket', {
      trigger: true
    });
  }
});

//---------------------------------------------------------------
