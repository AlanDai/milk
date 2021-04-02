const Util = require("./util.js")

function Bot (options) {
  this.type = 'bot';
  this.dimensions = options.dimensions;

  this.x, this.y;
  this.playerDistance;
  this.createdAt = Date.now();
}

Bot.prototype.moveBot = function(playerX, playerY, speed) {
  this.playerDistance = Util.dist(playerX, playerY, this.x, this.y);
}

module.exports = Bot;