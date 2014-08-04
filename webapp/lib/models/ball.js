
var Backbone = require('Backbone');

/* note for theme ball : 
    value = 99 (for comparator), 
    image !null 
*/
var Ball = module.exports = Backbone.Model.extend({

    defaults: {
      value           : '',
      selectable      : false,
      selected        : false,
      won             : false,
      image           : null 
    }

});
