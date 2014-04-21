/**
 * AboutController.js
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {

  /**
   * `AboutController.index`
   */

  index: function (req, res) {
    return res.view({ usePopTitle: true });
  }
};
