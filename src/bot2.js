export default class Bot2 {
  constructor(dimensions) {
    const botSprite = new Image();
    botSprite.src = `assets/bot2.png`;
    this.image = botSprite;

    this.type = 'bot';
    this.dimensions = dimensions;

    // position
    this.x, this.y;
    this.playerDistance;
    this.speed = 4;
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

    this.moveBot = this.moveBot.bind(this);
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

  moveBot(playerX, playerY, speed) {
    
    if (speed === "slow") {
      this.speed = 2;
    } else if (speed === "medium") {
      this.speed = 4;
    } else {
      this.speed = 8;
    }

    let directionChange = false;
    let dist = this.dist(playerX, playerY, this.x, this.y);
    this.playerDistance = this.dist(playerX, playerY, this.x, this.y)

    if (!this.chasing && dist < 200) {
      this.chasing = true;
    }
    
    if (this.chasing && dist > 300) {
      this.chasing = false;
    }
    
    if (this.chasing) {
      let movement = this.calcMoveTo(this.speed, this.x, this.y, playerX, playerY);

      if (this.dx * movement[0] < 0 || this.dy * movement[1] < 0) directionChange = true;

      this.dx = movement[0];
      this.dy = movement[1];
    }
    
    this.x += this.dx;
    this.y += this.dy;

    this.handleBotFrame(directionChange);
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

  drawCircle(ctx, x, y, width, height, playerDistance) {
    ctx.globalAlpha = Math.min(1, width/(playerDistance-width*2))
    ctx.beginPath();
    ctx.arc(x + width/2, y + height/2, 50, 0, 2*Math.PI);
    ctx.stroke();
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
 
    this.drawCircle(ctx, this.x, this.y, this.width, this.height, this.playerDistance)
    ctx.globalAlpha = 1
  }
}