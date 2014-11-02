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
