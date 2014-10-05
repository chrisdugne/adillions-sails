var PublicController = module.exports = {

  //----------------------------------------------------------------------------

  readGlobals: function (req, res) {
    new sails.services.public().readGlobals()
      .then(function (globals) {
        res.json({
          serverTime: new Date().getTime(),
          globals: globals
        });
      })
      .fail(function (err){
        return res.serverError(err);
      });
  },

  //----------------------------------------------------------------------------

  readLotteryStatus: function (req, res) {
    new sails.services.public().readLotteryStatus()
      .then(function (result) {
        res.json(result);
      })
      .fail(function (err){
        return res.serverError(err);
      });
  },

  //----------------------------------------------------------------------------

  readCharityLevels: function (req, res) {
    var PublicService = new sails.services.public();

    PublicService.readCharityLevels(function (err, result) {
      if (err) {
        return res.serverError(err);
      }
      res.json(result);
    });
  },

  //----------------------------------------------------------------------------

  readAmbassadorLevels: function (req, res) {
    var PublicService = new sails.services.public();

    PublicService.readAmbassadorLevels(function (err, result) {
      if (err) {
        return res.serverError(err);
      }
      res.json(result);
    });
  },

  //----------------------------------------------------------------------------

  readMobileSettings: function (req, res) {
    var PublicService = new sails.services.public(),
      id = req.param('id');

    PublicService.readMobileSettings(id, function (err, result) {
      if (err) {
        return res.serverError(err);
      }
      res.json(result);
    });
  }
};
