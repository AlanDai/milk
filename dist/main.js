/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is not neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/bot1.js":
/*!*********************!*\
  !*** ./src/bot1.js ***!
  \*********************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => /* binding */ Bot1\n/* harmony export */ });\nclass Bot1 {\n  constructor(dimensions) {\n    const botSprite = new Image();\n    botSprite.src = `assets/bot1.png`;\n    this.image = botSprite;\n\n    this.type = 'bot';\n    this.dimensions = dimensions;\n\n    // position\n    this.x, this.y;\n    this.speed = 2;\n    this.dx = 0;\n    this.dy = 0;\n    this.moveBot = this.moveBot.bind(this);\n\n    this.generateStartValues();\n\n    this.width = 109;\n    this.height = 174;\n    this.frameX = 0;\n    this.frameY;\n    \n    this.moving = true;\n    this.createdAt = Date.now();\n\n    this.moveBot = this.moveBot.bind(this);\n  }\n\n  generateStartValues() {\n    const val = Math.random() * 4,\n          randWidth = Math.random() * this.dimensions.width,\n          randHeight = Math.random() * this.dimensions.height;\n\n    if (val < 1) {\n      this.x = -100;\n      this.y = randHeight;\n      this.dx = 10;\n      this.frameY = 3;\n    } else if (val < 2) {\n      this.x = this.dimensions.width + 100;\n      this.y = randHeight;\n      this.dx = -10;\n      this.frameY = 2;\n    } else if (val < 3) {\n      this.x = randWidth;\n      this.y = -100;\n      this.dy = 10;\n      this.frameY = 0;\n    } else {\n      this.x = randWidth;\n      this.y = this.dimensions.height + 100;\n      this.dy = -10;\n      this.frameY = 1 ;\n    }\n  }\n\n  dist(x1, y1, x2, y2) {\n    return Math.sqrt(\n      Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2)\n    )\n  }\n  \n  calcMoveTo(speed, sX, sY, dX, dY) {\n    let angle = Math.atan2((dY - sY), (dX - sX));\n    return [speed * Math.cos(angle), speed * Math.sin(angle)];\n  }\n\n  moveBot(playerX, playerY, speed) {\n    this.handleBotFrame();\n\n    if (speed === \"slow\") {\n      this.speed = 1;\n    } else if (speed === \"medium\") {\n      this.speed = 2;\n    } else {\n      this.speed = 4;\n    }\n\n    let movement = this.calcMoveTo(this.speed, this.x, this.y, playerX, playerY);\n    this.dx = movement[0];\n    this.dy = movement[1];\n\n    this.x += this.dx;\n    this.y += this.dy;\n  }\n\n  handleBotFrame() {\n    if (this.frameX < 3 && this.moving) {\n      this.frameX++;\n    } else {\n      this.frameX = 0;\n    }\n  }\n\n  animate(ctx) {\n    ctx.drawImage(this.image,\n      this.width * this.frameX,\n      this.height * this.frameY,\n      this.width,\n      this.height,\n      this.x,\n      this.y,\n      this.width/3,\n      this.height/3);\n\n    ctx.beginPath();\n    ctx.arc(this.x + this.width/6, this.y + this.height/6, 50, 0, 2*Math.PI);\n    ctx.stroke();\n  }\n}\n\n//# sourceURL=webpack:///./src/bot1.js?");

/***/ }),

/***/ "./src/bot2.js":
/*!*********************!*\
  !*** ./src/bot2.js ***!
  \*********************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => /* binding */ Bot2\n/* harmony export */ });\nclass Bot2 {\n  constructor(dimensions) {\n    const botSprite = new Image();\n    botSprite.src = `assets/bot2.png`;\n    this.image = botSprite;\n\n    this.type = 'bot';\n    this.dimensions = dimensions;\n\n    // position\n    this.x, this.y;\n    this.speed = 4;\n    this.dx = 0;\n    this.dy = 0;\n    this.chasing = false;\n    this.moveBot = this.moveBot.bind(this);\n\n    this.generateStartValues();\n\n    this.width = 36;\n    this.height = 47;\n    this.frameX = 0;\n    this.frameY;\n    \n    this.moving = true;\n    this.createdAt = Date.now();\n\n    this.moveBot = this.moveBot.bind(this);\n  }\n\n  generateStartValues() {\n    const val = Math.random() * 4,\n          randWidth = Math.random() * this.dimensions.width,\n          randHeight = Math.random() * this.dimensions.height;\n\n    if (val < 1) {\n      this.x = -100;\n      this.y = randHeight;\n      this.dx = this.speed;\n      this.frameY = 2;\n    } else if (val < 2) {\n      this.x = this.dimensions.width + 100;\n      this.y = randHeight;\n      this.dx = -this.speed;\n      this.frameY = 1;\n    } else if (val < 3) {\n      this.x = randWidth;\n      this.y = -100;\n      this.dy = this.speed;\n      this.frameY = 0;\n    } else {\n      this.x = randWidth;\n      this.y = this.dimensions.height + 100;\n      this.dy = -this.speed;\n      this.frameY = 3;\n    }\n  }\n\n  dist(x1, y1, x2, y2) {\n    return Math.sqrt(\n      Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2)\n    )\n  }\n\n  calcMoveTo(speed, sX, sY, dX, dY) {\n    let angle = Math.atan2((dY - sY), (dX - sX));\n    return [speed * Math.cos(angle), speed * Math.sin(angle)];\n  }\n\n  moveBot(playerX, playerY, speed) {\n    \n    if (speed === \"slow\") {\n      this.speed = 2;\n    } else if (speed === \"medium\") {\n      this.speed = 4;\n    } else {\n      this.speed = 8;\n    }\n\n    let directionChange = false;\n    let dist = this.dist(playerX, playerY, this.x, this.y);\n    if (!this.chasing && dist < 200) {\n      this.chasing = true;\n    }\n    \n    if (this.chasing && dist > 300) {\n      this.chasing = false;\n    }\n    \n    if (this.chasing) {\n      let movement = this.calcMoveTo(this.speed, this.x, this.y, playerX, playerY);\n\n      if (this.dx * movement[0] < 0 || this.dy * movement[1] < 0) directionChange = true;\n\n      this.dx = movement[0];\n      this.dy = movement[1];\n    }\n    \n    this.x += this.dx;\n    this.y += this.dy;\n\n    this.handleBotFrame(directionChange);\n  }\n\n  handleBotFrame(directionChange) {\n    if (directionChange) {\n      this.frameX = 0;\n      if (this.dx < 0 && this.dy < 0) {\n        Math.abs(this.dx) > Math.abs(this.dy) ? this.frameY = 1 : this.frameY = 3;\n      } else if (this.dx < 0 && this.dy > 0) {\n        Math.abs(this.dx) > Math.abs(this.dy) ? this.frameY = 1 : this.frameY = 0;\n      } else if (this.dx > 0 && this.dy < 0) {\n        Math.abs(this.dx) > Math.abs(this.dy) ? this.frameY = 2 : this.frameY = 3;\n      } else {\n        Math.abs(this.dx) > Math.abs(this.dy) ? this.frameY = 2 : this.frameY = 0;\n      }\n    } else {\n      this.frameX < 3 && this.moving ? this.frameX++ : this.frameX = 0;\n    }\n  }\n\n  animate(ctx) {\n    ctx.drawImage(this.image,\n      this.width * this.frameX,\n      this.height * this.frameY,\n      this.width,\n      this.height,\n      this.x,\n      this.y,\n      this.width,\n      this.height);\n \n    ctx.beginPath();\n    ctx.arc(this.x + this.width/2, this.y + this.height/2, 50, 0, 2*Math.PI);\n    ctx.stroke();\n  }\n}\n\n//# sourceURL=webpack:///./src/bot2.js?");

/***/ }),

/***/ "./src/bot3.js":
/*!*********************!*\
  !*** ./src/bot3.js ***!
  \*********************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => /* binding */ Bot3\n/* harmony export */ });\nclass Bot3 {\n  constructor(dimensions) {\n    const botSprite = new Image();\n    botSprite.src = `assets/bot3.png`;\n    this.image = botSprite;\n\n    this.type = 'bot';\n    this.dimensions = dimensions;\n\n    // position\n    this.x, this.y;\n    // axially separated speed\n    this.dx = 0;\n    this.dy = 0;\n\n    this.generateStartValues();\n\n    this.width = 130;\n    this.height = 127;\n    this.frameX = 0;\n    this.frameY;\n    \n    this.moving = true;\n    this.createdAt = Date.now();\n  }\n\n  generateStartValues() {\n    const val = Math.random() * 4,\n          randWidth = Math.random() * this.dimensions.width,\n          randHeight = Math.random() * this.dimensions.height;\n\n    if (val < 1) {\n      this.x = -100;\n      this.y = randHeight;\n      this.dx = 10;\n      this.frameY = 2;\n    } else if (val < 2) {\n      this.x = this.dimensions.width + 100;\n      this.y = randHeight;\n      this.dx = -10;\n      this.frameY = 1;\n    } else if (val < 3) {\n      this.x = randWidth;\n      this.y = -100;\n      this.dy = 10;\n      this.frameY = 0;\n    } else {\n      this.x = randWidth;\n      this.y = this.dimensions.height + 100;\n      this.dy = -10;\n      this.frameY = 3;\n    }\n  }\n\n  moveBot(playerX, playerY, speed) {\n    this.handleBotFrame();\n\n    if (speed === \"slow\") {\n      if (this.dx < 0)  this.dx = -5;\n      if (this.dx > 0) this.dx = 5;\n      if (this.dy < 0)  this.dy = -5;\n      if (this.dy > 0) this.dy = 5;\n    } else if (speed === \"medium\") {\n      if (this.dx < 0)  this.dx = -10;\n      if (this.dx > 0) this.dx = 10;\n      if (this.dy < 0)  this.dy = -10;\n      if (this.dy > 0) this.dy = 10;\n    } else {\n      if (this.dx < 0)  this.dx = -20;\n      if (this.dx > 0) this.dx = 20;\n      if (this.dy < 0)  this.dy = -20;\n      if (this.dy > 0) this.dy = 20;\n    }\n\n    this.x += this.dx;\n    this.y += this.dy;\n  }\n\n  handleBotFrame(directionChange) {\n    if (directionChange) {\n      this.frameX = 0;\n      if (this.dx < 0 && this.dy < 0) {\n        Math.abs(this.dx) > Math.abs(this.dy) ? this.frameY = 1 : this.frameY = 3;\n      } else if (this.dx < 0 && this.dy > 0) {\n        Math.abs(this.dx) > Math.abs(this.dy) ? this.frameY = 1 : this.frameY = 0;\n      } else if (this.dx > 0 && this.dy < 0) {\n        Math.abs(this.dx) > Math.abs(this.dy) ? this.frameY = 2 : this.frameY = 3;\n      } else {\n        Math.abs(this.dx) > Math.abs(this.dy) ? this.frameY = 2 : this.frameY = 0;\n      }\n    } else {\n      this.frameX < 3 && this.moving ? this.frameX++ : this.frameX = 0;\n    }\n  }\n\n  animate(ctx) {\n    ctx.drawImage(this.image,\n      this.width * this.frameX,\n      this.height * this.frameY,\n      this.width,\n      this.height,\n      this.x,\n      this.y,\n      this.width/3,\n      this.height/3);\n\n    ctx.beginPath();\n    ctx.arc(this.x + this.width/6, this.y + this.height/6, 50, 0, 2*Math.PI);\n    ctx.stroke();\n  }\n}\n\n//# sourceURL=webpack:///./src/bot3.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => /* binding */ MilkGame\n/* harmony export */ });\n/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player */ \"./src/player.js\");\n/* harmony import */ var _milk__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./milk */ \"./src/milk.js\");\n/* harmony import */ var _bot1__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./bot1 */ \"./src/bot1.js\");\n/* harmony import */ var _bot2__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./bot2 */ \"./src/bot2.js\");\n/* harmony import */ var _bot3__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./bot3 */ \"./src/bot3.js\");\n/* harmony import */ var _level__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./level */ \"./src/level.js\");\n\n\n\n\n\n\n\nclass MilkGame {\n  constructor(canvas) {\n    this.ctx = canvas.getContext('2d');\n    this.dimensions = { width: canvas.width, height: canvas.height }\n    this.keys = {}\n\n    this.startScreen = true;\n    this.level = new _level__WEBPACK_IMPORTED_MODULE_5__.default(this.dimensions);\n    this.level.animate(this.ctx);\n    this.playing = false;\n    this.lastScore = Date.now() + 1000;\n    this.pauseTime;\n\n    // options screen\n    this.optionsScreen = false;\n    this.playerSpeed = \"medium\";\n    this.botSpeed = \"medium\";\n    this.scoreSpeed = \"medium\";\n    this.selectedBots = [true, true, true]\n\n    // throttle\n    this.then = Date.now();\n    this.now;\n\n    // bot generation\n    this.lastBot = Date.now() + 1500;\n    this.bots = [];\n    this.lastBotCollision = Date.now();\n\n    // binding\n    this.showBots = this.showBots.bind(this);\n    this.play = this.play.bind(this);\n    this.restart = this.restart.bind(this);\n    this.pause = this.pause.bind(this);\n    this.resume = this.resume.bind(this);\n    this.options = this.options.bind(this);\n    this.checkMilkCollisions = this.checkMilkCollisions.bind(this);\n    this.checkBotCollisions = this.checkBotCollisions.bind(this);\n    this.animate = this.animate.bind(this);\n\n    this.registerEvents();\n  }\n\n  // general game controls\n\n  showBots() {\n    this.startScreen = false;\n    document.getElementById(\"start-screen\").style.display = \"none\";\n    document.getElementById(\"bot-screen\").style.display = \"block\";\n  }\n\n  play() {\n    this.running = true;\n    this.playing = true;\n    this.score = 20;\n    this.displayScore = 20;\n    this.gameStart = Date.now();\n\n    this.milk = new _milk__WEBPACK_IMPORTED_MODULE_1__.default(this.dimensions);\n    this.bots = [];\n    this.player = new _player__WEBPACK_IMPORTED_MODULE_0__.default(this.dimensions);\n    document.getElementById(\"bot-screen\").style.display = \"none\";\n    document.getElementById(\"music\").play();\n\n    this.animate();\n  }\n\n  restart() {\n    this.ctx.clearRect(0, 0, this.dimensions.width, this.dimensions.height);\n\n    // reset document elements\n    document.getElementById(\"pause\").style.display = \"block\";\n    document.getElementById(\"resume\").style.display = \"none\";\n    document.getElementById(\"game-over-screen\").style.display = \"none\";\n    document.getElementById(\"level-over-screen\").style.display = \"none\";\n    let music = document.getElementById(\"music\");\n    music.currentTime = 0;\n\n    this.lastBot = Date.now() + 1500;\n    this.play();\n  }\n\n  pause() {\n    this.running = false;\n    this.pauseTime = Date.now();\n    document.getElementById(\"pause\").style.display = \"none\";\n    document.getElementById(\"resume\").style.display = \"block\";\n    document.getElementById(\"music\").pause();\n  }\n\n  resume() {\n    if (document.getElementById(\"options-screen\").style.display === \"block\") return;\n\n    this.running = true;\n    this.lastScore += (Date.now() - this.pauseTime);\n    document.getElementById(\"pause\").style.display = \"block\";\n    document.getElementById(\"resume\").style.display = \"none\";\n    document.getElementById(\"music\").play();\n    this.animate();\n  }\n\n  gameOver(innerText) {\n    this.running = false;\n    this.playing = false;\n    document.getElementById(\"game-over-screen\").style.display = \"block\";\n    document.getElementById(\"game-over-message\").innerHTML = innerText;\n  }\n\n  levelOver() {\n    this.running = false;\n    this.playing = false;\n    document.getElementById(\"level-over-screen\").style.display = \"block\";\n  }\n\n  options(e) {\n    e.preventDefault();\n    if (!this.optionsScreen) {\n      document.getElementById(\"options-screen\").style.display = \"block\";\n      if (this.playing) this.pause();\n    } else {\n      document.getElementById(\"options-screen\").style.display = \"none\";\n      if (this.playing) this.resume();\n    }\n    this.optionsScreen = !this.optionsScreen;\n  }\n\n  // player movement\n  registerEvents() {\n    window.addEventListener(\"keydown\", this.handleKeyDown.bind(this));\n    window.addEventListener(\"keyup\", this.handleKeyUp.bind(this));\n\n    document.getElementById(\"next\").addEventListener(\"click\", this.showBots);\n    document.getElementById(\"start\").addEventListener(\"click\", this.play);\n    document.getElementById(\"pause\").addEventListener(\"click\", this.pause);\n    document.getElementById(\"resume\").addEventListener(\"click\", this.resume);\n    document.getElementById(\"reset\").addEventListener(\"click\", this.restart);\n    document.getElementById(\"options\").addEventListener(\"click\", this.options);\n    document.getElementById(\"options\").addEventListener(\"keydown\", function(e) { e.preventDefault(); });\n\n    // disable keyboard controls for input items\n    const list = document.getElementsByTagName(\"INPUT\")\n    for (let i = 0; i < list.length; i++) {\n      list[i].addEventListener(\"keydown\", function(event) { event.preventDefault() })\n    }\n\n    // options radio inputs\n    const playerSpeed = document.getElementsByName(\"player-speed\");\n    for (let i = 0; i < playerSpeed.length; i++) {\n      playerSpeed[i].addEventListener(\"change\", function(e) {\n        this.playerSpeed = e.target.value;\n      }.bind(this))\n    }\n    const botSpeed = document.getElementsByName(\"bot-speed\");\n    for (let i = 0; i < botSpeed.length; i++) {\n      botSpeed[i].addEventListener(\"change\", function(e) {\n        this.botSpeed = e.target.value;\n      }.bind(this))\n    }\n    const scoreSpeed = document.getElementsByName(\"score-speed\");\n    for (let i = 0; i < scoreSpeed.length; i++) {\n      if (scoreSpeed[i].checked) this.scoreSpeed = scoreSpeed[i].value;\n      scoreSpeed[i].addEventListener(\"change\", function(e) {\n        this.scoreSpeed = e.target.value;\n      }.bind(this))\n    }\n\n    // options bot selector\n    const botCheckboxes = document.getElementsByClassName(\"bot-selector-input\");\n    for (let i = 0; i < botCheckboxes.length; i++) {\n      botCheckboxes[i].addEventListener(\"change\", function(e) {\n        this.selectedBots[i] = e.target.checked;\n        console.log(this.selectedBots);\n      }.bind(this))\n    }\n\n    document.getElementById(\"level-reset\").addEventListener(\"click\", this.restart)\n  }\n\n  handleKeyDown(e) {\n    if(e.key === \" \") {\n      if (this.optionsScreen) return;\n\n      if (this.startScreen) {\n        this.showBots();\n      } else if (this.playing) {\n        this.running === true ? this.pause() : this.resume();\n      } else {\n        this.restart();\n      } \n    } else {  \n      this.keys[e.key] = true;\n    }\n  }\n\n  handleKeyUp(e) {\n    if(this.keys[e.key]) delete this.keys[e.key];\n    if(this.player) this.player.moving = false;\n  }\n\n  // score\n  drawScore(ctx) {\n    if (this.score !== this.displayScore) this.score > this.displayScore ? this.displayScore++ : this.displayScore --;\n\n    ctx.fillStyle = \"pink\";\n    ctx.fillRect(960, 265, 30, 300);\n    ctx.fillStyle = \"white\";\n    ctx.fillRect(965, 270, 20, 290);\n\n    let fillAmount = (100 - Math.min(this.displayScore, 100)) * 2.9\n    ctx.fillStyle = \"lightgray\";\n    ctx.fillRect(965, 270 + fillAmount, 20, 290 - fillAmount);\n\n    ctx.font = \"30px Arial\"\n    ctx.textAlign = \"right\";\n    ctx.fillStyle = \"white\";\n    ctx.fillText(this.displayScore, 955, 533);\n    ctx.fillStyle = \"pink\";\n    ctx.fillText(\"Score\", 955, 563);\n  }\n\n  // check collisions\n  checkMilkCollisions() {\n    let dist = this.dist(this.player.x, this.player.y, this.milk.x, this.milk.y);\n    if (dist < this.player.width) return true;\n    return false;\n  }\n    \n  checkBotCollisions() {\n    for (let i = 0; i < this.bots.length; i++) {\n      let dist = this.dist(this.player.x, this.player.y, this.bots[i].x, this.bots[i].y) \n      if (dist < (this.player.width + this.bots[i].width) / 1.5) {\n        return dist;\n      }\n    }\n    return 0;\n  }\n\n  dist(x1, y1, x2, y2) {\n    return Math.sqrt(\n      Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2)\n    )\n  }\n\n  // collision handling\n  handleMilkCollision() {\n    this.milk = new _milk__WEBPACK_IMPORTED_MODULE_1__.default(this.dimensions)\n    this.score += 5;\n  }\n\n  handleBotCollision(dist) {\n    if (dist < Math.random() * 150) {\n      this.gameOver(\"Should have socially distanced - taste and smell are overrated anyways\");\n    }\n  }\n\n  animate() {\n    this.now = Date.now();\n\n    // bot generation\n    let botElapsed = this.now - this.lastBot;\n\n    if (botElapsed > 1500 && this.running && this.bots.length < 10) {\n      this.lastBot = this.now - (botElapsed % 1500);\n\n      let numNewBots = Math.floor(Math.random() * 3);\n      for (let i = 0; i < numNewBots; i++) {\n        if (!this.selectedBots[0] && !this.selectedBots[1] && !this.selectedBots[2]) break;\n\n        let newBot = null;\n        let val = (Math.random() * 10);\n\n        while (newBot === null) {\n          if (val > 9 && this.selectedBots[0]) {\n            if (!this.selectedBots[2] || this.now - this.gameStart > 10000) newBot = new _bot1__WEBPACK_IMPORTED_MODULE_2__.default(this.dimensions);\n            newBot = new _bot1__WEBPACK_IMPORTED_MODULE_2__.default(this.dimensions);\n          } else if (val > 7 && this.selectedBots[1]) {\n            if (!this.selectedBots[2] || this.now - this.gameStart > 5000) newBot = new _bot2__WEBPACK_IMPORTED_MODULE_3__.default(this.dimensions);\n          } else if (this.selectedBots[2]) {\n            newBot = new _bot3__WEBPACK_IMPORTED_MODULE_4__.default(this.dimensions);\n          }\n          val = (Math.random() * 10);\n        }\n\n        this.bots.push(newBot);\n      }\n    }\n\n    // score decay\n    if (this.now - this.lastScore > 2000 && this.running) {\n      this.lastScore = this.now;\n\n      if (this.scoreSpeed === \"slow\") {\n        this.score -= 1;\n      } else if (this.scoreSpeed === \"medium\") {\n        this.score -= 2;\n      } else {\n        this.score -= 5;\n      }\n    }\n\n    // frame throttling\n    let elapsed = this.now - this.then;\n\n    if (elapsed > 40 && this.running) {\n      this.then = this.now - (elapsed % 40);\n\n      // score handling\n      if (this.score <= 0) {\n        this.gameOver(\"Looks like you succumbed to dehydration - gotta manage that thirst\");\n      } else if (this.score >= 100) {\n         this.levelOver();\n      }\n\n      // collisions\n      if(this.checkMilkCollisions()) {\n        this.handleMilkCollision.call(this);\n      }\n\n      let botDist = this.checkBotCollisions();\n      if (botDist && this.now - this.lastBotCollision > 200) {\n        this.lastBotCollision = this.now;\n        this.handleBotCollision.call(this, botDist);\n      }\n\n      this.level.animate(this.ctx)\n      this.milk.animate(this.ctx);\n      \n      for(var i = this.bots.length - 1; i >= 0; i--){\n\n        // clear out of bounds bots\n        if (this.now - this.bots[i].createdAt > 1000 && (\n          this.bots[i].x < -100 || this.bots[i].x > this.dimensions.width + 100 ||\n          this.bots[i].y < -100 || this.bots[i].y > this.dimensions.height + 100)) {\n          this.bots.splice(i, 1);\n        } else {\n          this.bots[i].moveBot(this.player.x, this.player.y, this.botSpeed);\n          this.bots[i].animate(this.ctx);\n        }\n      }\n\n      this.player.movePlayer(this.keys, this.playerSpeed);\n      this.player.animate(this.ctx);\n      \n      this.drawScore(this.ctx);\n    }\n\n    requestAnimationFrame(this.animate.bind(this));\n  }\n\n}\n\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! namespace exports */
/*! exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ \"./src/game.js\");\n\n\nconst canvas = document.getElementById('milk-game');\nnew _game__WEBPACK_IMPORTED_MODULE_0__.default(canvas);\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/level.js":
/*!**********************!*\
  !*** ./src/level.js ***!
  \**********************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => /* binding */ Level\n/* harmony export */ });\nclass Level {\n  constructor(dimensions) {\n    this.dimensions = dimensions;\n  }\n\n  drawBackground(ctx) {\n    const background = new Image();\n    background.src = \"assets/background.png\";\n    ctx.drawImage(background, 0, 0, this.dimensions.width, this.dimensions.height);\n  }\n\n  animate(ctx) {\n    ctx.clearRect(0, 0, this.dimensions.width, this.dimensions.height);\n    this.drawBackground(ctx);\n  }\n}\n\n//# sourceURL=webpack:///./src/level.js?");

/***/ }),

/***/ "./src/milk.js":
/*!*********************!*\
  !*** ./src/milk.js ***!
  \*********************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => /* binding */ Milk\n/* harmony export */ });\nclass Milk {\n  constructor(dimensions) {\n    this.dimensions = dimensions;\n    this.type = 'milk';\n\n    this.x = Math.random() * (dimensions.width - 150) + 100;\n    this.y = Math.random() * (dimensions.height - 150) + 100;\n  }\n\n  drawMilk(ctx) {\n    const milk = new Image();\n    milk.src = \"assets/milk.png\";\n    ctx.drawImage(milk, this.x, this.y, 30, 40);\n  }\n\n  animate(ctx) {\n    this.drawMilk(ctx);\n  }\n\n}\n\n//# sourceURL=webpack:///./src/milk.js?");

/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => /* binding */ Player\n/* harmony export */ });\nclass Player {\n  constructor(dimensions) {\n    const playerSprite = new Image();\n    playerSprite.src = \"assets/player.png\";\n    this.image = playerSprite;\n\n    this.type = 'player';\n    this.dimensions = dimensions;\n    this.x = 100;\n    this.y = 100;\n\n    this.width = 64;\n    this.height = 64;\n    this.frameX = 0;\n    this.frameY = 0;\n    \n    this.moving = false;\n    this.speed = 10;\n\n    this.createdAt = Date.now();\n  }\n\n  movePlayer(keys, speed) {\n    this.handlePlayerFrame();\n\n    if (speed === \"slow\") {\n      this.speed = 5;\n    } else if (speed === \"medium\") {\n      this.speed = 10;\n    } else {\n      this.speed = 20;\n    }\n\n    // down\n    if (keys['ArrowDown'] && this.y < this.dimensions.height - this.height) {\n      this.y += this.speed;\n      this.frameY = 0;\n      this.moving = true;\n    }\n    // left\n    if (keys['ArrowLeft'] && this.x > 0) {\n      this.x -= this.speed;\n      this.frameY = 1;\n      this.moving = true;\n    }\n    // right\n    if (keys['ArrowRight'] && this.x < this.dimensions.width - this.width) {\n      this.x += this.speed;\n      this.frameY = 2;\n      this.moving = true;\n    }\n    // up\n    if (keys['ArrowUp'] && this.y > 0) {\n      this.y -= this.speed;\n      this.frameY = 3;\n      this.moving = true;\n    }\n  }\n\n  handlePlayerFrame() {\n    if (this.frameX < 3 && this.moving) {\n      this.frameX++;\n    } else {\n      this.frameX = 0;\n    }\n  }\n\n  animate(ctx) {\n    ctx.drawImage(this.image,\n      this.width * this.frameX,\n      this.height * this.frameY,\n      this.width,\n      this.height,\n      this.x,\n      this.y,\n      this.width,\n      this.height);\n\n    ctx.beginPath();\n    ctx.arc(this.x + this.width/2, this.y + this.height/2, 50, 0, 2*Math.PI);\n    ctx.strokeStyle = \"white\";\n    ctx.stroke();\n  }\n}\n\n//# sourceURL=webpack:///./src/player.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./src/index.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;