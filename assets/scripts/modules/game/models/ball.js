/* note for theme ball :
    value = 99 (for comparator),
    image !null
*/
export
default Backbone.Model.extend({

  defaults: {
    value: '',
    selectable: false,
    selected: false,
    won: false,
    image: null
  }

});
