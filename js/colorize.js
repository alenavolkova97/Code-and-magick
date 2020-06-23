'use strict';

window.colorize = (function () {
  var WIZARD_COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var WIZARD_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var WIZARD_FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  var getRandomColor = function (colors) {
    return colors[window.randomize.getRandomNumber(colors.length - 1)];
  };

  return function (element, input, colors) {
    element.addEventListener('click', function () {
      var color = getRandomColor(colors);
      if (element.tagName === 'div') {
        element.style.backgroundColor = color;
      } else {
        element.style.fill = color;
      }
      input.value = color;
    });
  };
})();
