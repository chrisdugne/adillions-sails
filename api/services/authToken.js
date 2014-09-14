var jwt = require('jsonwebtoken');

module.exports.issueToken = function (payload) {
  var token = jwt.sign(payload, sails.config.session.secret || 'our biggest secret');
  return token;
};

module.exports.verifyToken = function (token, next) {
  return jwt.verify(token, sails.config.session.secret || 'our biggest secret', {}, next);
};
