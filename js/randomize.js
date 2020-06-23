'use strict';

window.randomize = (function () {
  return {
    getRandomNumber: function (maxRandomNumber) {
      var randomNumber = Math.round(Math.random() * (maxRandomNumber || 1));
      return randomNumber;
    }
  };
})();
