
var Backbone  = require('Backbone'),
    Number    = require('../models/number');

var Numbers = module.exports = Backbone.Collection.extend({
    model: Number
});
