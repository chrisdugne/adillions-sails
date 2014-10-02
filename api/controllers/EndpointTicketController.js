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

};
