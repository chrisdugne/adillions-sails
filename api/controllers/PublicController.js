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
      .fail(function (err) {
        return res.serverError(err);
      });
  },

  //----------------------------------------------------------------------------

  readStatus: function (req, res) {
    new sails.services.public().readStatus()
      .then(function (result) {
        if (!result) {
          return res.notFound();
        }
        res.json(result);
      })
      .fail(function (err) {
        return res.serverError(err);
      });
  },

  //----------------------------------------------------------------------------

  readNextDrawing: function (req, res) {
    new sails.services.public().readNextDrawing()
      .then(function (result) {
        if (!result) {
          return res.notFound();
        }
        res.json(result);
      })
      .fail(function (err) {
        return res.serverError(err);
      });
  },

  //----------------------------------------------------------------------------

  readArchivedLotteries: function (req, res) {
    var limit = +req.param('limit') || 1000;
    new sails.services.public().readArchivedLotteries(limit)
      .then(function (result) {
        if (!result) {
          return res.notFound();
        }
        res.json(result);
      })
      .fail(function (err) {
        return res.serverError(err);
      });
  },

  //----------------------------------------------------------------------------

  readCharityLevels: function (req, res) {
    new sails.services.public().readCharityLevels()
      .then(function (result) {
        if (!result) {
          // require static data
          sails.log.error('public.controller#readCharityLevels : empty CharityLevels');
          return res.notFound();
        }
        res.json(result);
      })
      .fail(function (err) {
        return res.serverError(err);
      });
  },

  //----------------------------------------------------------------------------

  readAmbassadorLevels: function (req, res) {
    new sails.services.public().readAmbassadorLevels()
      .then(function (result) {
        if (!result) {
          // require static data
          sails.log.error('public.controller#readAmbassadorLevels : empty AmbassadorLevels');
          return res.notFound();
        }
        res.json(result);
      })
      .fail(function (err) {
        return res.serverError(err);
      });
  },

  //----------------------------------------------------------------------------

  readMobileSettings: function (req, res) {
    var id = req.param('id');
    new sails.services.public().readMobileSettings(id)
      .then(function (result) {
        if (!result) {
          return res.notFound();
        }
        res.json(result);
      })
      .fail(function (err) {
        return res.serverError(err);
      });
  }
};
