var User = module.exports = {

  //----------------------------------------------------------------------------

  read: function (req, res) {
    var authToken = req.headers.authorization.split('Bearer ')[1];
    var UserService = new sails.services.user();
    UserService.read(authToken, function (err, result) {
      if (err) {
        return res.serverError(err);
      }
      res.json(result);
    });
  }

  //----------------------------------------------------------------------------
};
