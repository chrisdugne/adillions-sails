var accountModel = Backbone.Model.extend({

  validation: {
    userName: {
      required: false,
      msg: $.t('auth.empty_username')
    },
    firstName: {
      required: false,
      msg: $.t('auth.empty_username')
    },
    lastName: {
      required: false,
      msg: $.t('auth.empty_username')
    },
    birthDate: {
      required: false,
      msg: $.t('auth.empty_username')
    },
    email: [{
      required: true,
      msg: $.t('auth.empty_email')
    }, {
      pattern: 'email',
      msg: $.t('auth.valid_email')
    }]
  }
});

export
default accountModel;
