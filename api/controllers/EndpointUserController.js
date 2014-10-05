var EndpointUser = module.exports = {

  //----------------------------------------------------------------------------

  // TODO : promisify
  read: function (req, res) {
    var UserService = new sails.services.user(),
      uid = req.user ? req.user.uid : req.param('uid');
    UserService.read(uid, function (err, result) {
      if (err) {
        return res.serverError(err);
      }
      res.json(result);
    });
  },

  //----------------------------------------------------------------------------

  // TODO : promisify
  fetch: function (req, res) {
    var UserService = new sails.services.user(),
      uid = req.user ? req.user.uid : req.param('uid'),
      country = req.param('country'),
      mobileVersion = req.param('mobileVersion');

    UserService.fetch(uid, country, mobileVersion, function (err, result) {
      if (err) {
        return res.serverError(err);
      }
      res.json(result);
    });
  },

  //----------------------------------------------------------------------------

  // TODO : promisify
  update: function (req, res) {
    var UserService = new sails.services.user(),
      uid = req.user ? req.user.uid : req.param('uid'),
      user = req.body.user;

    UserService.update(uid, user, function (err, result) {
      if (err) {
        return res.serverError(err);
      }
      res.json(result);
    });
  }

  //----------------------------------------------------------------------------
};
