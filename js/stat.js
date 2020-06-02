'use strict';

var CLOUD_X = 100;
var CLOUD_Y = 10;
var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var ARC1_RADIUS = 52.5;
var ARC2_RADIUS = 40;
var ARC_SHIFT = 63;

var GAP = 10;
var TEXT_INTRO_HEIGHT = 60;
var TEXT_NAME_HEIGHT = 20;
var NUMBER_HEIGHT = 20;
var BAR_WIDTH = 40;
var BAR_HEIGHT = CLOUD_HEIGHT - 2 * GAP - TEXT_INTRO_HEIGHT - 2 * GAP - NUMBER_HEIGHT - GAP - GAP - TEXT_NAME_HEIGHT - 2 * GAP;

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
  ctx.fillRect(CLOUD_X + cloudShift, CLOUD_Y + ARC1_RADIUS - 0.5 + cloudShift, CLOUD_WIDTH, CLOUD_HEIGHT + CLOUD_Y - ARC2_RADIUS - ARC1_RADIUS - CLOUD_Y + 0.5);
  ctx.fillRect(CLOUD_X + ARC2_RADIUS + cloudShift, CLOUD_HEIGHT + CLOUD_Y - ARC2_RADIUS + cloudShift, CLOUD_WIDTH - 2 * ARC2_RADIUS, ARC2_RADIUS);
};

window.renderStatistics = function (ctx) {
  renderCloud(ctx, 'rgba(0, 0, 0, 0.7)', 10);
  renderCloud(ctx, '#ffffff', 0);

  ctx.fillStyle = 'black';
  ctx.fillRect(CLOUD_X + 4 * GAP, CLOUD_Y + CLOUD_HEIGHT - 2 * GAP - TEXT_NAME_HEIGHT - GAP, BAR_WIDTH, BAR_HEIGHT);
  ctx.fillText('Вы', 150, y);
};
