'use strict';

window.mocks = (function () {
  var WIZARDS_QUANTITY = 10;
  var WIZARD_NAMES = ['Иван', 'Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Кетт', 'Нионго', 'Ирвинг'];
  var WIZARD_COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var WIZARD_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

  var generateRandomWizards = function () {
    var generatedWizards = [];
    var orderVersion = window.randomize.getRandomNumber();

    for (var i = 0; i < WIZARDS_QUANTITY; i++) {
      var randomWizard = {
        name: (orderVersion === 0)
          ? WIZARD_NAMES[window.randomize.getRandomNumber(WIZARD_NAMES.length - 1)] + ' ' + WIZARD_SURNAMES[window.randomize.getRandomNumber(WIZARD_SURNAMES.length - 1)]
          : WIZARD_SURNAMES[window.randomize.getRandomNumber(WIZARD_SURNAMES.length - 1)] + ' ' + WIZARD_NAMES[window.randomize.getRandomNumber(WIZARD_NAMES.length - 1)],
        coatColor: window.colorize.getRandomColor(WIZARD_COAT_COLORS),
        eyesColor: window.colorize.getRandomColor(WIZARD_EYES_COLORS)
      };

      generatedWizards.push(randomWizard);
    }
    return generatedWizards;
  };

  return {
    generateRandomWizards: generateRandomWizards,
  };
})();
