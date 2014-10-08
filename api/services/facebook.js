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
        var accessToken = facebook.tokens.accessToken,
          facebookId = facebook.identifier;

        var url = require('url').format({
          protocol: 'https',
          host: 'graph.facebook.com',
          pathname: facebookId + '/feed',
          query: {
            method: 'post',
            message: text,
            link: 'http://www.adillions.com',
            access_token: accessToken
          }
        });

        console.log(url);

        request.get(url, function (err, response, body) {
          if (err) {
            return deferred.reject(err);
          }

          var result = JSON.parse(body);

          console.log('-------');
          console.log(result);
          console.log(result.id);
          console.log(result["id"]);

          if (result.id) {
            console.log('ok');
            deferred.resolve(true);
          } else {
            console.log('error');
            deferred.resolve(false);
          }
        });

      } else {
        return deferred.reject('#postOnWall : no passport');
      }

      return deferred.promise;
    }
  };

};
