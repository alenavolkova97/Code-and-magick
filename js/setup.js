'use strict';

var WIZARDS_QUANTITY = 4;
var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

var userDialog = document.querySelector('.setup');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');
var similarWizardsList = document.querySelector('.setup-similar-list');
var fragment = document.createDocumentFragment();
var wizards = [];

var getRandomNumber = function (maxRandomNumber) {
  // Эта функция уже есть в stat.js - файл setup.js подключается после stat.js, есть ли необходимость писать эту функцию сюда еще раз?
  var randomNumber = Math.round(Math.random() * (maxRandomNumber || 1));
  return randomNumber;
};

var renderWizard = function (wizardsArray) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  var wizard = wizardsArray[i];
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  return wizardElement;
};

var addWizardElement = function (newWizardElement) {
  // В задании просили "создать отдельную функцию заполнения блока DOM-элементами на основе массива JS-объектов." Правильно ли включать в эту функцию добавление фрагмента в элемент? Ведь фунцию я вызываю в цикле, а значит, фрагмент тоже будет 4 раза добавляться. Либо создать функцию для формирования только фрагмента, а уже фрагмент в similarWizardsList добавлять вне функции?
  fragment.appendChild(newWizardElement);
  similarWizardsList.appendChild(fragment);
};

userDialog.classList.remove('hidden');

var orderVersion = getRandomNumber();

for (var i = 0; i < WIZARDS_QUANTITY; i++) {
  wizards.push({
    name: (orderVersion === 0) ? WIZARD_NAMES[getRandomNumber(WIZARD_NAMES.length - 1)] + ' ' + WIZARD_SURNAMES[getRandomNumber(WIZARD_SURNAMES.length - 1)] : WIZARD_SURNAMES[getRandomNumber(WIZARD_SURNAMES.length - 1)] + ' ' + WIZARD_NAMES[getRandomNumber(WIZARD_NAMES.length - 1)],
    // не совсем поняла, нужно рандомом выбирать только имя (а фамилию брать под тем же индексом) или и имя и фамилию (сделала и имя и фамилию)
    coatColor: WIZARD_COAT_COLORS[getRandomNumber(WIZARD_COAT_COLORS.length - 1)],
    eyesColor: WIZARD_EYES_COLORS[getRandomNumber(WIZARD_EYES_COLORS.length - 1)]
  });

  var renderedWizard = renderWizard(wizards);

  addWizardElement(renderedWizard);
}

document.querySelector('.setup-similar').classList.remove('hidden');
