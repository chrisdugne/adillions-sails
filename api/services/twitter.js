var _ = require('lodash'),
  request = require('request'),
  Q = require('q'),
  Twit = require('twit');

var Twitter = module.exports = function () {

  var CONSUMER_KEY = 'mkJn1v9zVyKHnU7S6yLCg';
  var CONSUMER_SECRET = 'wIj7zjxPTwc8Mt2uAyf8azKmSgPEDwYpvpxdtQwic';
  var TWITTER_ADILLIONS_ID = '1922939570';

  return {

    //--------------------------------------------------------------------------

    isFollower: function (passports) {

      var deferred = Q.defer();
      var twitter = _.find(passports, {
        'provider': 'twitter'
      });

      if (twitter) {
        var T = new Twit({
          consumer_key:        CONSUMER_KEY,
          consumer_secret:     CONSUMER_SECRET,
          access_token:        twitter.tokens.token,
          access_token_secret: twitter.tokens.tokenSecret
        });

        T.get('friendships/show', {
          source_id: twitter.identifier,
          target_id: TWITTER_ADILLIONS_ID
        }, function (err, data, response) {
          if (err) {
            deferred.reject(err);
          }
          else{
            deferred.resolve(data.relationship.source.following);
          }
        });

      } else {
        deferred.resolve(false);
      }

      return deferred.promise;
    },

    //--------------------------------------------------------------------------

    tweet: function (passports, text) {

      var deferred = Q.defer();
      var twitter = _.find(passports, {
        'provider': 'twitter'
      });

      if (twitter) {
        var T = new Twit({
          consumer_key:        CONSUMER_KEY,
          consumer_secret:     CONSUMER_SECRET,
          access_token:        twitter.tokens.token,
          access_token_secret: twitter.tokens.tokenSecret
        });

        T.post('statuses/update', {
          status: text
        }, function (err, data, response) {
          if (err) {
            deferred.reject(err);
          }
          else{
            deferred.resolve(true);
          }
        });

      } else {
        deferred.resolve(false);
      }

      return deferred.promise;

    },

    //--------------------------------------------------------------------------

    follow: function (passports, text) {

      var deferred = Q.defer();
      var twitter = _.find(passports, {
        'provider': 'twitter'
      });

      if (twitter) {
        var T = new Twit({
          consumer_key:        CONSUMER_KEY,
          consumer_secret:     CONSUMER_SECRET,
          access_token:        twitter.tokens.token,
          access_token_secret: twitter.tokens.tokenSecret
        });

        T.post('friendships/create', {
          user_id: TWITTER_ADILLIONS_ID,
          follow: true
        }, function (err, data, response) {
          if (err) {
            deferred.reject(err);
          }
          else{
            deferred.resolve(true);
          }
        });

      } else {
        deferred.resolve(false);
      }

      return deferred.promise;

    }
  };

};
