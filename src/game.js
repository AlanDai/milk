import Player from "./player";
import Milk from "./milk";
import Bot1 from "./bot1";
import Bot2 from "./bot2";
import Bot3 from "./bot3";
import Level from "./level";

export default class MilkGame {
  constructor(canvas) {
    this.ctx = canvas.getContext('2d');
    this.dimensions = { width: canvas.width, height: canvas.height }
    this.keys = {}

    this.startScreen = true;
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
    this.showBots = this.showBots.bind(this);
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

  showBots() {
    this.startScreen = false;
    document.getElementById("start-screen").style.display = "none";
    document.getElementById("bot-screen").style.display = "block";
  }

  play() {
    this.running = true;
    this.playing = true;
    this.score = 20;
    this.gameStart = Date.now();

    this.milk = new Milk(this.dimensions);
    this.bots = [];
    this.player = new Player(this.dimensions);
    document.getElementById("bot-screen").style.display = "none";
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

  gameOver(innerText) {
    this.running = false;
    this.playing = false;
    document.getElementById("game-over-screen").style.display = "block";
    document.getElementById("game-over-message").innerHTML = innerText;
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

    document.getElementById("next").addEventListener("click", this.showBots);
    document.getElementById("start").addEventListener("click", this.play);
    document.getElementById("pause").addEventListener("click", this.pause);
    document.getElementById("resume").addEventListener("click", this.resume);
    document.getElementById("reset").addEventListener("click", this.restart)

    // placeholder
    document.getElementById("level-reset").addEventListener("click", this.restart)
  }

  handleKeyDown(e) {
    if(e.key === " ") {
      if (this.startScreen) {
        this.showBots();
      } else if (this.playing) {
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

    let fillAmount = (100 - Math.min(this.score, 100)) * 2.9
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
      this.gameOver("Should have socially distanced - taste and smell are overrated anyways");
    }
  }

  animate() {
    this.now = Date.now();

    // bot generation
    let botElapsed = this.now - this.lastBot;

    if (botElapsed > 1500 && this.running && this.bots.length < 10) {
      this.lastBot = this.now - (botElapsed % 1500);

      let numNewBots = Math.floor(Math.random() * 3);
      for (let i = 0; i < numNewBots; i++) {
        let newBot;
        let val = (Math.random() * 10)
        if (val > 9 && this.now - this.gameStart > 10000) {
          newBot = new Bot1(this.dimensions);
        } else if (val > 7 && this.now - this.gameStart > 5000) {
          newBot = new Bot2(this.dimensions);
        } else {
          newBot = new Bot3(this.dimensions);
        }
        this.bots.push(newBot);
      }
    }

    // score decay
    if (this.now - this.lastScore > 2000) {
      this.lastScore = this.now;
      this.score -= 2;
    }

    // frame throttling
    let elapsed = this.now - this.then;

    if (elapsed > 40 && this.running) {
      this.then = this.now - (elapsed % 40);

      // score handling
      if (this.score <= 0) {
        this.gameOver("Looks like you succumbed to dehydration - gotta manage that thirst");
      } else if (this.score >= 100) {
         this.levelOver();
      }

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
      
      for(var i = 0; i < this.bots.length; i++){

        // clear out of bounds bots
        if ((this.bots[i].x < 0 || this.bots[i].x > this.dimensions.width) &&
            (this.bots[i].y < 0 || this.bots[i].y > this.dimensions.height)) {
          this.bots.splice(i, 1);
        }

        this.bots[i].moveBot(this.player.x, this.player.y);
        this.bots[i].animate(this.ctx);
      }

      this.player.movePlayer(this.keys);
      this.player.animate(this.ctx);
      
      this.drawScore(this.ctx);
    }

    requestAnimationFrame(this.animate.bind(this));
  }

}
