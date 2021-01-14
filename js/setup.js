'use strict';

window.setup = (function () {
  var WIZARD_COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var WIZARD_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var WIZARD_FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  var userDialog = document.querySelector('.setup');
  var userNameInput = userDialog.querySelector('.setup-user-name');
  var form = document.querySelector('.setup-wizard-form');
  var wizardCoat = document.querySelector('.wizard-coat');
  var wizardEyes = document.querySelector('.wizard-eyes');
  var wizardFireball = document.querySelector('.setup-fireball');
  var wizardCoatColorInput = document.querySelector('input[name="coat-color"]');
  var wizardEyesColorInput = document.querySelector('input[name="eyes-color"]');
  var wizardFireballColorInput = document.querySelector('input[name="fireball-color"]');
  var coatColor = 'rgb(101, 137, 164)';
  var eyesColor = 'black';

  var minNameLength = userNameInput.minLength;
  var maxNameLength = userNameInput.maxLength;

  var userNameInputChangeHandler = function () {
    var valueLength = userNameInput.value.length;

    if (!form.reportValidity() && valueLength < minNameLength) {
      userNameInput.setCustomValidity('Имя должно состоять минимум из 2-х символов. Введите ещё ' + (minNameLength - valueLength) + ' симв.');
    } else if (!form.reportValidity() && valueLength > maxNameLength) {
      userNameInput.setCustomValidity('Имя не должно превышать 25-ти символов. Удалите лишние ' + (valueLength - maxNameLength) + ' симв.');
    } else if (userNameInput.validity.valueMissing) {
      userNameInput.setCustomValidity('Обязательное поле');
    } else {
      userNameInput.setCustomValidity('');
    }
  };

  var wizardCoatClickHandler = function () {
    coatColor = window.colorize.colorizeElement(wizardCoat, wizardCoatColorInput, WIZARD_COAT_COLORS);

    window.similarWizards.updateWizards();
  };

  var wizardEyesClickHandler = function () {
    eyesColor = window.colorize.colorizeElement(wizardEyes, wizardEyesColorInput, WIZARD_EYES_COLORS);

    window.similarWizards.updateWizards();
  };

  var wizardFireballClickHandler = function () {
    window.colorize.colorizeElement(wizardFireball, wizardFireballColorInput, WIZARD_FIREBALL_COLORS);
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

  var getcoatColor = function () {
    return coatColor;
  };

  var geteyesColor = function () {
    return eyesColor;
  };

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();

    window.backend.saveData(function () {
      userDialog.classList.add('hidden');
    }, errorHandler, new FormData(form));
  });

  return {
    userNameInputChangeHandler: userNameInputChangeHandler,
    wizardCoatClickHandler: wizardCoatClickHandler,
    wizardEyesClickHandler: wizardEyesClickHandler,
    wizardFireballClickHandler: wizardFireballClickHandler,
    errorHandler: errorHandler,
    coatColor: getcoatColor,
    eyesColor: geteyesColor
  };
})();
