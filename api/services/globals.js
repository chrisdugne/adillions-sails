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
      next(null, result[0]);
    });
};

module.exports = Globals;
