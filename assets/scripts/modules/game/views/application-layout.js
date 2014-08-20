import 'game/views/application-layout';

//---------------------------------------------------------------

export
default = Marionette.LayoutView.extend({

  template: Handlebars.partials['game/_partials/application-layout'],
  el: '.webapp-container',

  regions: {
    menu: '.menu',
    main: '.main'
  }
});

//---------------------------------------------------------------
