'use strict';

(function () {
  var userDialog = document.querySelector('.setup');
  var dialogHandle = userDialog.querySelector('.upload');
  var field = document.querySelector('body');

  var FieldSizes = {
    width: field.getBoundingClientRect().width,
    height: field.getBoundingClientRect().height
  };

  dialogHandle.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    var mouseMoveHandler = function (moveEvt) {
      moveEvt.preventDefault();

      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      if (FieldSizes.width >= moveEvt.clientX && FieldSizes.height >= moveEvt.clientY) { // ?
        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        userDialog.style.top = (userDialog.offsetTop - shift.y) + 'px';
        userDialog.style.left = (userDialog.offsetLeft - shift.x) + 'px';
      }
    };

    var mouseUpHandler = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);

      if (dragged) {
        var clickPreventDefaultHandler = function (clickEvt) {
          clickEvt.preventDefault();
          dialogHandle.removeEventListener('click', clickPreventDefaultHandler);
        };

        dialogHandle.addEventListener('click', clickPreventDefaultHandler);
      }
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  });
})();
