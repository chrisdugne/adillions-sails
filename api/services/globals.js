function Globals() {
  // construtor
}

Globals.prototype.fetch = function (next) {
  sails.models.global
    .find()
    .where({
      id: 'current'
    })
    .then(function (result) {
      if (!result || !result.length) {
        throw new Error('empty globals');
      }
      next(null, result[0]);
    })
    .fail(function (err) {
      sails.log.error('Globals#fetch Service: query fails', err);
      next(err);
    });
};

module.exports = Globals;
