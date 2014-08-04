
var Backbone  = require('Backbone'),
    Balls   = require('../collections/balls');

var Drawing = module.exports = Backbone.Model.extend({
    
    defaults : {
      maxPick : 5,
      balls : null,
      result  : null
    },

    initialize : function(options){
      var balls = new Balls();
      for(var i = 0; i < 49; i++){
        balls.add({
          selectable: true,
          value:      i+1
        });
      }

      this.set('balls', balls);
    }
});
