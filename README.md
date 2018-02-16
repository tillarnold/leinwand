# leinwand
[![Code Climate](https://codeclimate.com/github/tillarnold/leinwand/badges/gpa.svg)](https://codeclimate.com/github/tillarnold/leinwand)
[![Build Status](https://travis-ci.org/tillarnold/leinwand.svg?branch=master)](https://travis-ci.org/tillarnold/leinwand)
[![devDependency Status](https://david-dm.org/tillarnold/leinwand/dev-status.svg)](https://david-dm.org/tillarnold/leinwand#info=devDependencies)
[![Coverage Status](https://img.shields.io/coveralls/tillarnold/leinwand.svg)](https://coveralls.io/r/tillarnold/leinwand?branch=master)


> Method chaining for the canvas 2d api.

`leinwand` is a small library that wraps the canvas 2d api. It provides some helper functions as well as a chaining api for
most methods that exist on `CanvasRenderingContext2D`.

## Example usage

```js
let canvas = document.getElementById('myCanvas');
let l = new Leinwand(canvas);

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
  .circle(50, 50, 40)
  .fill()
  .stroke();

```

## Chaining methods

The following methods can be called exactly like the ones of `CanvasRenderingContext2D` except that they return the `leinwand` object.

- arc
- arcTo
- beginPath
- bezierCurveTo
- clearRect
- clip
- closePath
- createLinearGradient
- createRadialGradient
- drawImage
- ellipse
- fill
- fillRect
- fillText
- lineTo
- moveTo
- quadraticCurveTo
- rect
- resetClip
- restore
- rotate
- save
- scale
- setLineDash
- setTransform
- stroke
- strokeRect
- strokeText
- transform
- translate

## Aliases
`mt` is an alias for `moveTo`. `lt` is an alias for `lineTo`.

## Setters/Getters
If you want to set the `fillStyle` of your context you'd usually have to do something like this `ctx.fillStyle = 'red'`.
To allow chaining your api calls in leinwand you do `l.fillStyle('red')`. This does the same as `l.setFillStyle('red')`.
To read a property you can either use `l.getFillStyle()` or `l.fillStyle()`.
This works with all of these properites:

- fillStyle
- font
- globalAlpha
- globalCompositeOperation
- lineCap
- lineDashOffset
- lineJoin
- lineWidth
- miterLimit
- strokeStyle
- textAlign
- textBaseline

Additionally this also works with `width` and `height`. So you can do `l.setHeight(400)` (or `l.height(400)`) to change the height of the canvas element to 400.
## Passthrough methods
There are methods on `CanvasRenderingContext2D` that do return something. So we can't chain on these methods. They behave exactly as if they were called on the context.

- getImageData
- getLineDash
- measureText
- putImageData

## Additional methods

### l.clear()
Clears the canvas. If you have applied any transforms to the context this may not do what you want (try `clearWithTransforms`).

### l.circle(x, y, r)
Draws a path in form of a circle at `x`/`y` with a radius of `r`.

### l.strokeCircle(x, y, r)
Strokes a circle at `x`/`y` with a radius of `r`.

### l.fillCircle(x, y, r)
Fills a circle at `x`/`y` with a radius of `r`.

### l.rotateContextAt(x, y, r)
Rotates the context at `x`/`y` by `r` radians.

### l.resetCanvas()
Resets the canvas.

### l.resetTransforms()
Resets all the transforms.

### l.clearWithTransforms()
Clears the canvas event if there have been transforms applied. The tansforms are preserved.

### l.rectCenteredAt(x, y, w, h)
Draws a path of a rectangle centered at `x`/`y` with a widht of `w` and a hight of `h`.

### l.fillRectCenteredAt(x, y, w, h)
Fills a rectangle centered at `x`/`y` with a widht of `w` and a hight of `h`.

### l.strokeRectCenteredAt(x, y, w, h)
Strokes a rectangle centered at `x`/`y` with a widht of `w` and a hight of `h`.

### l.fillTextCenteredAt(text, x, y)
Fills the the text `text` centered at `x`/`y`.

### l.strokeTextCenteredAt(text, x, y)
Strokes the the text `text` centered at `x`/`y`.

### l.drawImageCenteredAt(...)
Like `drawImage` on `CanvasRenderingContext2D` this method has 3 different signatures.
```js
 l.drawCenteredAtImage(image, dx, dy);
 l.drawCenterdAtImage(image, dx, dy, dWidth, dHeight);
 l.drawCenteredAtImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
```

This does what `drawImage` does except that the image is centered at `dy`/`dy`.
For more infor on the parameters hava a look at the [mdn aritcle](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage) on `drawImage`.

### l.getContext()
Get the `CanvasRenderingContext2D`. Just in cave leinwand does not provide some functionality.

### l.getCanvas()
Get the underlying `HTMLCanvasElement`.

## Release History
* 2018-02-09   v0.5.0   add more utility functions
* 2016-07-12   v0.4.0   add `drawImage` method
* 2015-12-05   v0.3.0   add more utility functions
* 2015-09-24   v0.2.0   small bug fixes
* 2014-11-02   v0.1.0   Initial version
