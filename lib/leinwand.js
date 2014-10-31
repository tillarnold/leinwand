var methodNames = ['fill', 'stroke', 'save', 'restore', 'lineTo', 'moveTo', 'arc', 'translate', 'rotate', 'rect', 'beginPath', 'closePath', 'clearRect'];
var setterNames = ['fillStyle', 'strokeStyle', 'font', 'globalAlpha', 'lineWidth'];

var Leinwand = function Leinwand(canvas) {
  if (!(this instanceof Leinwand)) {
    return new Leinwand(color)
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
