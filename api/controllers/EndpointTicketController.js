var EndpointTicket = module.exports = {

  //----------------------------------------------------------------------------

  read: function (req, res) {
    var user = req.user.uid,
      skip = parseInt(req.param('skip')) || 0;

    new sails.services.ticket().read(user, skip)
      .then(function (result) {
        res.json(result);
      })
      .fail(function (err) {
        return res.serverError(err);
      });
  },

  //----------------------------------------------------------------------------

  create: function (req, res) {
    var user = req.user.uid,
      numbers = req.body.numbers;

    new sails.services.ticket().create(user, numbers)
      .then(function (ticket) {
        res.json(ticket);
      })
      .fail(function (err) {
        res.json(err);
      });
  }

  //----------------------------------------------------------------------------

};
