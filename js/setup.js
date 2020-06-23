'use strict';

(function () {
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

  var MIN_NAME_LENGTH = userNameInput.minLength;
  var MAX_NAME_LENGTH = userNameInput.maxLength;

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

  var windowLoadHandler = function () {
    userNameInput.addEventListener('input', userNameInputChangeHandler);
    window.colorize.colorizeElement(wizardCoat, wizardCoatColorInput, WIZARD_COAT_COLORS);
    window.colorize.colorizeElement(wizardEyes, wizardEyesColorInput, WIZARD_EYES_COLORS);
    window.colorize.colorizeElement(wizardFireball, wizardFireballColorInput, WIZARD_FIREBALL_COLORS);
  };

  window.addEventListener('load', windowLoadHandler);
})();
