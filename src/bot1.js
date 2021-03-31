export default class Bot1 {
  constructor(dimensions) {
    const botSprite = new Image();
    botSprite.src = `assets/bot1.png`;
    this.image = botSprite;

    this.type = 'bot';
    this.dimensions = dimensions;

    // position
    this.x, this.y;
    this.playerDistance;
    this.speed = 2;
    this.dx = 0;
    this.dy = 0;
    this.moveBot = this.moveBot.bind(this);

    this.generateStartValues();

    this.width = 109;
    this.height = 174;
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
      this.dx = 10;
      this.frameY = 3;
    } else if (val < 2) {
      this.x = this.dimensions.width + 100;
      this.y = randHeight;
      this.dx = -10;
      this.frameY = 2;
    } else if (val < 3) {
      this.x = randWidth;
      this.y = -100;
      this.dy = 10;
      this.frameY = 0;
    } else {
      this.x = randWidth;
      this.y = this.dimensions.height + 100;
      this.dy = -10;
      this.frameY = 1 ;
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
    this.handleBotFrame();

    this.playerDistance = this.dist(playerX, playerY, this.x, this.y)

    if (Date.now() - this.createdAt > 30000) {
      this.x += this.dx;
      this.y += this.dy;
      return;
    }

    if (speed === "slow") {
      this.speed = 1;
    } else if (speed === "medium") {
      this.speed = 2;
    } else {
      this.speed = 4;
    }

    let movement = this.calcMoveTo(this.speed, this.x, this.y, playerX, playerY);
    this.dx = movement[0];
    this.dy = movement[1];

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

  drawCircle(ctx, x, y, width, height, playerDistance) {
    ctx.globalAlpha = Math.min(1, width/(playerDistance-width/2))
    ctx.beginPath();
    ctx.arc(x + width/6, y + height/6, 50, 0, 2*Math.PI);
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
      this.width/3,
      this.height/3);

    if (this.playerDistance) {
      console.log(this.playerDistance);
    }

    this.drawCircle(ctx, this.x, this.y, this.width, this.height, this.playerDistance)
    ctx.globalAlpha = 1
  }
}