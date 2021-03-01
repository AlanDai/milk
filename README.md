# [Milk](https://alandai.github.io/milk/)

A simple Javascript game about getting milk in peculiar times

### Controls:
1. The game is played with the arrow keys (▲ ▼ ◀ ▶)
2. Dodge the incoming bots that travel through the map
3. Use the spacebar to pause/resume when in game

### Made (with care) with:
- Canvas for 2d image rendering
- JavaScript for logic
- HTML and CSS for visual structure

### Chasing Bots:
I wanted one of the bots to permanent chase you. I had implemented movement based on axially separate speeds (dx and dy) and wanted to update these to reflect the direction towards the player. To do this, I used some geometry to calculate the angle and used the angle with an inputted speed to generate the dx and dy towards a given player position.
```javascript
  calcMoveTo(speed, sX, sY, dX, dY) {
    let angle = Math.atan2((dY - sY), (dX - sX));
    return [speed * Math.cos(angle), speed * Math.sin(angle)];
  }

  moveBot(playerX, playerY) {
    this.handleBotFrame();

    let movement = this.calcMoveTo(this.speed, this.x, this.y, playerX, playerY);
    this.dx = movement[0];
    this.dy = movement[1];

    this.x += this.dx;
    this.y += this.dy;
  }
```

### Throttling Framerate:
The framerate of canvas using the requestAnimationFrame method was about 60fps. That was way to quick for the animation of my 4 frame characters - I needed to slow down the refresh rate. I played around with setting intervals but had three major problems:
1. I had to manage multiple intervals (score decay, bot generation, animation refresh rate)
2. I wanted the ability to pause and resume the game
3. I did not want to bind every function called inside the passed in function
My solution was to have an internal clock, using `Date.now()` to calculate the elapsed time from the last frame update and a `this.running` instance variable to achieve the functionality I wanted without sacrificing flexibility.

### To Dos:
- New items (like a super milk that is worth more but move around or an item that allows you to eliminate bots)
- General bot refactor; generalize some behavior into a parent class to make code more DRY
- Add distance-based opacity to the rings denoting the bot collision radius
- New level layouts with collidable walls and a different theme (i.e. water based with a water background and different sprite animations)
