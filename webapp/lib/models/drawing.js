
var Backbone  = require('Backbone'),
    Numbers   = require('../collections/numbers');

var Drawing = module.exports = Backbone.Model.extend({
    
    defaults : {
      maxPick : 5,
      numbers : null,
      result  : null
    },

    initialize : function(options){
      var numbers = new Numbers();
      for(var i = 0; i < 49; i++){
        numbers.add({
          value : i+1
        });
      }

      this.set('numbers', numbers);
    }
});
