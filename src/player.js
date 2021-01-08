export default class Player {
  constructor(dimensions) {
    const playerSprite = new Image();
    playerSprite.src = "player.png";
    this.image = playerSprite;

    this.dimensions = dimensions;
    this.x = 100;
    this.y = 100;

    this.width = 64;
    this.height = 64;
    this.frameX = 0;
    this.frameY = 0;
    
    this.moving = false;
    this.speed = 10;

    this.createdAt = Date.now();
  }

  movePlayer(keys) {
    this.handlePlayerFrame();

    // down
    if (keys['ArrowDown'] && this.y < this.dimensions.height - this.height) {
      this.y += this.speed;
      this.frameY = 0;
      this.moving = true;
    }
    // left
    if (keys['ArrowLeft'] && this.x > 0) {
      this.x -= this.speed;
      this.frameY = 1;
      this.moving = true;
    }
    // right
    if (keys['ArrowRight'] && this.x < this.dimensions.width - this.width) {
      this.x += this.speed;
      this.frameY = 2;
      this.moving = true;
    }
    // up
    if (keys['ArrowUp'] && this.y > 0) {
      this.y -= this.speed;
      this.frameY = 3;
      this.moving = true;
    }
  }

  handlePlayerFrame() {
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
    ctx.strokeStyle = "white";
    ctx.stroke();
  }
}