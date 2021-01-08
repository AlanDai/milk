export default class Milk {
  constructor(dimensions) {
    this.dimensions = dimensions;
    this.type = 'milk';

    this.x = Math.random() * (dimensions.width - 150) + 50;
    this.y = Math.random() * (dimensions.height - 100) + 50;
  }

  drawMilk(ctx) {
    const milk = new Image();
    milk.src = "milk.png";
    ctx.drawImage(milk, this.x, this.y, 30, 40);
  }

  animate(ctx) {
    this.drawMilk(ctx);
  }

}