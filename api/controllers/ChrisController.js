var ChrisController = module.exports = {
  plop: function (req, res) {
    console.log('reached ChrisController.plop');
    res.view({
      layout: 'layout_chris_snake',
    });
  },
};
