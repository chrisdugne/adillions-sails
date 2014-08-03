
//---------------------------------------------------------------

var Marionette = require('Marionette');

//---------------------------------------------------------------

var NumView = module.exports = Marionette.ItemView.extend({
    
    tagName:   'li',
    className: 'ball',

    events : {
        "click": "onClick",
    },

    modelEvents : {
      "change" : "render"
    },

    render : function(){
      this.$el.html(this.model.get('value'));

      if(this.model.get('selected'))
        this.$el.addClass('selected');

      if(this.model.get('won'))
        this.$el.addClass('won');
    },
    
    onClick : function(){
        this.$el.toggleClass('selected');
    }
});

//---------------------------------------------------------------
