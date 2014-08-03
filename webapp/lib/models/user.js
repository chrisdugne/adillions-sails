
var Backbone  = require('Backbone');

var User = module.exports = Backbone.Model.extend({
    
    defaults : {
      currentSelection : [],
    },

    isLoggedIn : function(){
      // TODO : link with Antoine's login strategy
      return true;
    },

    canFillOutATicket : function(){
      // TODO : 
      //   - check if at least one ticket remains
      //   - check timer
      return true;
    }

});
