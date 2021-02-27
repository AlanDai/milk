export default class Bot3 {
  constructor(dimensions) {
    const botSprite = new Image();
    botSprite.src = `assets/bot3.png`;
    this.image = botSprite;

    this.type = 'bot';
    this.dimensions = dimensions;

    // position
    this.x, this.y;
    // axially separated speed
    this.dx = 0;
    this.dy = 0;

    this.generateStartValues();

    this.width = 130;
    this.height = 127;
    this.frameX = 0;
    this.frameY;
    
    this.moving = true;
    this.createdAt = Date.now();
  }

  generateStartValues() {
    const val = Math.random() * 4,
          randWidth = Math.random() * this.dimensions.width,
          randHeight = Math.random() * this.dimensions.height;

    if (val < 1) {
      this.x = -100;
      this.y = randHeight;
      this.dx = 10;
      this.frameY = 2;
    } else if (val < 2) {
      this.x = this.dimensions.width + 100;
      this.y = randHeight;
      this.dx = -10;
      this.frameY = 1;
    } else if (val < 3) {
      this.x = randWidth;
      this.y = -100;
      this.dy = 10;
      this.frameY = 0;
    } else {
      this.x = randWidth;
      this.y = this.dimensions.height + 100;
      this.dy = -10;
      this.frameY = 3;
    }
  }

  moveBot(playerX, playerY, speed) {
    this.handleBotFrame();

    if (speed === "slow") {
      if (this.dx < 0)  this.dx = -5;
      if (this.dx > 0) this.dx = 5;
      if (this.dy < 0)  this.dy = -5;
      if (this.dy > 0) this.dy = 5;
    } else if (speed === "medium") {
      if (this.dx < 0)  this.dx = -10;
      if (this.dx > 0) this.dx = 10;
      if (this.dy < 0)  this.dy = -10;
      if (this.dy > 0) this.dy = 10;
    } else {
      if (this.dx < 0)  this.dx = -20;
      if (this.dx > 0) this.dx = 20;
      if (this.dy < 0)  this.dy = -20;
      if (this.dy > 0) this.dy = 20;
    }

    this.x += this.dx;
    this.y += this.dy;
  }

  handleBotFrame(directionChange) {
    if (directionChange) {
      this.frameX = 0;
      if (this.dx < 0 && this.dy < 0) {
        Math.abs(this.dx) > Math.abs(this.dy) ? this.frameY = 1 : this.frameY = 3;
      } else if (this.dx < 0 && this.dy > 0) {
        Math.abs(this.dx) > Math.abs(this.dy) ? this.frameY = 1 : this.frameY = 0;
      } else if (this.dx > 0 && this.dy < 0) {
        Math.abs(this.dx) > Math.abs(this.dy) ? this.frameY = 2 : this.frameY = 3;
      } else {
        Math.abs(this.dx) > Math.abs(this.dy) ? this.frameY = 2 : this.frameY = 0;
      }
    } else {
      this.frameX < 3 && this.moving ? this.frameX++ : this.frameX = 0;
    }
  }

  animate(ctx) {
    ctx.drawImage(this.image,
      this.width * this.frameX,
      this.height * this.frameY,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width/3,
      this.height/3);

    ctx.beginPath();
    ctx.arc(this.x + this.width/6, this.y + this.height/6, 50, 0, 2*Math.PI);
    ctx.stroke();
  }
}