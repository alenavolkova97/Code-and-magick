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

  var wizardCoatClickHandler = function () {
    // var wizardCoatColor = WIZARD_COAT_COLORS[window.randomize.getRandomNumber(WIZARD_COAT_COLORS.length - 1)];
    wizardCoat.style.fill = wizardCoatColor;
    wizardCoatColorInput.value = wizardCoatColor;
  };

  var wizardEyesClickHandler = function () {
    // var wizardEyesColor = WIZARD_EYES_COLORS[window.randomize.getRandomNumber(WIZARD_EYES_COLORS.length - 1)];
    wizardEyes.style.fill = wizardEyesColor;
    wizardEyesColorInput.value = wizardEyesColor;
  };

  var wizardFireballClickHandler = function () {
    // var fireballColor = WIZARD_FIREBALL_COLORS[window.randomize.getRandomNumber(WIZARD_FIREBALL_COLORS.length - 1)];
    wizardFireball.style.backgroundColor = fireballColor;
    wizardFireballColorInput.value = fireballColor;
  };

  var windowLoadHandler = function () {
    userNameInput.addEventListener('input', userNameInputChangeHandler);
    wizardCoat.addEventListener('click', wizardCoatClickHandler);
    wizardEyes.addEventListener('click', wizardEyesClickHandler);
    wizardFireball.addEventListener('click', wizardFireballClickHandler);
  };

  window.addEventListener('load', windowLoadHandler);
})();
