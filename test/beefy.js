var Leinwand = require('../');

var canvas = document.createElement('canvas');
canvas.width = 500;
canvas.height = 500;
canvas.style.outline = '1px solid black';
document.body.appendChild(canvas);


var l = new Leinwand(canvas);

window.l = l;

var img = new Image();

img.src = 'http://via.placeholder.com/350x250';

img.onload = () => {
  l
    .drawImageCenteredAt(img, 100, 100, 100, 100, 250, 250, 400, 80)
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
    .circle(50, 50, 40)
    .fill()
    .stroke()
    .fillRect(200, 200, 100, 100)
    .rotateContextAt(250, 250, Math.PI / 4)
    .fillRect(200, 200, 100, 100)
    .resetTransforms()
    .fillStyle('gray')
    .font('50pt sans-serif')
    .fillTextCenteredAt('Hello', 250, 250)
    .strokeStyle('purple')
    .strokeRectCenteredAt(250, 60, 490, 100);
};