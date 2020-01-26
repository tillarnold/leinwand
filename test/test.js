'use strict';
var test = require('tape');

var Leinwand = require('..');


test('Leinwand#circle', function(t) {
  t.plan(6);

  var mockCanvas = {
    getContext: function() {
      return {
        arc: function(x, y, r, a, b, c) {
          t.equals(x, 10);
          t.equals(y, 50);
          t.equals(r, 55);
          t.equals(a, 0);
          t.equals(b, 2 * Math.PI);
          t.equals(c, false);
        }
      };
    },
  };
  var l = new Leinwand(mockCanvas);

  l.circle(10, 50, 55);
});


test('Leinwand#clear', function(t) {
  t.plan(4);

  var mockCanvas = {
    getContext: function() {
      return {
        clearRect: function(x, y, w, h) {
          t.equals(x, 0);
          t.equals(y, 0);
          t.equals(w, 999);
          t.equals(h, 777);
        }
      };
    },
    width: 999,
    height: 777
  };
  var l = new Leinwand(mockCanvas);

  l.clear();
});

test('Leinwand#setters', function(t) {
  t.plan(6);
  var context = {};
  var mockCanvas = {};
  mockCanvas.getContext = function() {
    return context;
  };

  var l = new Leinwand(mockCanvas);

  l
    .font(1)
    .fillStyle(2)
    .textAlign(3)
    .setTextBaseline('hello');

  t.equals(context.font, 1);
  t.equals(context.fillStyle, 2);
  t.equals(context.textAlign, 3);
  t.equals(context.textBaseline, 'hello');
  t.equals(l.textBaseline(), 'hello');
  t.equals(l.getTextBaseline(), 'hello');

});

test('Leinwand#getters', function(t) {
  t.plan(12);
  var context = {};
  var mockCanvas = {};
  mockCanvas.getContext = function() {
    return context;
  };
  mockCanvas.height = 200;
  mockCanvas.width = 500;

  var l = new Leinwand(mockCanvas);

  t.equals(l.getCanvas(), mockCanvas);
  t.equals(l.getContext(), context);
  t.equals(l.getWidth(), 500);
  t.equals(l.width(), 500);
  t.equals(l.getHeight(), 200);
  t.equals(l.height(), 200);

  l.width(1300)
    .height(7700);

  t.equals(l.getWidth(), 1300);
  t.equals(mockCanvas.width, 1300);
  t.equals(l.width(), 1300);
  t.equals(l.getHeight(), 7700);
  t.equals(l.height(), 7700);
  t.equals(mockCanvas.height, 7700);
});

test('Leinwand#methods', function(t) {
  t.plan(2);
  var context = {};
  context.save = function(e) {
    t.equals(e, 2);
  };
  context.lineTo = function(e) {
    t.equals(e, 1);
  };
  var mockCanvas = {};
  mockCanvas.getContext = function() {
    return context;
  };

  var l = new Leinwand(mockCanvas);

  l
    .lt(1)
    .save(2);

});

test('Leinwand#passthrough', function(t) {
  t.plan(2);
  var context = {};
  context.getImageData = function(e) {
    t.equals(e, 2);
    return 22;
  };
  var mockCanvas = {};
  mockCanvas.getContext = function() {
    return context;
  };

  var l = new Leinwand(mockCanvas);

  t.equals(l.getImageData(2), 22);

});

test('Leinwand#Custom methods', function(t) {
  t.plan(1);
  var mockCanvas = {};
  var noop = function() {};
  mockCanvas.getContext = function() {
    return {
      save: noop,
      clear: noop,
      restore: noop,
      translate: noop,
      setTransform: noop,
      rotate: noop,
      clearRect: noop
    };
  };

  var l = new Leinwand(mockCanvas);

  t.equals(l
    .resetCanvas()
    .resetTransforms()
    .rotateContextAt(10, 20, 30)
    .clearWithTransforms(), l);

});