var registerModel = Backbone.Model.extend({

  url: '/fr/auth/local/register',

  defaults: {
    username: '',
    email: '',
    password: ''
  },

  validation: {
    username: {
      required: true,
      msg: 'Please enter an username'
    },
    email: [{
      required: true,
      msg: 'Please enter an email address'
    }, {
      pattern: 'email',
      msg: 'Please enter a valid email'
    }],
    password: [{
      required: true,
      msg: 'Please enter a password'
    }, {
      minLength: 6,
      msg: 'Please enter a password with at least 6 characters'
    }],
    passwordRepeat: {
      equalTo: 'password',
      msg: 'Please enter the same password'
    }
  }
});

export
default registerModel;
