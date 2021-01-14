'use strict';

window.colorize = (function () {
  var getRandomColor = function (colors) {
    return colors[window.randomize.getRandomNumber(colors.length - 1)];
  };

  var colorizeElement = function (element, input, colors) {
    var color = colors[window.randomize.getRandomNumber(colors.length - 1)];

    if (element.tagName.toLowerCase() === 'div') {
      element.style.backgroundColor = color;
    } else {
      element.style.fill = color;
    }

    input.value = color;

    return color;
  };

  return {
    getRandomColor: getRandomColor,
    colorizeElement: colorizeElement
  };
})();
