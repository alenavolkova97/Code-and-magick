'use strict';

window.loadPhoto = (function () {
  var FILE_TYPES = ['jpg', 'jpeg', 'png', 'gif'];
  var AVATAR_SRC_DEFAULT = '/img/user-1.jpg';

  var avatarChooser = document.querySelector('.setup-user-pic-chooser');
  var avatarPreview = document.querySelector('.setup-user-pic');

  var isFileTypeMatches = function (file) {
    var fileName = file.name.toLowerCase();

    var isMatching = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    return isMatching;
  };

  var deleteAvatar = function () {
    avatarPreview.src = AVATAR_SRC_DEFAULT;
  };

  avatarChooser.addEventListener('change', function () {
    var avatar = avatarChooser.files[0];

    if (isFileTypeMatches(avatar)) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        avatarPreview.src = reader.result;
      });

      reader.readAsDataURL(avatar);
    }
  });

  return {
    deleteAvatar: deleteAvatar,
    avatarPreview: avatarPreview
  };
})();
