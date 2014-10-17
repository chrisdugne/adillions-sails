var User = module.exports = {

  //----------------------------------------------------------------------------

  read: function (req, res) {
    var uid = req.user ? req.user.uid : req.param('uid');

    new sails.services.user().read(uid)
      .then(function (result) {
        res.json(result);
      })
      .fail(function (err) {
        return res.serverError(err);
      });
  },

  //----------------------------------------------------------------------------

  fetch: function (req, res) {
    var uid = req.user ? req.user.uid : req.param('uid'),
      country = req.body.country,
      mobileVersion = req.body.mobileVersion;

    new sails.services.user().fetch(uid, country, mobileVersion)
      .then(function (result) {
        res.json(result);
      })
      .fail(function (err) {
        return res.serverError(err);
      });
  },

  //----------------------------------------------------------------------------

  cashout: function (req, res) {
    var uid = req.user ? req.user.uid : req.param('uid');

    new sails.services.user().cashout(uid)
      .then(function (result) {
        res.json(result);
      })
      .fail(function (err) {
        return res.serverError(err);
      });
  },

  //----------------------------------------------------------------------------

  update: function (req, res) {
    var uid = req.user ? req.user.uid : req.param('uid'),
      user = req.body.user;

    new sails.services.user().update(uid, user)
      .then(function (result) {
        res.json(result);
      })
      .fail(function (err) {
        return res.serverError(err);
      });

  }

  //----------------------------------------------------------------------------
};
