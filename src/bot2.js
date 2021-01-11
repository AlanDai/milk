export default class Bot2 {
  constructor(dimensions) {
    const botSprite = new Image();
    botSprite.src = `assets/bot2.png`;
    this.image = botSprite;

    this.type = 'bot';
    this.dimensions = dimensions;

    // position
    this.x, this.y;
    this.speed = 5;
    this.dx = 0;
    this.dy = 0;
    this.chasing = false;
    this.moveBot = this.moveBot.bind(this);

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
      this.dx = this.speed;
      this.frameY = 2;
    } else if (val < 2) {
      this.x = this.dimensions.width + 100;
      this.y = randHeight;
      this.dx = -this.speed;
      this.frameY = 1;
    } else if (val < 3) {
      this.x = randWidth;
      this.y = -100;
      this.dy = this.speed;
      this.frameY = 0;
    } else {
      this.x = randWidth;
      this.y = this.dimensions.height + 100;
      this.dy = -this.speed;
      this.frameY = 3;
    }
  }

  dist(x1, y1, x2, y2) {
    return Math.sqrt(
      Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2)
    )
  }

  calcMoveTo(speed, sX, sY, dX, dY) {
    let angle = Math.atan2((dY - sY), (dX - sX));
    return [speed * Math.cos(angle), speed * Math.sin(angle)];
  }

  moveBot(playerX, playerY) {
    this.handleBotFrame();
    
    let dist = this.dist(playerX, playerY, this.x, this.y);
    if (!this.chasing && dist < 200) {
      this.chasing = true;
    }

    if (this.chasing && dist > 300) {
      this.chasing = false;
    }
    
    if (this.chasing) {
      let movement = this.calcMoveTo(this.speed, this.x, this.y, playerX, playerY);
      this.dx = movement[0];
      this.dy = movement[1];
    }

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