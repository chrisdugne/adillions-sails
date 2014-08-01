
var Marionette  = require('Marionette'),
    layout      = require('./views/application-layout');

//---------------------------------------------------------

var app = new Marionette.Application();

app.addInitializer(function(){
  this.layout = new layout().render();
});

app.start();

//---------------------------------------------------------

module.exports = app
