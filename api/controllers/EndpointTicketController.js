var EndpointTicket = module.exports = {

  //----------------------------------------------------------------------------

  read: function (req, res) {
    var TicketService = new sails.services.ticket(),
      user = req.user.uid,
      skip = parseInt(req.param('skip')) || 0;

    TicketService.read(user, skip, function (err, result) {
      if (err) {
        return res.serverError(err);
      }
      res.json(result);
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
        console.log(err);
        res.json(err);
      });
  }

  //----------------------------------------------------------------------------

};
