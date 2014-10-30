var Leinwand = require('../');

var canvas = document.createElement('canvas');
canvas.style.outline = '1px solid black';
document.body.appendChild(canvas);


var l = new Leinwand(canvas);

window.l = l;

l.fillStyle('red')
  .mt(50, 50)
  .lt(50, 70)
  .lt(66, 99)
  .closePath()
  .fill();
