var UserService = module.exports = function () {
  return {

    //--------------------------------------------------------------------------

    read: function (token, next) {
      console.log(token);
      User
        .findOne()
        .where({
          auth_token: token
        })
        .then(function updateUser(user) {
          console.log(user.uid);
          user.username = 'popi333';
          return user.save();
        }).then(function findTicket(user) {
          console.log(user.username);
          return [user, sails.models.ticket
            .find()
            .limit(30)
            .where({
              player_uid: user.uid
            })
          ];
        }).spread(function updateUserTickets(user, tickets) {
          user.lotteryTickets = tickets;
          return user;
        })
        .then(function done(user) {
          next(null, user);
        })
        .fail(function (err) {
          sails.log.error('Lottery#getNextLottery Service: query fails', err);
          next(err);
        });

    },

    //--------------------------------------------------------------------------

  };
};
