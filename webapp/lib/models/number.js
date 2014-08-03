
var Backbone = require('Backbone');

var Number = module.exports = Backbone.Model.extend({

    defaults: {
      value           : '',
      selected        : false,
      won             : false,
    }

});
