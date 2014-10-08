var _ = require('lodash'),
  request = require('request'),
  Q = require('q');

var Facebook = module.exports = function () {
  return {

    //--------------------------------------------------------------------------

    isFan: function (passports) {

      var deferred = Q.defer();
      var facebook = _.find(passports, {
        'provider': 'facebook'
      });

      if (facebook) {
        var accessToken = facebook.tokens.accessToken;

        var url = require('url').format({
          protocol: 'https',
          host: 'graph.facebook.com',
          pathname: 'me/likes/379432705492888',
          query: {
            access_token: accessToken
          }
        });

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
    },

    //--------------------------------------------------------------------------

    postOnWall: function (passports, text) {

      var deferred = Q.defer();
      var facebook = _.find(passports, {
        'provider': 'facebook'
      });

      if (facebook) {
        var accessToken = facebook.tokens.accessToken;
        console.log(facebook);

        //local url = "https://graph.facebook.com/"..userManager.user.facebookId .."/feed?method=post&message="..utils.urlEncode(message).."&link="..utils.urlEncode("http://www.adillions.com").."&access_token=" .. GLOBALS.savedData.facebookAccessToken
        //print (url)

        var url = require('url').format({
          protocol: 'https',
          host: 'graph.facebook.com',
          pathname: 'me/likes/379432705492888',
          query: {
            access_token: accessToken
          }
        });

        // request.get(url, function (err, response, body) {
        //   if (err) {
        //     return deferred.reject(err);
        //   }
        //   var fan = JSON.parse(body).data.length === 1;
        //   deferred.resolve(fan);
        // });

        deferred.resolve('imp');

      } else {
        deferred.resolve(false);
      }

      return deferred.promise;
    }
  };

};
