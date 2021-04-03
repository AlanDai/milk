const Util = {
  inherits(childClass, parentClass) {
    function Surrogate(){};
    Surrogate.prototype = new Surrogate();
    childClass.prototype = new Surrogate();
    childClass.prototype.constructor = childClass;
  },
  
  dist(x1, y1, x2, y2) {
    return Math.sqrt(
      Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2)
    )
  },

  calcMoveTo(speed, sX, sY, dX, dY) {
    let angle = Math.atan2((dY - sY), (dX - sX));
    return [speed * Math.cos(angle), speed * Math.sin(angle)];
  }
}

module.exports = Util;