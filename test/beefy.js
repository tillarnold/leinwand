var Leinwand = require('../');

var canvas = document.createElement('canvas');
canvas.width = 500;
canvas.height = 500;
canvas.style.outline = '1px solid black';
document.body.appendChild(canvas);


var l = new Leinwand(canvas);

window.l = l;

l
  .fillStyle('red')
  .mt(50, 50)
  .lt(250, 70)
  .lt(166, 99)
  .lt(166, 199)
  .closePath()
  .fill()
  .stroke()
  .beginPath()
  .fillStyle('blue')
  .circle(50,50,40)
  .fill()
  .stroke();
