export default class Bot2 {
  constructor(dimensions) {
    const botSprite = new Image();
    botSprite.src = `assets/bot2.png`;
    this.image = botSprite;

    this.type = 'bot';
    this.dimensions = dimensions;

    // position
    this.x, this.y;
    // axially separated speed
    this.dx = 0;
    this.dy = 0;

    this.generateStartValues();

    this.width = 36;
    this.height = 47;
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