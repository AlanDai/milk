export default class Bot {
  constructor(dimensions) {
    const botSprite = new Image();
    botSprite.src = "bot.png";
    this.image = botSprite;

    this.dimensions = dimensions;

    // position
    this.x, this.y;
    // axially separated speed
    this.dx = 0;
    this.dy = 0;

    this.generateStartValues();

    this.width = 213;
    this.height = 258;
    this.frameX = 0;
    this.frameY = 0;
    
    this.moving = true;
  }

  generateStartLocation() {
    const val = Math.random() * 4,
          randWidth = Math.random() * this.dimensions.width,
          randHeight = Math.random() * this.dimensions.height;

    if (val < 1) {
      this.x = -100;
      this.y = randHeight;
      this.dx = 10;
    } else if (val < 2) {
      this.x = this.dimensions.width + 100;
      this.y = randHeight;
      this.dx = -10;
    } else if (val < 3) {
      this.x = randWidth;
      this.y = -100;
      this.dy = 10;
    } else {
      this.x = randWidth;
      this.y = this.dimensions.height + 100;
      this.dy = -10;
    }
  }

  moveBot() {
    this.handleBotFrame();

    this.x += this.dx;
    this.y += this.dy;
  }

  handleBotFrame() {
    if (this.frameX < 3 && this.moving) {
      this.frameX++;
    } else {
      this.frameX = 0;
    }
  }

  animate(ctx) {
    ctx.scale(0.3, 3);
    ctx.drawImage(this.image,
      this.width * this.frameX,
      this.height * this.frameY,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height);

    ctx.beginPath();
    ctx.arc(this.x + this.width/2, this.y + this.height/2, 50, 0, 2*Math.PI);
    ctx.stroke();
  }
}