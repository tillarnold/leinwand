'use strict';
var test = require('tape');

var leinwand = require('..');


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
  var l = leinwand(mockCanvas);

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
  var l = leinwand(mockCanvas);

  l.clear();
});

test('Leinwand#setters', function(t) {
  t.plan(3);
  var context = {};
  var mockCanvas = {};
  mockCanvas.getContext = function() {
    return context;
  };

  var l = leinwand(mockCanvas);

  l
    .font(1)
    .fillStyle(2)
    .textAlign(3);

  t.equals(context.font, 1);
  t.equals(context.fillStyle, 2);
  t.equals(context.textAlign, 3);

});

test('Leinwand#getters', function(t) {
  t.plan(4);
  var context = {};
  var mockCanvas = {};
  mockCanvas.getContext = function() {
    return context;
  };
  mockCanvas.height = 200;
  mockCanvas.width = 500;

  var l = leinwand(mockCanvas);

  t.equals(l.getCanvas(), mockCanvas);
  t.equals(l.getContext(), context);
  t.equals(l.getWidth(), 500);
  t.equals(l.getHeight(), 200);

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

  var l = leinwand(mockCanvas);

  l
    .lt(1)
    .save(2);

});

test('Leinwand#Custom methods', function(t) {
  t.plan(1);
  var mockCanvas = {};
  var noop = function(){};
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

  var l = leinwand(mockCanvas);

  t.equals(l
    .resetCanvas()
    .resetTransforms()
    .rotateContextAt(10, 20, 30)
    .clearWithTransforms(), l);

});
