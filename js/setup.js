'use strict';

// константы

var WIZARDS_QUANTITY = 4;
var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var WIZARD_FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

// переменные

var userDialog = document.querySelector('.setup');
var similarWizardsDialog = document.querySelector('.setup-similar');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');
var similarWizardsList = document.querySelector('.setup-similar-list');
var setupOpen = document.querySelector('.setup-open');
var setupClose = document.querySelector('.setup-close');
var userNameInput = userDialog.querySelector('.setup-user-name');
var form = document.querySelector('.setup-wizard-form');
var wizardCoat = document.querySelector('.wizard-coat');
var wizardEyes = document.querySelector('.wizard-eyes');
var wizardFireball = document.querySelector('.setup-fireball');
var wizardCoatColorInput = document.querySelector('input[name="coat-color"]');
var wizardEyesColorInput = document.querySelector('input[name="eyes-color"]');
var wizardFireballColorInput = document.querySelector('input[name="fireball-color"]');

var MIN_NAME_LENGTH = userNameInput.minLength;
var MAX_NAME_LENGTH = userNameInput.maxLength;

// объявления функций

var init = function () {
  similarWizardsDialog.classList.remove('hidden');
  drawWizards();

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

  userNameInput.addEventListener('input', userNameInputChangeHandler);
  wizardCoat.addEventListener('click', wizardCoatClickHandler);
  wizardEyes.addEventListener('click', wizardEyesClickHandler);
  wizardFireball.addEventListener('click', wizardFireballClickHandler);
};

var getRandomNumber = function (maxRandomNumber) { // временно
  var randomNumber = Math.round(Math.random() * (maxRandomNumber || 1));
  return randomNumber;
};

var generateRandomWizards = function () {
  var wizards = [];
  var orderVersion = getRandomNumber();
  for (var i = 0; i < WIZARDS_QUANTITY; i++) {
    var randomWizard = {
      name: (orderVersion === 0) ? WIZARD_NAMES[getRandomNumber(WIZARD_NAMES.length - 1)] + ' ' + WIZARD_SURNAMES[getRandomNumber(WIZARD_SURNAMES.length - 1)] : WIZARD_SURNAMES[getRandomNumber(WIZARD_SURNAMES.length - 1)] + ' ' + WIZARD_NAMES[getRandomNumber(WIZARD_NAMES.length - 1)],
      coatColor: WIZARD_COAT_COLORS[getRandomNumber(WIZARD_COAT_COLORS.length - 1)],
      eyesColor: WIZARD_EYES_COLORS[getRandomNumber(WIZARD_EYES_COLORS.length - 1)]
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
  if (evt.key === 'Escape' && document.activeElement !== userNameInput) {
    evt.preventDefault();
    userDialog.classList.add('hidden');
  }
};

var userNameInputChangeHandler = function () {
  var valueLength = userNameInput.value.length;
  if (!form.reportValidity() && valueLength < MIN_NAME_LENGTH) {
    userNameInput.setCustomValidity('Имя должно состоять минимум из 2-х символов. Введите ещё ' + (MIN_NAME_LENGTH - valueLength) + ' симв.');
  } else if (!form.reportValidity() && valueLength > MAX_NAME_LENGTH) {
    userNameInput.setCustomValidity('Имя не должно превышать 25-ти символов. Удалите лишние ' + (valueLength - MAX_NAME_LENGTH) + ' симв.');
  } else if (userNameInput.validity.valueMissing) {
    userNameInput.setCustomValidity('Обязательное поле');
  } else {
    userNameInput.setCustomValidity('');
  }
};

var wizardCoatClickHandler = function () {
  var wizardCoatColor = WIZARD_COAT_COLORS[getRandomNumber(WIZARD_COAT_COLORS.length - 1)];
  wizardCoat.style.fill = wizardCoatColor;
  wizardCoatColorInput.value = wizardCoatColor;
};

var wizardEyesClickHandler = function () {
  var wizardEyesColor = WIZARD_EYES_COLORS[getRandomNumber(WIZARD_EYES_COLORS.length - 1)];
  wizardEyes.style.fill = wizardEyesColor;
  wizardEyesColorInput.value = wizardEyesColor;
};

var wizardFireballClickHandler = function () {
  var fireballColor = WIZARD_FIREBALL_COLORS[getRandomNumber(WIZARD_FIREBALL_COLORS.length - 1)];
  wizardFireball.style.backgroundColor = fireballColor;
  wizardFireballColorInput.value = fireballColor;
};

var windowLoadHandler = function () {
  init();
};

// событие загрузки страницы - код вне функции
window.addEventListener('load', windowLoadHandler);
