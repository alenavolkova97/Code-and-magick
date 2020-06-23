'use strict';

(function () {
  var userDialog = document.querySelector('.setup');
  var userNameInput = userDialog.querySelector('.setup-user-name');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = document.querySelector('.setup-close');

  var openUserDialog = function () {
    userDialog.classList.remove('hidden');

    document.addEventListener('keydown', userDialogEscPressHandler);
  };

  var closeUserDialog = function () {
    userDialog.classList.add('hidden');

    document.removeEventListener('keydown', userDialogEscPressHandler);
  };

  var userDialogEscPressHandler = function (evt) {
    if (evt.key === 'Escape' && document.activeElement !== userNameInput) {
      evt.preventDefault();
      userDialog.classList.add('hidden');
    }
  };

  var windowLoadHandler = function () { // отдельный модуль load?
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
  };

  window.addEventListener('load', windowLoadHandler);
})();
