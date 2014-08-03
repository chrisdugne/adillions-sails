
//---------------------------------------------------------------

var Marionette  = require('Marionette'),
    app         = module.exports = new Marionette.Application(),
    router      = require('./router'),
    layout      = require('./views/application-layout'),
    MenuView    = require('./views/menu-view');

//---------------------------------------------------------

app.addInitializer(function(){
  this.layout = new layout().render();
  this.layout.menu.show(new MenuView());  
  this.router.start();
});

//---------------------------------------------------------

app.start();

//---------------------------------------------------------

