'use strict';

// константы

var WIZARDS_QUANTITY = 4;
var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

// переменные

var userDialog = document.querySelector('.setup');
var similarWizardsDialog = document.querySelector('.setup-similar');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');
var similarWizardsList = document.querySelector('.setup-similar-list');
var setupOpen = document.querySelector('.setup-open');
var setupClose = document.querySelector('.setup-close');
var setupUserName = userDialog.querySelector('.setup-user-name');

// объявления функций

var init = function () {
  setupOpen.addEventListener('click', function () {
    openUserDialog();
  });

  setupOpen.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      openUserDialog();
    }
  });

  setupClose.addEventListener('click', function () {
    closeUserDialog();
  });

  similarWizardsDialog.classList.remove('hidden');
  drawWizards();
};

var getRandomNumber = function (maxRandomNumber) { // оставила в этом файле, так как ругается eslint, если ее тут нет
  var randomNumber = Math.round(Math.random() * (maxRandomNumber || 1));
  return randomNumber;
};

var generateRandomWizards = function () {
  var wizardsArray = [];
  var orderVersion = getRandomNumber();
  for (var i = 0; i < WIZARDS_QUANTITY; i++) {
    wizardsArray.push({
      name: (orderVersion === 0) ? WIZARD_NAMES[getRandomNumber(WIZARD_NAMES.length - 1)] + ' ' + WIZARD_SURNAMES[getRandomNumber(WIZARD_SURNAMES.length - 1)] : WIZARD_SURNAMES[getRandomNumber(WIZARD_SURNAMES.length - 1)] + ' ' + WIZARD_NAMES[getRandomNumber(WIZARD_NAMES.length - 1)],
      coatColor: WIZARD_COAT_COLORS[getRandomNumber(WIZARD_COAT_COLORS.length - 1)],
      eyesColor: WIZARD_EYES_COLORS[getRandomNumber(WIZARD_EYES_COLORS.length - 1)]
    });
  }
  return wizardsArray;
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

var openUserDialog = function () {
  userDialog.classList.remove('hidden');

  document.addEventListener('keydown', userDialogEscPressHandler);
};

var closeUserDialog = function () {
  userDialog.classList.add('hidden');

  document.removeEventListener('keydown', userDialogEscPressHandler);
};

// объявления обработчиков

var userDialogEscPressHandler = function (evt) {
  if (evt.key === 'Escape' && document.activeElement !== setupUserName) {
    evt.preventDefault();
    userDialog.classList.add('hidden');
  }
};

// вызовы функций

init();
