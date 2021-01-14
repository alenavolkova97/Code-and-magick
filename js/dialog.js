'use strict';

(function () {
  var userDialog = document.querySelector('.setup');
  var similarWizardsDialog = document.querySelector('.setup-similar');
  var userNameInput = userDialog.querySelector('.setup-user-name');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = document.querySelector('.setup-close');
  var wizardCoat = document.querySelector('.wizard-coat');
  var wizardEyes = document.querySelector('.wizard-eyes');
  var wizardFireball = document.querySelector('.setup-fireball');

  var openUserDialog = function () {
    userDialog.classList.remove('hidden');
    similarWizardsDialog.classList.remove('hidden');

    window.similarWizards.updateWizards();

    setupClose.addEventListener('click', setupCloseClickHandler);
    document.addEventListener('keydown', userDialogEscPressHandler);
    wizardCoat.addEventListener('click', window.setup.wizardCoatClickHandler);
    wizardEyes.addEventListener('click', window.setup.wizardEyesClickHandler);
    wizardFireball.addEventListener('click', window.setup.wizardFireballClickHandler);
    userNameInput.addEventListener('input', window.setup.userNameInputChangeHandler);
  };

  var closeUserDialog = function () {
    userDialog.classList.add('hidden');

    setupClose.removeEventListener('click', setupCloseClickHandler);
    document.removeEventListener('keydown', userDialogEscPressHandler);
    wizardCoat.removeEventListener('click', window.setup.wizardCoatClickHandler);
    wizardEyes.removeEventListener('click', window.setup.wizardEyesClickHandler);
    wizardFireball.removeEventListener('click', window.setup.wizardFireballClickHandler);
    userNameInput.removeEventListener('input', window.setup.userNameInputChangeHandler);
  };

  var setupCloseClickHandler = function () {
    closeUserDialog();

    userDialog.removeAttribute('style');
  };

  var userDialogEscPressHandler = function (evt) {
    if (evt.key === 'Escape' && document.activeElement !== userNameInput) {
      userDialog.classList.add('hidden');

      userDialog.removeAttribute('style');
    }
  };

  var windowLoadHandler = function () {
    setupOpen.addEventListener('click', function () {
      openUserDialog();
    });

    setupOpen.addEventListener('keydown', function (evt) {
      if (evt.key === 'Enter') {
        openUserDialog();
      }
    });
  };

  window.addEventListener('load', windowLoadHandler);
})();
