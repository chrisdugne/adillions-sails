module.exports = function (req, res, next) {

  var config = req._sails.config;

  var layout = {
    country: {
      code: 'US'
    },
    api: config.api
  };

  _.merge(res.locals, layout);

  next();

};
