var Social = module.exports = {

  //----------------------------------------------------------------------------

  /* fan = facebook.like Adillions page */
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
  },

  //----------------------------------------------------------------------------

  /* follower = twitter.following @Adillions */
  isFollower: function (req, res) {
    return Passport
      .find({
        user: req.user.uid
      })
      .then(function (passports) {
        return sails.services.twitter().isFollower(passports)
          .then(function (result) {
            res.json(result);
          });
      });
  },

  //----------------------------------------------------------------------------

  tweet: function (req, res) {
    var text = req.body.text;
    return Passport
      .find({
        user: req.user.uid
      })
      .then(function (passports) {
        return sails.services.twitter().tweet(passports, text)
          .then(function (result) {
            res.json(result);
          });
      });
  },

  //----------------------------------------------------------------------------

  /* follower = twitter.following @Adillions */
  follow: function (req, res) {
    return Passport
      .find({
        user: req.user.uid
      })
      .then(function (passports) {
        return sails.services.twitter().follow(passports)
          .then(function (result) {
            res.json(result);
          });
      });
  }

};
