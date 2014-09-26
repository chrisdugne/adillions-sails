var UserService = module.exports = function () {
  return {

    //--------------------------------------------------------------------------

    read: function (uid, next) {

      if (!_.isFunction(next)) {
        throw new Error('User#read Service: the callback function is mandatory');
      }

      if (!_.isString(uid)) {
        throw new Error('User#read Service: the uid param is mandatory and should be a string');
      }

      User
        .findOne({uid: uid})
        .populate('tickets')
        .then(function done(user) {
          next(null, user);
        })
        .fail(function (err) {
          sails.log.error('User#read Service: query fails', err);
          next(err);
        });
    },

    //--------------------------------------------------------------------------

  };
};
