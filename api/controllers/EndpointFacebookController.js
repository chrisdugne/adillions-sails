var Facebook = module.exports = {

  //----------------------------------------------------------------------------

  isFan: function (req, res) {
    return Passport
      .find({
        user: req.user.uid
      })
      .then(function (passports) {
        return sails.services.facebook().isFan(passports)
          .then(function (result) {
            res.json(result);
          });
      });
  },

  //----------------------------------------------------------------------------

  postOnWall: function (req, res) {
    var text = req.body.text;
    return Passport
      .find({
        user: req.user.uid
      })
      .then(function (passports) {
        return sails.services.facebook().postOnWall(passports, text)
          .then(function (result) {
            res.json(result);
          });
      });
  }

};
