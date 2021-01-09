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

/***/ "./src/bot.js":
/*!********************!*\
  !*** ./src/bot.js ***!
  \********************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => /* binding */ Bot\n/* harmony export */ });\nclass Bot {\n  constructor(dimensions) {\n    const botSprite = new Image();\n    botSprite.src = \"assets/bot.png\";\n    this.image = botSprite;\n\n    this.type = 'bot';\n    this.dimensions = dimensions;\n\n    // position\n    this.x, this.y;\n    // axially separated speed\n    this.dx = 0;\n    this.dy = 0;\n\n    this.generateStartValues();\n\n    this.width = 109;\n    this.height = 174;\n    this.frameX = 0;\n    this.frameY;\n    \n    this.moving = true;\n    this.createdAt = Date.now();\n  }\n\n  generateStartValues() {\n    const val = Math.random() * 4,\n          randWidth = Math.random() * this.dimensions.width,\n          randHeight = Math.random() * this.dimensions.height;\n\n    if (val < 1) {\n      this.x = -100;\n      this.y = randHeight;\n      this.dx = 10;\n      this.frameY = 3;\n    } else if (val < 2) {\n      this.x = this.dimensions.width + 100;\n      this.y = randHeight;\n      this.dx = -10;\n      this.frameY = 2;\n    } else if (val < 3) {\n      this.x = randWidth;\n      this.y = -100;\n      this.dy = 10;\n      this.frameY = 0;\n    } else {\n      this.x = randWidth;\n      this.y = this.dimensions.height + 100;\n      this.dy = -10;\n      this.frameY = 1 ;\n    }\n  }\n\n  moveBot() {\n    this.handleBotFrame();\n\n    this.x += this.dx;\n    this.y += this.dy;\n  }\n\n  handleBotFrame() {\n    if (this.frameX < 3 && this.moving) {\n      this.frameX++;\n    } else {\n      this.frameX = 0;\n    }\n  }\n\n  animate(ctx) {\n    ctx.drawImage(this.image,\n      this.width * this.frameX,\n      this.height * this.frameY,\n      this.width,\n      this.height,\n      this.x,\n      this.y,\n      this.width/3,\n      this.height/3);\n\n    ctx.beginPath();\n    ctx.arc(this.x + this.width/6, this.y + this.height/6, 50, 0, 2*Math.PI);\n    ctx.stroke();\n  }\n}\n\n//# sourceURL=webpack:///./src/bot.js?");

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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => /* binding */ MilkGame\n/* harmony export */ });\n/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player */ \"./src/player.js\");\n/* harmony import */ var _milk__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./milk */ \"./src/milk.js\");\n/* harmony import */ var _bot__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./bot */ \"./src/bot.js\");\n/* harmony import */ var _level__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./level */ \"./src/level.js\");\n\n\n\n\n\nclass MilkGame {\n  constructor(canvas) {\n    this.ctx = canvas.getContext('2d');\n    this.dimensions = { width: canvas.width, height: canvas.height }\n    this.keys = {}\n\n    this.level = new _level__WEBPACK_IMPORTED_MODULE_3__.default(this.dimensions);\n    this.level.animate(this.ctx);\n    this.playing = false;\n  \n    this.lastScore = Date.now() + 1000;\n\n    // throttle\n    this.then = Date.now();\n    this.now;\n\n    // bot generation\n    this.lastBot = Date.now() + 1500;\n    this.bots = [];\n    this.lastBotCollision = Date.now();\n\n    // binding\n    this.play = this.play.bind(this);\n    this.restart = this.restart.bind(this);\n    this.pause = this.pause.bind(this);\n    this.resume = this.resume.bind(this);\n    this.checkMilkCollisions = this.checkMilkCollisions.bind(this);\n    this.checkBotCollisions = this.checkBotCollisions.bind(this);\n    this.animate = this.animate.bind(this);\n\n    this.registerEvents();\n  }\n\n  // general game controls\n\n  play() {\n    this.running = true;\n    this.playing = true;\n    this.score = 20;\n\n    this.milk = new _milk__WEBPACK_IMPORTED_MODULE_1__.default(this.dimensions);\n    this.bots = [];\n    this.player = new _player__WEBPACK_IMPORTED_MODULE_0__.default(this.dimensions);\n    document.getElementById(\"start-screen\").style.display = \"none\";\n    document.getElementById(\"music\").play();\n\n    this.animate();\n  }\n\n  restart() {\n    this.ctx.clearRect(0, 0, this.dimensions.width, this.dimensions.height);\n\n    // reset document elements\n    document.getElementById(\"pause\").style.display = \"none\";\n    document.getElementById(\"resume\").style.display = \"block\";\n    document.getElementById(\"game-over-screen\").style.display = \"none\";\n    document.getElementById(\"level-over-screen\").style.display = \"none\";\n    let music = document.getElementById(\"music\");\n    music.currentTime = 0;\n\n    this.lastBot = Date.now() + 1500;\n    this.play();\n  }\n\n  pause() {\n    this.running = false;\n    document.getElementById(\"pause\").style.display = \"none\";\n    document.getElementById(\"resume\").style.display = \"block\";\n    document.getElementById(\"music\").pause();\n  }\n\n  resume() {\n    this.running = true;\n    document.getElementById(\"pause\").style.display = \"block\";\n    document.getElementById(\"resume\").style.display = \"none\";\n    document.getElementById(\"music\").play();\n    this.animate();\n  }\n\n  gameOver(innerText) {\n    this.running = false;\n    this.playing = false;\n    document.getElementById(\"game-over-screen\").style.display = \"block\";\n    document.getElementById(\"game-over-message\").innerHTML = innerText;\n  }\n\n  levelOver() {\n    this.running = false;\n    this.playing = false;\n    document.getElementById(\"level-over-screen\").style.display = \"block\";\n  }\n\n  // player movement\n  registerEvents() {\n    window.addEventListener(\"keydown\", this.handleKeyDown.bind(this));\n    window.addEventListener(\"keyup\", this.handleKeyUp.bind(this));\n\n    document.getElementById(\"start\").addEventListener(\"click\", this.play);\n    document.getElementById(\"pause\").addEventListener(\"click\", this.pause);\n    document.getElementById(\"resume\").addEventListener(\"click\", this.resume);\n    document.getElementById(\"reset\").addEventListener(\"click\", this.restart)\n\n    // placeholder\n    document.getElementById(\"level-reset\").addEventListener(\"click\", this.restart)\n  }\n\n  handleKeyDown(e) {\n    if(e.key === \" \") {\n      if (this.playing) {\n        this.running === true ? this.pause() : this.resume();\n      } else {\n        this.restart();\n      } \n    } else {\n      this.keys[e.key] = true;\n    }\n  }\n\n  handleKeyUp(e) {\n    if(this.keys[e.key]) delete this.keys[e.key];\n    if(this.player) this.player.moving = false;\n  }\n\n  // score\n  drawScore(ctx) {\n    ctx.fillStyle = \"pink\";\n    ctx.fillRect(960, 265, 30, 300);\n    ctx.fillStyle = \"white\";\n    ctx.fillRect(965, 270, 20, 290);\n\n    let fillAmount = (100 - Math.min(this.score, 100)) * 2.9\n    ctx.fillStyle = \"lightgray\";\n    ctx.fillRect(965, 270 + fillAmount, 20, 290 - fillAmount);\n  }\n\n  // check collisions\n  checkMilkCollisions() {\n    let dist = this.dist(this.player.x, this.player.y, this.milk.x, this.milk.y);\n    if (dist < this.player.width) {\n      return true;\n    }\n    return false;\n  }\n    \n  checkBotCollisions() {\n    for (let i = 0; i < this.bots.length; i++) {\n      let dist = this.dist(this.player.x, this.player.y, this.bots[i].x, this.bots[i].y) \n      if (dist < (this.player.width + this.bots[i].width) / 1.5) {\n        return dist;\n      }\n    }\n    return 0;\n  }\n\n  dist(x1, y1, x2, y2) {\n    return Math.sqrt(\n      Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2)\n    )\n  }\n\n  // collision handling\n  handleMilkCollision() {\n    this.milk = new _milk__WEBPACK_IMPORTED_MODULE_1__.default(this.dimensions)\n    this.score += 5;\n  }\n\n  handleBotCollision(dist) {\n    if (dist < Math.random() * 150) {\n      this.gameOver(\"Should have socially distanced - ehh, taste and smell are overrated anyways\");\n    }\n  }\n\n  animate() {\n    this.now = Date.now();\n\n    // bot generation\n    let botElapsed = this.now - this.lastBot;\n\n    if (botElapsed > 1500 && this.running) {\n      this.lastBot = this.now - (botElapsed % 1500);\n\n      let numNewBots = Math.floor(Math.random() * 4);\n      for (let i = 0; i < numNewBots; i++) {\n        let newBot = new _bot__WEBPACK_IMPORTED_MODULE_2__.default(this.dimensions);\n        this.bots.push(newBot);\n      }\n    }\n\n    if (this.score >= 100) {\n      this.levelOver();\n    }\n\n    // score decay/handling\n    if (this.now - this.lastScore > 2000) {\n\n      this.lastScore = this.now;\n      this.score -= 2;\n\n      if (this.score <= 0) {\n        this.gameOver(\"Looks like you succumbed to dehydration - gotta manage that thirst\");\n      }\n    }\n\n    // frame throttling\n    let elapsed = this.now - this.then;\n\n    if (elapsed > 40 && this.running) {\n      this.then = this.now - (elapsed % 40);\n\n      // collisions\n      if(this.checkMilkCollisions()) {\n        this.handleMilkCollision.call(this);\n      }\n\n      let botDist = this.checkBotCollisions();\n      if (botDist && this.now - this.lastBotCollision > 200) {\n        this.lastBotCollision = this.now;\n        this.handleBotCollision.call(this, botDist);\n      }\n\n      this.level.animate(this.ctx)\n      this.milk.animate(this.ctx);\n      \n      // remove old bots\n      if (this.bots[0] && this.now - this.bots[0].createdAt > 10000) {\n        this.bots.shift();\n      }\n      \n      for(var i = 0; i < this.bots.length; i++){\n        this.bots[i].moveBot();\n        this.bots[i].animate(this.ctx);\n      }\n\n      this.player.movePlayer(this.keys);\n      this.player.animate(this.ctx);\n      \n      this.drawScore(this.ctx);\n    }\n\n    requestAnimationFrame(this.animate.bind(this));\n  }\n\n}\n\n\n//# sourceURL=webpack:///./src/game.js?");

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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => /* binding */ Milk\n/* harmony export */ });\nclass Milk {\n  constructor(dimensions) {\n    this.dimensions = dimensions;\n    this.type = 'milk';\n\n    this.x = Math.random() * (dimensions.width - 150) + 50;\n    this.y = Math.random() * (dimensions.height - 100) + 50;\n  }\n\n  drawMilk(ctx) {\n    const milk = new Image();\n    milk.src = \"assets/milk.png\";\n    ctx.drawImage(milk, this.x, this.y, 30, 40);\n  }\n\n  animate(ctx) {\n    this.drawMilk(ctx);\n  }\n\n}\n\n//# sourceURL=webpack:///./src/milk.js?");

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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => /* binding */ Player\n/* harmony export */ });\nclass Player {\n  constructor(dimensions) {\n    const playerSprite = new Image();\n    playerSprite.src = \"assets/player.png\";\n    this.image = playerSprite;\n\n    this.type = 'player';\n    this.dimensions = dimensions;\n    this.x = 100;\n    this.y = 100;\n\n    this.width = 64;\n    this.height = 64;\n    this.frameX = 0;\n    this.frameY = 0;\n    \n    this.moving = false;\n    this.speed = 10;\n\n    this.createdAt = Date.now();\n  }\n\n  movePlayer(keys) {\n    this.handlePlayerFrame();\n\n    // down\n    if (keys['ArrowDown'] && this.y < this.dimensions.height - this.height) {\n      this.y += this.speed;\n      this.frameY = 0;\n      this.moving = true;\n    }\n    // left\n    if (keys['ArrowLeft'] && this.x > 0) {\n      this.x -= this.speed;\n      this.frameY = 1;\n      this.moving = true;\n    }\n    // right\n    if (keys['ArrowRight'] && this.x < this.dimensions.width - this.width) {\n      this.x += this.speed;\n      this.frameY = 2;\n      this.moving = true;\n    }\n    // up\n    if (keys['ArrowUp'] && this.y > 0) {\n      this.y -= this.speed;\n      this.frameY = 3;\n      this.moving = true;\n    }\n  }\n\n  handlePlayerFrame() {\n    if (this.frameX < 3 && this.moving) {\n      this.frameX++;\n    } else {\n      this.frameX = 0;\n    }\n  }\n\n  animate(ctx) {\n    ctx.drawImage(this.image,\n      this.width * this.frameX,\n      this.height * this.frameY,\n      this.width,\n      this.height,\n      this.x,\n      this.y,\n      this.width,\n      this.height);\n\n    ctx.beginPath();\n    ctx.arc(this.x + this.width/2, this.y + this.height/2, 50, 0, 2*Math.PI);\n    ctx.strokeStyle = \"white\";\n    ctx.stroke();\n  }\n}\n\n//# sourceURL=webpack:///./src/player.js?");

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