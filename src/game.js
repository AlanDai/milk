import Player from "./player";
import Level from "./level";

export default class MilkGame {
  constructor(canvas) {
    this.ctx = canvas.getContext('2d');
    this.dimensions = { width: canvas.width, height: canvas.height }
    this.keys = {}

    // throttle
    this.then = Date.now(); 
    this.now;

    this.registerEvents();
    this.restart();
  }

  play() {
    this.running = true;
    this.animate();
  }

  restart() {
    this.running = false;
    this.level = new Level(this.dimensions);
    this.player = new Player(this.dimensions);

    this.animate();
  }

  registerEvents() {
    window.addEventListener("keydown", this.handleKeyDown.bind(this));
    window.addEventListener("keyup", this.handleKeyUp.bind(this));
  }

  handleKeyDown(e) {
    this.keys[e.key] = true;
  }

  handleKeyUp(e) {
    delete this.keys[e.key];
    this.player.moving = false;
  } 
  
  animate() {
    this.now = Date.now();
    let elapsed = this.now - this.then;

    if (elapsed > 40) {
      this.then = this.now - (elapsed % 40);

      this.level.animate(this.ctx)
      this.player.movePlayer(this.keys);
      this.player.animate(this.ctx);
    }

    requestAnimationFrame(this.animate.bind(this));
  }

}
