module.exports = function (token, next) {
  User.findOne({
    auth_token: token
  }, function (err, user) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return next(null, false);
    }
    next(null, user, {
      scope: 'all'
    });
  });
};
