export
default = {

  //return 1->i
  random1: function (i) {
    return Math.floor(Math.random() * i) + 1;
  },

  //return 0->i
  random0: function (i) {
    return Math.floor(Math.random() * (i + 1));
  }

}
