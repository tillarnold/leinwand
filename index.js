'use strict';

const methodNames = [
  'arc',
  'arcTo',
  'beginPath',
  'bezierCurveTo',
  'clearRect',
  'clip',
  'closePath',
  'createLinearGradient',
  'createRadialGradient',
  'drawImage',
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
  'setLineDash',
  'setTransform',
  'stroke',
  'strokeRect',
  'strokeText',
  'transform',
  'translate'
];


const setterNames = [
  'fillStyle',
  'font',
  'globalAlpha',
  'globalCompositeOperation',
  'lineCap',
  'lineDashOffset',
  'lineJoin',
  'lineWidth',
  'miterLimit',
  'strokeStyle',
  'textAlign',
  'textBaseline'
];

const passthroughNames = [
  'getImageData',
  'getLineDash',
  'measureText',
  'putImageData'
];


function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}


class Leinwand {
  constructor(canvas) {
    this._canvas = canvas;
    this._ctx = canvas.getContext('2d');
  }

  clear() {
    return this.clearRect(0, 0, this._canvas.width, this._canvas.height);
  }

  circle(x, y, r) {
    return this.arc(x, y, r, 0, 2 * Math.PI, false);
  }

  strokeCircle(x, y, r) {
    return this.beginPath().circle(x, y, r).closePath().stroke();
  }

  fillCircle(x, y, r) {
    return this.beginPath().circle(x, y, r).closePath().fill();
  }

  rotateContextAt(x, y, r) {
    return this
      .translate(x, y)
      .rotate(r)
      .translate(-1 * x, -1 * y);
  }

  resetCanvas() {
    this._canvas.width = this._canvas.width;
    return this;
  }

  resetTransforms() {
    return this.setTransform(1, 0, 0, 1, 0, 0);
  }

  clearWithTransforms() {
    return this
      .save()
      .resetTransforms()
      .clear()
      .restore();
  }

  rectCenteredAt(x, y, w, h) {
    return this
      .rect(x - w / 2, y - h / 2, w, h);
  }

  fillRectCenteredAt(x, y, w, h) {
    return this
      .fillRect(x - w / 2, y - h / 2, w, h);
  }

  strokeRectCenteredAt(x, y, w, h) {
    return this
      .strokeRect(x - w / 2, y - h / 2, w, h);
  }

  fillTextCenteredAt(text, x, y) {
    return this
      .save()
      .textBaseline('middle')
      .textAlign('center')
      .fillText(text, x, y)
      .restore();
  }

  strokeTextCenteredAt(text, x, y) {
    return this
      .save()
      .textBaseline('middle')
      .textAlign('center')
      .strokeText(text, x, y)
      .resore();
  }

  drawImageCenteredAt(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight) {
    let args = arguments.length;
    if (args === 3) {
      this.drawImage(image, sx - image.width / 2, sy - image.height / 2);
    } else if (args === 5) {
      this.drawImage(image, sx - sWidth / 2, sy - sHeight / 2, sWidth, sHeight);
    } else if (args === 9) {
      this.drawImage(image, sx, sy, sWidth, sHeight, dx - dWidth / 2, dy - dHeight / 2, dWidth, dHeight);
    } else {
      throw new TypeError(arguments.length + ' is not a valid number of arguments to Leinwand.drawImageCenteredAt');
    }

    return this;
  }

  //Getters
  getContext() {
    return this._ctx;
  }

  getCanvas() {
    return this._canvas;
  }

  getWidth() {
    return this._canvas.width;
  }

  getHeight() {
    return this._canvas.height;
  }

  setWidth(width) {
    this._canvas.width = width;
    return this;
  }

  setHeight(height) {
    this._canvas.height = height;
    return this;
  }

  width(w) {
    if (arguments.length === 0) {
      return this._canvas.width;
    }

    return this.setWidth(w);
  }

  height(h) {
    if (arguments.length === 0) {
      return this._canvas.height;
    }

    return this.setHeight(h);
  }
}


methodNames.forEach(el =>
  Leinwand.prototype[el] = function(...args) {
    this._ctx[el](...args);
    return this;
  }
);

setterNames.forEach(el => {
  Leinwand.prototype[el] = function(s) {
    if (arguments.length === 0) {
      return this._ctx[el];
    }
    this._ctx[el] = s;
    return this;
  };

  Leinwand.prototype['get' + capitalizeFirstLetter(el)] = function() {
    return this._ctx[el];
  };

  Leinwand.prototype['set' + capitalizeFirstLetter(el)] = function(s) {
    this._ctx[el] = s;
    return this;
  };
});

passthroughNames.forEach(el => {
  Leinwand.prototype[el] = function(...args) {
    return this._ctx[el](...args);
  };
});

//Aliases
Leinwand.prototype.lt = Leinwand.prototype.lineTo;
Leinwand.prototype.mt = Leinwand.prototype.moveTo;
Leinwand.prototype.opacity = Leinwand.prototype.globalAlpha;

module.exports = Leinwand;