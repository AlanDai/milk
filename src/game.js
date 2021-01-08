import Player from "./player";
import Milk from "./milk";
import Bot from "./bot";
import Level from "./level";

export default class MilkGame {
  constructor(canvas) {
    this.ctx = canvas.getContext('2d');
    this.dimensions = { width: canvas.width, height: canvas.height }
    this.keys = {}

    this.level = new Level(this.dimensions);
    this.level.animate(this.ctx);
    this.playing = false;
  
    this.lastScore = Date.now() + 1000;

    // throttle
    this.then = Date.now();
    this.now;

    // bot generation
    this.lastBot = Date.now() + 1500;
    this.bots = [];
    this.lastBotCollision = Date.now();

    // binding
    this.play = this.play.bind(this);
    this.restart = this.restart.bind(this);
    this.pause = this.pause.bind(this);
    this.resume = this.resume.bind(this);
    this.checkMilkCollisions = this.checkMilkCollisions.bind(this);
    this.checkBotCollisions = this.checkBotCollisions.bind(this);
    this.animate = this.animate.bind(this);

    this.registerEvents();
  }

  // general game controls

  play() {
    this.running = true;
    this.playing = true;
    this.score = 20;

    this.milk = new Milk(this.dimensions);
    this.bots = [];
    this.player = new Player(this.dimensions);
    document.getElementById("start-screen").style.display = "none";
    document.getElementById("music").play();

    this.animate();
  }

  restart() {
    this.ctx.clearRect(0, 0, this.dimensions.width, this.dimensions.height);

    // reset document elements
    document.getElementById("pause").style.display = "none";
    document.getElementById("resume").style.display = "block";
    document.getElementById("game-over-screen").style.display = "none";
    document.getElementById("level-over-screen").style.display = "none";
    let music = document.getElementById("music");
    music.currentTime = 0;

    this.lastBot = Date.now() + 1500;
    this.play();
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
    this.animate();
  }

  gameOver() {
    this.running = false;
    this.playing = false;
    document.getElementById("game-over-screen").style.display = "block";
  }

  levelOver() {
    this.running = false;
    this.playing = false;
    document.getElementById("level-over-screen").style.display = "block";
  }

  // player movement
  registerEvents() {
    window.addEventListener("keydown", this.handleKeyDown.bind(this));
    window.addEventListener("keyup", this.handleKeyUp.bind(this));

    document.getElementById("start").addEventListener("click", this.play);
    document.getElementById("pause").addEventListener("click", this.pause);
    document.getElementById("resume").addEventListener("click", this.resume);
    document.getElementById("reset").addEventListener("click", this.restart)

    // placeholder
    document.getElementById("level-reset").addEventListener("click", this.restart)
  }

  handleKeyDown(e) {
    if(e.key === " ") {
      if (this.playing) {
        this.running === true ? this.pause() : this.resume();
      } else {
        this.restart();
      } 
    } else {
      this.keys[e.key] = true;
    }
  }

  handleKeyUp(e) {
    if(this.keys[e.key]) delete this.keys[e.key];
    if(this.player) this.player.moving = false;
  }

  // score
  drawScore(ctx) {
    ctx.fillStyle = "pink";
    ctx.fillRect(960, 265, 30, 300);
    ctx.fillStyle = "white";
    ctx.fillRect(965, 270, 20, 290);

    let fillAmount = (100 - this.score) * 2.9

    ctx.fillStyle = "lightgray";
    ctx.fillRect(965, 270 + fillAmount, 20, 290 - fillAmount);
  }

  // check collisions
  checkMilkCollisions() {
    let dist = this.dist(this.player.x, this.player.y, this.milk.x, this.milk.y);
    if (dist < this.player.width) {
      return true;
    }
    return false;
  }
    
  checkBotCollisions() {
    for (let i = 0; i < this.bots.length; i++) {
      let dist = this.dist(this.player.x, this.player.y, this.bots[i].x, this.bots[i].y) 
      if (dist < (this.player.width + this.bots[i].width) / 1.5) {
        return dist;
      }
    }
    return 0;
  }

  dist(x1, y1, x2, y2) {
    return Math.sqrt(
      Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2)
    )
  }

  // collision handling
  handleMilkCollision() {
    this.milk = new Milk(this.dimensions)
    this.score += 5;
  }

  handleBotCollision(dist) {
    if (dist < Math.random() * 150) {
      this.gameOver();
    }
  }

  animate() {
    this.now = Date.now();

    // bot generation
    let botElapsed = this.now - this.lastBot;

    if (botElapsed > 1500 && this.running) {
      this.lastBot = this.now - (botElapsed % 1500);

      let numNewBots = Math.floor(Math.random() * 4);
      for (let i = 0; i < numNewBots; i++) {
        let newBot = new Bot(this.dimensions);
        this.bots.push(newBot);
      }
    }

    // score decay
    if (this.now - this.lastScore > 2000) {
      this.lastScore = this.now;
      this.score--;
    }

    // frame throttling
    let elapsed = this.now - this.then;

    if (elapsed > 40 && this.running) {
      this.then = this.now - (elapsed % 40);

      // collisions
      if(this.checkMilkCollisions()) {
        this.handleMilkCollision.call(this);
      }

      let botDist = this.checkBotCollisions();
      if (botDist && this.now - this.lastBotCollision > 200) {
        this.lastBotCollision = this.now;
        this.handleBotCollision.call(this, botDist);
      }

      this.level.animate(this.ctx)
      this.milk.animate(this.ctx);
      
      // remove old bots
      if (this.bots[0] && this.now - this.bots[0].createdAt > 10000) {
        this.bots.shift();
      }
      
      for(var i = 0; i < this.bots.length; i++){
        this.bots[i].moveBot();
        this.bots[i].animate(this.ctx);
      }

      this.player.movePlayer(this.keys);
      this.player.animate(this.ctx);
      
      this.drawScore(this.ctx);
    }

    requestAnimationFrame(this.animate.bind(this));
  }

}
