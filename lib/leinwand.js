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

//Aliases
Leinwand.prototype.lt = Leinwand.prototype.lineTo;
Leinwand.prototype.mt = Leinwand.prototype.moveTo;
Leinwand.prototype.opacity = Leinwand.prototype.globalAlpha;


//Custom methods
Leinwand.prototype.clear = function clear() {
  this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
  return this;
};

module.exports = Leinwand;
