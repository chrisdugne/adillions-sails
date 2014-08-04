
//---------------------------------------------------------------

var Marionette   = require('Marionette'),
    app          = module.exports = new Marionette.Application(),
    router       = require('./router'),
    lotteryTools = require('./tools/lottery-tools'),
    User         = require('./models/user'),
    Drawing      = require('./models/drawing'),
    layout       = require('./views/application-layout'),
    MenuView     = require('./views/menu-view');

//---------------------------------------------------------

app.addInitializer(function(){

  // models
  this.user         = new User();
  this.nextDrawing  = new Drawing();

  // view
  this.layout = new layout().render();
  this.layout.menu.show(new MenuView());

  // routing
  this.router.start();

});

//---------------------------------------------------------

app.start();

//---------------------------------------------------------

