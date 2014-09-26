var UserService = module.exports = function () {
  return {

    //--------------------------------------------------------------------------

    read: function (token, next) {
      User
        .findOne()
        .where({
          auth_token: token
        })
        .then(function (user) {
          user.username = 'popi';
          console.log(user);
          user.save().then(function (user) {
            sails.models.ticket
              .find()
              .limit(30)
              .where({
                player_uid: user.uid
              })
              .then(function (tickets) {
                user.lotteryTickets = tickets;
                next(null, user);
              });
          });
        })
        .fail(function (err) {
          sails.log.error('Lottery#getNextLottery Service: query fails', err);
          next(err);
        });
    },

    //--------------------------------------------------------------------------

  };
};
