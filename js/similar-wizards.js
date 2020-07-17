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

  var updateWizards = function () {
    var sameCoatAndEyesWizards = wizards.filter(function (it) {
      return it.colorCoat === window.setup.coatColor && it.colorEyes === window.setup.eyesColor;
    });

    var sameCoatWizards = wizards.filter(function (it) {
      return it.colorCoat === window.setup.coatColor;
    });
    var sameEyesWizards = wizards.filter(function (it) {
      return it.colorEyes === window.setup.eyesColor;
    });
    var filteredWizards = sameCoatAndEyesWizards;
    filteredWizards = filteredWizards.concat(sameCoatWizards);
    filteredWizards = filteredWizards.concat(sameEyesWizards);
    filteredWizards = filteredWizards.concat(wizards);
    var uniqueWizards = filteredWizards.filter(function (it, i) {
      return filteredWizards.indexOf(it) === i;
    });
    drawWizards(uniqueWizards);
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
