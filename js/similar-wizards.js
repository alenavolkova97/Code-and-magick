'use strict';

(function () {
  var WIZARDS_QUANTITY = 4;
  var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var WIZARD_COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var WIZARD_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

  var similarWizardsDialog = document.querySelector('.setup-similar');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');
  var similarWizardsList = document.querySelector('.setup-similar-list');

  var generateRandomWizards = function () {
    var wizards = [];
    var orderVersion = window.randomize.getRandomNumber();
    for (var i = 0; i < WIZARDS_QUANTITY; i++) {
      var randomWizard = {
        name: (orderVersion === 0) ? WIZARD_NAMES[window.randomize.getRandomNumber(WIZARD_NAMES.length - 1)] + ' ' + WIZARD_SURNAMES[window.randomize.getRandomNumber(WIZARD_SURNAMES.length - 1)] : WIZARD_SURNAMES[window.randomize.getRandomNumber(WIZARD_SURNAMES.length - 1)] + ' ' + WIZARD_NAMES[window.randomize.getRandomNumber(WIZARD_NAMES.length - 1)],
        coatColor: window.colorize.getRandomColor(WIZARD_COAT_COLORS),
        eyesColor: window.colorize.getRandomColor(WIZARD_EYES_COLORS)
      };
      wizards.push(randomWizard);
    }
    return wizards;
  };

  var getUniqueWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
    return wizardElement;
  };

  var drawWizards = function () {
    var fragment = document.createDocumentFragment();
    var wizards = generateRandomWizards();
    for (var i = 0; i < wizards.length; i++) {
      var uniqueWizard = getUniqueWizard(wizards[i]);
      fragment.appendChild(uniqueWizard);
    }
    similarWizardsList.appendChild(fragment);
  };

  var windowLoadHandler = function () {
    similarWizardsDialog.classList.remove('hidden');
    drawWizards();
  };

  window.addEventListener('load', windowLoadHandler);
})();
