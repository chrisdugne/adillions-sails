var loginModel = Backbone.Model.extend({

  url: '/fr/auth/local',

  defaults: {
    identifier: '',
    password: ''
  },

  validation: {
    identifier: {
      required: true,
      msg: 'Please enter an username or email'
    },
    password: {
      required: true,
      msg: 'Please enter a password'
    }
  }
});

export
default loginModel;
