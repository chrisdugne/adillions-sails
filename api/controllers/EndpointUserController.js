var User = module.exports = {

  //----------------------------------------------------------------------------

  read: function (req, res) {
    var UserService = new sails.services.user(),
      uid = req.user ? req.user.uid : req.param('uid');
    UserService.read(uid, function (err, result) {
      if (err) {
        return res.serverError(err);
      }
      res.json(result);
    });
  }

  //----------------------------------------------------------------------------
};
