'use strict';

(function () {
  var CLOUD_X = 100;
  var CLOUD_Y = 10;
  var CLOUD_WIDTH = 420;
  var CLOUD_HEIGHT = 270;
  var ARC1_RADIUS = 52.5;
  var ARC2_RADIUS = 40;
  var ARC_SHIFT = 63;

  var GAP = 10;
  var COLUMN_GAP = 5 * GAP;
  var TEXT_NAME_HEIGHT = 10;
  var FONT_GAP = 2 * GAP;
  var BAR_WIDTH = 40;
  var BAR_HEIGHT = 150;

  var renderCloud = function (ctx, color, cloudShift) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(CLOUD_X + cloudShift, CLOUD_Y + ARC1_RADIUS + cloudShift);
    for (var i = 0; i < 6; i++) {
      ctx.arc(CLOUD_X + ARC1_RADIUS + i * ARC_SHIFT + cloudShift, CLOUD_Y + ARC1_RADIUS + cloudShift, ARC1_RADIUS, 0, Math.PI, true);
    }
    ctx.moveTo(CLOUD_X + CLOUD_WIDTH - ARC2_RADIUS + cloudShift, CLOUD_HEIGHT + CLOUD_Y - ARC2_RADIUS + cloudShift);
    ctx.arc(CLOUD_X + CLOUD_WIDTH - ARC2_RADIUS + cloudShift, CLOUD_HEIGHT + CLOUD_Y - ARC2_RADIUS + cloudShift, ARC2_RADIUS, 0, Math.PI / 2, false);
    ctx.moveTo(CLOUD_X + ARC2_RADIUS + cloudShift, CLOUD_HEIGHT + CLOUD_Y - ARC2_RADIUS + cloudShift);
    ctx.arc(CLOUD_X + ARC2_RADIUS + cloudShift, CLOUD_HEIGHT + CLOUD_Y - ARC2_RADIUS + cloudShift, ARC2_RADIUS, Math.PI / 2, Math.PI, false);
    ctx.closePath();
    ctx.fill();
    ctx.fillRect(CLOUD_X + cloudShift, CLOUD_Y + ARC1_RADIUS - 0.5 + cloudShift, CLOUD_WIDTH, CLOUD_HEIGHT - ARC2_RADIUS - ARC1_RADIUS + 0.5);
    ctx.fillRect(CLOUD_X + ARC2_RADIUS + cloudShift, CLOUD_HEIGHT + CLOUD_Y - ARC2_RADIUS + cloudShift, CLOUD_WIDTH - 2 * ARC2_RADIUS, ARC2_RADIUS);
  };

  var getMaxElement = function (array) {
    var maxElement = array[0];

    for (var i = 1; i < array.length; i++) {
      if (array[i] > maxElement) {
        maxElement = array[i];
      }
    }
    return maxElement;
  };

  var showIntro = function (ctx, intro) {
    for (var i = 0; i < intro.length; i++) {
      ctx.fillText(intro[i], CLOUD_X + 2 * GAP, CLOUD_Y + 3 * GAP + i * (FONT_GAP));
    }
  };

  var showStatBars = function (ctx, players, times) {
    var maxTime = getMaxElement(times);

    for (var i = 0; i < players.length; i++) {
      var coordX = CLOUD_X + 4 * GAP + i * (BAR_WIDTH + COLUMN_GAP);
      var namesCoordY = CLOUD_Y + CLOUD_HEIGHT - 1.5 * GAP;
      ctx.fillText(Math.round(times[i]), coordX, namesCoordY - TEXT_NAME_HEIGHT - GAP - ((BAR_HEIGHT * times[i]) / maxTime) - GAP);
      ctx.fillStyle = (players[i] === 'Вы') ? 'rgba(255, 0, 0, 1)' : 'hsl(240,' + window.randomize.getRandomNumber(100) + '%, 50%)';
      ctx.fillRect(coordX, namesCoordY - TEXT_NAME_HEIGHT - GAP, BAR_WIDTH, -((BAR_HEIGHT * times[i]) / maxTime));
      ctx.fillStyle = 'black';
      ctx.fillText(players[i], coordX, namesCoordY);
    }
  };

  window.renderStatistics = function (ctx, players, times) {
    renderCloud(ctx, 'rgba(0, 0, 0, 0.7)', 10);
    renderCloud(ctx, '#ffffff', 0);

    ctx.font = '16px PT Mono';
    ctx.fillStyle = 'black';

    var intro = ['Ура, Вы победили!', 'Список результатов:'];

    showIntro(ctx, intro);

    showStatBars(ctx, players, times);
  };
})();

