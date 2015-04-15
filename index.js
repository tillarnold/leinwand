'use strict';

var methodNames = [
  'arc',
  'arcTo',
  'beginPath',
  'bezierCurveTo',
  'clearRect',
  'clip',
  'closePath',
  'createLinearGradient',
  'createRadialGradient',
  'ellipse',
  'fill',
  'fillRect',
  'fillText',
  'lineTo',
  'moveTo',
  'quadraticCurveTo',
  'rect',
  'resetClip',
  'restore',
  'rotate',
  'save',
  'scale',
  'stroke',
  'strokeRect',
  'strokeText',
  'transform',
  'translate'
];


var setterNames = [
  'fillStyle',
  'font',
  'globalAlpha',
  'globalCompositeOperation',
  'lineCap',
  'lineJoin',
  'lineWidth',
  'strokeStyle',
  'textAlign',
  'textBaseline'
];


var Leinwand = function Leinwand(canvas) {
  if (!(this instanceof Leinwand)) {
    return new Leinwand(canvas);
  }

  this._canvas = canvas;
  this._ctx = canvas.getContext('2d');
};

methodNames.forEach(function(el) {
  Leinwand.prototype[el] = function() {
    this._ctx[el].apply(this._ctx, arguments);
    return this;
  };
});

setterNames.forEach(function(el) {
  Leinwand.prototype[el] = function(s) {
    this._ctx[el] = s;
    return this;
  };
});

//Custom methods
Leinwand.prototype.clear = function clear() {
  this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
  return this;
};

Leinwand.prototype.circle = function cirlce(x, y, r) {
  this._ctx.arc(x, y, r, 0, 2 * Math.PI, false);
  return this;
};

//Getters
Leinwand.prototype.getContext = function getContext() {
  return this._ctx;
};

Leinwand.prototype.getCanvas = function getCanvas() {
  return this._canvas;
};

Leinwand.prototype.getWidth = function getWidth() {
  return this._canvas.width;
};

Leinwand.prototype.getHeight = function getHeight() {
  return this._canvas.height;
};


//Aliases
Leinwand.prototype.lt = Leinwand.prototype.lineTo;
Leinwand.prototype.mt = Leinwand.prototype.moveTo;
Leinwand.prototype.opacity = Leinwand.prototype.globalAlpha;

module.exports = Leinwand;
