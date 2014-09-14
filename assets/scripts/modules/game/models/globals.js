export
default Backbone.Model.extend({

  url: '/api/globals',

  initialize: function (options) {
    console.log('fetching globals');
    this.fetch(function () {
      console.log('received globals');
    });
  }
});
