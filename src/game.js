import Player from "./player";
import Milk from "./milk";
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
    this.bots = [];

    // binding
    this.play = this.play.bind(this);
    this.restart = this.restart.bind(this);
    this.pause = this.pause.bind(this);
    this.checkMilkCollisions = this.checkMilkCollisions.bind(this);
    this.checkBotCollisions = this.checkBotCollisions.bind(this);
    this.animate = this.animate.bind(this);

    this.registerEvents();
  }

  // general game controls

  play() {
    this.running = true;

    this.level = new Level(this.dimensions);
    this.milk = new Milk(this.dimensions);
    this.generateBots(3);
    this.player = new Player(this.dimensions);
    
    // music
    document.getElementById("music").play();

    this.animate();
  }

  restart() {
    this.running = false;

    this.ctx.clearRect(0, 0, this.dimensions.width, this.dimensions.height);
    this.level = new Level(this.dimensions);
    this.player = new Player(this.dimensions);

    this.level.animate(this.ctx);
    this.player.animate(this.ctx);

    document.getElementById("music").currentTime = 0;
  }

  pause() {
    this.running = false;
    document.getElementById("pause").style.display = "none";
    document.getElementById("resume").style.display = "block";

    document.getElementById("music").pause();
  }

  resume() {
    this.running = true;
    document.getElementById("pause").style.display = "block";
    document.getElementById("resume").style.display = "none";

    document.getElementById("music").play();
  }

  // bot generation
  generateBots(num) {
    console.log(this);
    for (var i = 0; i < num; i++) {
      let bot = new Bot(this.dimensions);
      this.bots.push(bot);
    }
  }

  // player movement
  registerEvents() {
    window.addEventListener("keydown", this.handleKeyDown.bind(this));
    window.addEventListener("keyup", this.handleKeyUp.bind(this));

    document.getElementById("start").addEventListener("click", this.play);
    document.getElementById("pause").addEventListener("click", this.pause);
    document.getElementById("resume").addEventListener("click", this.resume);
    document.getElementById("reset").addEventListener("click", this.restart);
  }

  handleKeyDown(e) {
    this.keys[e.key] = true;
  }

  handleKeyUp(e) {
    delete this.keys[e.key];
    if(this.player) this.player.moving = false;
  }

  // check collisions
  checkMilkCollisions() {
    let dist = this.dist(this.player.x, this.player.y, this.milk.x, this.milk.y);
    if (dist < this.player.width / 2) {
      return true;
    }
    return false;
  }
    
  checkBotCollisions() {
    for (let i = 0; i < this.bots.length; i++) {
      let dist = this.dist(this.player.x, this.player.y, this.bots[i].x, this.bots[i].y) 
      if (dist < (this.player.width + this.bots[i].width) / 1.5) {
        return this.bots[i];
      }
    }
    return null;
  }

  dist(x1, y1, x2, y2) {
    return Math.sqrt(
      Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2)
    )
  }

  animate() {
    this.now = Date.now();

    // bot generation
    let botElapsed = this.now - this.lastBot;

    if (botElapsed > 1500 && this.running) {
      this.lastBot = this.now - (botElapsed % 1500);

      const newBot = new Bot(this.dimensions);
      this.bots.push(newBot);
    }

    // frame throttling
    let elapsed = this.now - this.then;

    if (elapsed > 40 && this.running) {
      this.then = this.now - (elapsed % 40);

      // collisions
      if(this.checkMilkCollisions()) {
        this.milk = new Milk(this.dimensions);
      }

      let collideBot = this.checkBotCollisions();
      if (collideBot) {
        console.log("YOU GOT COVID");
      }

      this.level.animate(this.ctx)
      this.milk.animate(this.ctx);
      
      // remove old bots
      if (this.now - this.bots[0].createdAt > 10000) {
        this.bots.shift();
      }
      
      for(var i = 0; i < this.bots.length; i++){
        this.bots[i].moveBot();
        this.bots[i].animate(this.ctx);
      }

      this.player.movePlayer(this.keys);
      this.player.animate(this.ctx);
    }

    requestAnimationFrame(this.animate.bind(this));
  }

}
