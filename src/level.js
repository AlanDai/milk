export default class Level {
  constructor(dimensions) {
    this.dimensions = dimensions;
  }

  drawBackground(ctx) {
    const background = new Image();
    background.src = "assets/background.png";
    ctx.drawImage(background, 0, 0, this.dimensions.width, this.dimensions.height);
  }

  animate(ctx) {
    ctx.clearRect(0, 0, this.dimensions.width, this.dimensions.height);
    this.drawBackground(ctx);
  }
}