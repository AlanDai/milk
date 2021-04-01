function Bot (options) {
  this.type = 'bot';
  this.dimensions = options.dimensions;

  this.x, this.y;
  this.playerDistance;
  this.createdAt = Date.now();
}

module.exports = Bot;