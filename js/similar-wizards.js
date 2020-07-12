'use strict';

(function () {
  var MAX_SIMILAR_WIZARD_COUNT = 4;

  var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');
  var similarWizardsList = document.querySelector('.setup-similar-list');
  var form = document.querySelector('.setup-wizard-form');
  var userDialog = document.querySelector('.setup'); // объявляется в 4х модулях - делать экспорт из какого-нибудь?

  var getUniqueWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;
    return wizardElement;
  };

  var successHandler = function (wizards) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < MAX_SIMILAR_WIZARD_COUNT; i++) {
      var uniqueWizard = getUniqueWizard(wizards[i]);
      fragment.appendChild(uniqueWizard);
    }
    similarWizardsList.appendChild(fragment);
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.zIndex = 10;
    node.style.backgroundColor = 'red';
    node.style.textAlign = 'center';
    node.style.fontSize = '40px';
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  var windowLoadHandler = function () {
    window.backend.loadData(successHandler, errorHandler);
  };

  window.addEventListener('load', windowLoadHandler);

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.saveData(function () {
      userDialog.classList.add('hidden');
    }, errorHandler, new FormData(form));
  });
})();
