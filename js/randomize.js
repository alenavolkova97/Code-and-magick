'use strict';

window.randomize = (function () {
  var getRandomNumber = function (maxRandomNumber) {
    var randomNumber = Math.floor(Math.random() * ((maxRandomNumber + 1) || 1));
    return randomNumber;
  };
  return {
    getRandomNumber: getRandomNumber
  };
})();
