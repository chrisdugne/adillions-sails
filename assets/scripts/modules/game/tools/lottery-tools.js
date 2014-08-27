import utils from 'game/tools/utils';

export
default {

  getNum: function (currentSelection) {

    var num = utils.random1(49);
    var alreadyChosen = false;

    for (var n = 0; n < currentSelection.length; n++) {
      if (num == currentSelection[n]) {
        alreadyChosen = true;
      }
    }

    if (!alreadyChosen) {
      return num;
    } else {
      return this.getNum(currentSelection);
    }
  }

};
