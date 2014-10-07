var _ = require('lodash'),
  request = require('request'),
  Q = require('q');

var Facebook = module.exports = function () {
  return {

    //--------------------------------------------------------------------------

    isFan: function (passports) {

      var deferred = Q.defer();
      var facebookPassport = _.find(passports, {
        'provider': 'facebook'
      });

      if (facebookPassport) {
        var accessToken = facebookPassport.tokens.accessToken;
        var url = 'https://graph.facebook.com/me/likes/379432705492888?access_token=' + accessToken;

        request.get(url, function (err, response, body) {
          if (err) {
            return deferred.reject(err);
          }
          var fan = JSON.parse(body).data.length === 1;
          deferred.resolve(fan);
        });

      } else {
        deferred.resolve(false);
      }

      return deferred.promise;
    }
  };

};
