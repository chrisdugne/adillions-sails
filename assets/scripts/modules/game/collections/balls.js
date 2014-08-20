/*jshint -W024 */

import Ball from 'game/models/ball';

export
default = Backbone.Collection.extend({
  model: Ball,
  comparator: 'value'
});
