
var Backbone  = require('Backbone'),
    Ball      = require('../models/ball');

var Balls = module.exports = Backbone.Collection.extend({
    model:      Ball,
    comparator: 'value'
});
