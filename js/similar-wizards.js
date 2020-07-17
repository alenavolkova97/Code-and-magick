'use strict';

window.similarWizards = (function () {
  var MAX_SIMILAR_WIZARD_COUNT = 4;

  var wizards = [];
  var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');
  var similarWizardsList = document.querySelector('.setup-similar-list');

  var getUniqueWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;
    return wizardElement;
  };

  var drawWizards = function (data) {
    similarWizardsList.innerHTML = '';
    var takeNumber = data.length > MAX_SIMILAR_WIZARD_COUNT ? MAX_SIMILAR_WIZARD_COUNT : data.length;
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < takeNumber; i++) {
      var uniqueWizard = getUniqueWizard(data[i]);
      fragment.appendChild(uniqueWizard);
    }
    similarWizardsList.appendChild(fragment);
  };

  var getRank = function (wizard) {
    var rank = 0;
    if (wizard.colorCoat === window.setup.coatColor()) {
      rank += 2;
    }
    if (wizard.colorEyes === window.setup.eyesColor()) {
      rank += 1;
    }
    return rank;
  };

  var namesComparator = function (a, b) {
    if (a > b) {
      return 1;
    } else if (a < b) {
      return -1;
    } else {
      return 0;
    }
  };

  var updateWizards = function () {
    drawWizards(wizards.slice().sort(function (a, b) {
      var rankDiff = getRank(b) - getRank(a);
      if (rankDiff === 0) {
        rankDiff = namesComparator(a.name, b.name);
      }
      return rankDiff;
    }));
  };

  var successHandler = function (data) {
    wizards = data;
  };

  var windowLoadHandler = function () {
    window.backend.loadData(successHandler, window.setup.errorHandler);
  };

  window.addEventListener('load', windowLoadHandler);

  return {
    updateWizards: updateWizards,
  };
})();
