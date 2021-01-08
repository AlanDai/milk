import Player from "./player";
import Bot from "./bot";
import Level from "./level";

export default class MilkGame {
  constructor(canvas) {
    this.ctx = canvas.getContext('2d');
    this.dimensions = { width: canvas.width, height: canvas.height }
    this.keys = {}

    // throttle
    this.then = Date.now(); 
    this.now;

    // bot generation
    this.lastBot = Date.now();

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
    this.bots = this.generateBots(3);

    this.animate();
  }

  // bot generation
  generateBots(num) {
    const bots = [];
    for (var i = 0; i < num; i++) {
      let bot = new Bot(this.dimensions);
      bots.push(bot);
    }
    return bots;
  }

  // player movement
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

  // collisions


  animate() {
    this.now = Date.now();

    // bot generation
    let botElapsed = this.now - this.lastBot;

    if (botElapsed > 1500) {
      this.lastBot = this.now - (botElapsed % 1500);

      const newBot = new Bot(this.dimensions);
      this.bots.push(newBot);
    }


    // frame throttling
    let elapsed = this.now - this.then;

    if (elapsed > 40) {
      this.then = this.now - (elapsed % 40);

      this.level.animate(this.ctx)
      this.player.movePlayer(this.keys);
      this.player.animate(this.ctx);

      if (this.now - this.bots[0].createdAt > 10000) {
        this.bots.shift();
      }

      for(var i = 0; i < this.bots.length; i++){
        this.bots[i].moveBot();
        this.bots[i].animate(this.ctx);
      }
    }

    requestAnimationFrame(this.animate.bind(this));
  }

}
