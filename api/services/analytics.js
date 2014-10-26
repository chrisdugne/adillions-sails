var _ = require('lodash'),
  AnalyticsNode = require('analytics-node'),
  analytics = new AnalyticsNode(sails.config.analytics.writeKey, {
    flushAt: sails.config.analytics.flushAt
  });

function Analytics(params) {

  if (!_.isString(params.uid) && !_.isString(params.sid)) {
    throw new Error('AnalyticsService : the params should have at least a property uid or sid');
  }

  // uid (user.uid) or sid (req.sessionID)
  this.userId = params.uid || undefined;
  this.anonymousId = params.sid || undefined;

  // ['Signed Up', 'Logged In', 'Modified Account', 'Connected Provider']
  this.trackEvent = null;
}

Analytics.prototype.identify = function (traits) {

  var query = {
    traits: traits || {}
  };

  if (this.userId) {
    query.userId = this.userId;
  }

  if (this.anonymousId) {
    query.anonymousId = this.anonymousId;
  }

  analytics.identify(query);
  return this;
};

Analytics.prototype.track = function (event, properties) {

  var query = {
    event: event,
    properties: properties || {}
  };

  if (this.userId) {
    query.userId = this.userId;
  }

  if (this.anonymousId) {
    query.anonymousId = this.anonymousId;
  }

  sails.log.info('track#' + event);
  analytics.track(query);
  return this;
};

module.exports = Analytics;
