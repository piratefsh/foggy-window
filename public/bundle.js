/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = __webpack_require__(2)['default'];

	var _classCallCheck = __webpack_require__(6)['default'];

	var _interopRequireDefault = __webpack_require__(7)['default'];

	__webpack_require__(8);

	var _stackblurCanvas = __webpack_require__(12);

	var _stackblurCanvas2 = _interopRequireDefault(_stackblurCanvas);

	var _imagesDockJpg = __webpack_require__(13);

	var _imagesDockJpg2 = _interopRequireDefault(_imagesDockJpg);

	var FoggyWindow = (function () {
	    function FoggyWindow() {
	        var _this = this;

	        _classCallCheck(this, FoggyWindow);

	        // setup canvas
	        this.canvas = document.querySelector('.foggy-window');

	        this.context = this.canvas.getContext('2d');
	        this.context.scale(window.devicePixelRatio / 2, window.devicePixelRatio / 2);

	        // draw image
	        this.scenery = new Image();
	        this.scenery.src = _imagesDockJpg2['default'];
	        this.scenery.onload = function () {
	            _this.render();
	        };

	        var moveListener = function moveListener(event) {
	            return _this.draw(event);
	        };
	        window.onresize = function () {
	            return _this.render();
	        };
	        this.canvas.addEventListener('mousedown', function (event) {
	            _this.canvas.addEventListener('mousemove', moveListener);
	        });
	        this.canvas.addEventListener('touchstart', function (event) {
	            _this.canvas.addEventListener('touchmove', moveListener);
	        });
	        this.canvas.addEventListener('mouseup', function (event) {
	            event.target.removeEventListener('mousemove', moveListener);
	        });
	    }

	    _createClass(FoggyWindow, [{
	        key: 'render',
	        value: function render() {

	            this.canvas.width = window.innerWidth;
	            this.canvas.height = window.innerHeight;
	            var imgAspectRatio = this.scenery.width / this.scenery.height;
	            var canvasAspectRatio = this.canvas.width / this.canvas.height;

	            var imgRenderHeight = undefined,
	                imgRenderWidth = undefined,
	                imgOffsetX = undefined,
	                imgOffsetY = undefined;

	            if (canvasAspectRatio <= imgAspectRatio) {
	                //canvas is skinnier than the image

	                imgRenderWidth = this.canvas.height * imgAspectRatio;
	                imgRenderHeight = this.canvas.height;

	                //offset the x
	                imgOffsetX = -(imgRenderWidth - this.canvas.width) / 2;
	                imgOffsetY = 0;
	            } else {

	                imgRenderWidth = this.canvas.width;
	                imgRenderHeight = this.canvas.width / imgAspectRatio;

	                //offset the y
	                imgOffsetX = 0;
	                imgOffsetY = -(imgRenderHeight - this.canvas.height) / 2;
	            }

	            this.context.drawImage(this.scenery, imgOffsetX, imgOffsetY, imgRenderWidth, imgRenderHeight);

	            this.blur(8);
	        }
	    }, {
	        key: 'blur',
	        value: function blur(radius) {
	            var imageData = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
	            var blurred = _stackblurCanvas2['default'].imageDataRGB(imageData, 0, 0, this.canvas.width, this.canvas.height, radius);
	            this.context.putImageData(blurred, 0, 0);
	        }
	    }, {
	        key: 'draw',
	        value: function draw(event) {

	            var x = undefined,
	                y = undefined;

	            if ('clientX' in event) {
	                x = event.clientX;
	                y = event.clientY;
	            } else if ('touches' in event) {
	                x = event.touches[0].clientX;
	                y = event.touches[0].clientY;
	            } else {
	                console.error("Unknown event sent to draw function");
	            }

	            this.context.fillStyle = '#ffffff';
	            this.context.fillRect(x, y, 3, 3);
	            this.context.stroke();
	        }
	    }]);

	    return FoggyWindow;
	})();

	var foggy = new FoggyWindow();

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _Object$defineProperty = __webpack_require__(3)["default"];

	exports["default"] = (function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];
	      descriptor.enumerable = descriptor.enumerable || false;
	      descriptor.configurable = true;
	      if ("value" in descriptor) descriptor.writable = true;

	      _Object$defineProperty(target, descriptor.key, descriptor);
	    }
	  }

	  return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);
	    if (staticProps) defineProperties(Constructor, staticProps);
	    return Constructor;
	  };
	})();

	exports.__esModule = true;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(4), __esModule: true };

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(5);
	module.exports = function defineProperty(it, key, desc){
	  return $.setDesc(it, key, desc);
	};

/***/ },
/* 5 */
/***/ function(module, exports) {

	var $Object = Object;
	module.exports = {
	  create:     $Object.create,
	  getProto:   $Object.getPrototypeOf,
	  isEnum:     {}.propertyIsEnumerable,
	  getDesc:    $Object.getOwnPropertyDescriptor,
	  setDesc:    $Object.defineProperty,
	  setDescs:   $Object.defineProperties,
	  getKeys:    $Object.keys,
	  getNames:   $Object.getOwnPropertyNames,
	  getSymbols: $Object.getOwnPropertySymbols,
	  each:       [].forEach
	};

/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";

	exports["default"] = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

	exports.__esModule = true;

/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";

	exports["default"] = function (obj) {
	  return obj && obj.__esModule ? obj : {
	    "default": obj
	  };
	};

	exports.__esModule = true;

/***/ },
/* 8 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */
/***/ function(module, exports) {

	/*
	    StackBlur - a fast almost Gaussian Blur For Canvas

	    Version:     0.5
	    Author:        Mario Klingemann
	    Contact:     mario@quasimondo.com
	    Website:    http://www.quasimondo.com/StackBlurForCanvas
	    Twitter:    @quasimondo

	    In case you find this class useful - especially in commercial projects -
	    I am not totally unhappy for a small donation to my PayPal account
	    mario@quasimondo.de

	    Or support me on flattr:
	    https://flattr.com/thing/72791/StackBlur-a-fast-almost-Gaussian-Blur-Effect-for-CanvasJavascript

	    Copyright (c) 2010 Mario Klingemann

	    Permission is hereby granted, free of charge, to any person
	    obtaining a copy of this software and associated documentation
	    files (the "Software"), to deal in the Software without
	    restriction, including without limitation the rights to use,
	    copy, modify, merge, publish, distribute, sublicense, and/or sell
	    copies of the Software, and to permit persons to whom the
	    Software is furnished to do so, subject to the following
	    conditions:

	    The above copyright notice and this permission notice shall be
	    included in all copies or substantial portions of the Software.

	    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
	    EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
	    OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
	    NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
	    HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
	    WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
	    FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
	    OTHER DEALINGS IN THE SOFTWARE.
	    */


	var mul_table = [
	    512,512,456,512,328,456,335,512,405,328,271,456,388,335,292,512,
	    454,405,364,328,298,271,496,456,420,388,360,335,312,292,273,512,
	    482,454,428,405,383,364,345,328,312,298,284,271,259,496,475,456,
	    437,420,404,388,374,360,347,335,323,312,302,292,282,273,265,512,
	    497,482,468,454,441,428,417,405,394,383,373,364,354,345,337,328,
	    320,312,305,298,291,284,278,271,265,259,507,496,485,475,465,456,
	    446,437,428,420,412,404,396,388,381,374,367,360,354,347,341,335,
	    329,323,318,312,307,302,297,292,287,282,278,273,269,265,261,512,
	    505,497,489,482,475,468,461,454,447,441,435,428,422,417,411,405,
	    399,394,389,383,378,373,368,364,359,354,350,345,341,337,332,328,
	    324,320,316,312,309,305,301,298,294,291,287,284,281,278,274,271,
	    268,265,262,259,257,507,501,496,491,485,480,475,470,465,460,456,
	    451,446,442,437,433,428,424,420,416,412,408,404,400,396,392,388,
	    385,381,377,374,370,367,363,360,357,354,350,347,344,341,338,335,
	    332,329,326,323,320,318,315,312,310,307,304,302,299,297,294,292,
	    289,287,285,282,280,278,275,273,271,269,267,265,263,261,259];


	var shg_table = [
	    9, 11, 12, 13, 13, 14, 14, 15, 15, 15, 15, 16, 16, 16, 16, 17,
	    17, 17, 17, 17, 17, 17, 18, 18, 18, 18, 18, 18, 18, 18, 18, 19,
	    19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 20, 20, 20,
	    20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 21,
	    21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21,
	    21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 22, 22, 22, 22, 22, 22,
	    22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22,
	    22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 23,
	    23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23,
	    23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23,
	    23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23,
	    23, 23, 23, 23, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24,
	    24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24,
	    24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24,
	    24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24,
	    24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24 ];


	function processImage(img, canvas, radius, blurAlphaChannel)
	{
	    if (typeof(img) == 'string') {
	        var img = document.getElementById(img);
	    }
	    else if (!img instanceof HTMLImageElement) {
	        return;
	    }
	    var w = img.naturalWidth;
	    var h = img.naturalHeight;

	    if (typeof(canvas) == 'string') {
	        var canvas = document.getElementById(canvas);
	    }
	    else if (!canvas instanceof HTMLCanvasElement) {
	        return;
	    }

	    canvas.style.width  = w + 'px';
	    canvas.style.height = h + 'px';
	    canvas.width = w;
	    canvas.height = h;

	    var context = canvas.getContext('2d');
	    context.clearRect(0, 0, w, h);
	    context.drawImage(img, 0, 0);

	    if (isNaN(radius) || radius < 1) return;

	    if (blurAlphaChannel)
	        processCanvasRGBA(canvas, 0, 0, w, h, radius);
	    else
	        processCanvasRGB(canvas, 0, 0, w, h, radius);
	}

	function getImageDataFromCanvas(canvas, top_x, top_y, width, height)
	{
	    if (typeof(canvas) == 'string')
	        var canvas  = document.getElementById(canvas);
	    else if (!canvas instanceof HTMLCanvasElement)
	        return;

	    var context = canvas.getContext('2d');
	    var imageData;

	    try {
	        try {
	            imageData = context.getImageData(top_x, top_y, width, height);
	        } catch(e) {

	            // NOTE: this part is supposedly only needed if you want to work with local files
	            // so it might be okay to remove the whole try/catch block and just use
	            // imageData = context.getImageData(top_x, top_y, width, height);
	            try {
	                netscape.security.PrivilegeManager.enablePrivilege("UniversalBrowserRead");
	                imageData = context.getImageData(top_x, top_y, width, height);
	            } catch(e) {
	                alert("Cannot access local image");
	                throw new Error("unable to access local image data: " + e);
	                return;
	            }
	        }
	    } catch(e) {
	        alert("Cannot access image");
	        throw new Error("unable to access image data: " + e);
	    }

	    return imageData;
	}

	function processCanvasRGBA(canvas, top_x, top_y, width, height, radius)
	{
	    if (isNaN(radius) || radius < 1) return;
	    radius |= 0;

	    var imageData = getImageDataFromCanvas(canvas, top_x, top_y, width, height);

	    imageData = processImageDataRGBA(imageData, top_x, top_y, width, height, radius);

	    canvas.getContext('2d').putImageData(imageData, top_x, top_y);
	}

	function processImageDataRGBA(imageData, top_x, top_y, width, height, radius)
	{
	    var pixels = imageData.data;

	    var x, y, i, p, yp, yi, yw, r_sum, g_sum, b_sum, a_sum,
	        r_out_sum, g_out_sum, b_out_sum, a_out_sum,
	        r_in_sum, g_in_sum, b_in_sum, a_in_sum,
	        pr, pg, pb, pa, rbs;

	    var div = radius + radius + 1;
	    var w4 = width << 2;
	    var widthMinus1  = width - 1;
	    var heightMinus1 = height - 1;
	    var radiusPlus1  = radius + 1;
	    var sumFactor = radiusPlus1 * (radiusPlus1 + 1) / 2;

	    var stackStart = new BlurStack();
	    var stack = stackStart;
	    for (i = 1; i < div; i++)
	    {
	        stack = stack.next = new BlurStack();
	        if (i == radiusPlus1) var stackEnd = stack;
	    }
	    stack.next = stackStart;
	    var stackIn = null;
	    var stackOut = null;

	    yw = yi = 0;

	    var mul_sum = mul_table[radius];
	    var shg_sum = shg_table[radius];

	    for (y = 0; y < height; y++)
	    {
	        r_in_sum = g_in_sum = b_in_sum = a_in_sum = r_sum = g_sum = b_sum = a_sum = 0;

	        r_out_sum = radiusPlus1 * (pr = pixels[yi]);
	        g_out_sum = radiusPlus1 * (pg = pixels[yi+1]);
	        b_out_sum = radiusPlus1 * (pb = pixels[yi+2]);
	        a_out_sum = radiusPlus1 * (pa = pixels[yi+3]);

	        r_sum += sumFactor * pr;
	        g_sum += sumFactor * pg;
	        b_sum += sumFactor * pb;
	        a_sum += sumFactor * pa;

	        stack = stackStart;

	        for (i = 0; i < radiusPlus1; i++)
	        {
	            stack.r = pr;
	            stack.g = pg;
	            stack.b = pb;
	            stack.a = pa;
	            stack = stack.next;
	        }

	        for (i = 1; i < radiusPlus1; i++)
	        {
	            p = yi + ((widthMinus1 < i ? widthMinus1 : i) << 2);
	            r_sum += (stack.r = (pr = pixels[p])) * (rbs = radiusPlus1 - i);
	            g_sum += (stack.g = (pg = pixels[p+1])) * rbs;
	            b_sum += (stack.b = (pb = pixels[p+2])) * rbs;
	            a_sum += (stack.a = (pa = pixels[p+3])) * rbs;

	            r_in_sum += pr;
	            g_in_sum += pg;
	            b_in_sum += pb;
	            a_in_sum += pa;

	            stack = stack.next;
	        }


	        stackIn = stackStart;
	        stackOut = stackEnd;
	        for (x = 0; x < width; x++)
	        {
	            pixels[yi+3] = pa = (a_sum * mul_sum) >> shg_sum;
	            if (pa != 0)
	            {
	                pa = 255 / pa;
	                pixels[yi]   = ((r_sum * mul_sum) >> shg_sum) * pa;
	                pixels[yi+1] = ((g_sum * mul_sum) >> shg_sum) * pa;
	                pixels[yi+2] = ((b_sum * mul_sum) >> shg_sum) * pa;
	            } else {
	                pixels[yi] = pixels[yi+1] = pixels[yi+2] = 0;
	            }

	            r_sum -= r_out_sum;
	            g_sum -= g_out_sum;
	            b_sum -= b_out_sum;
	            a_sum -= a_out_sum;

	            r_out_sum -= stackIn.r;
	            g_out_sum -= stackIn.g;
	            b_out_sum -= stackIn.b;
	            a_out_sum -= stackIn.a;

	            p =  (yw + ((p = x + radius + 1) < widthMinus1 ? p : widthMinus1)) << 2;

	            r_in_sum += (stackIn.r = pixels[p]);
	            g_in_sum += (stackIn.g = pixels[p+1]);
	            b_in_sum += (stackIn.b = pixels[p+2]);
	            a_in_sum += (stackIn.a = pixels[p+3]);

	            r_sum += r_in_sum;
	            g_sum += g_in_sum;
	            b_sum += b_in_sum;
	            a_sum += a_in_sum;

	            stackIn = stackIn.next;

	            r_out_sum += (pr = stackOut.r);
	            g_out_sum += (pg = stackOut.g);
	            b_out_sum += (pb = stackOut.b);
	            a_out_sum += (pa = stackOut.a);

	            r_in_sum -= pr;
	            g_in_sum -= pg;
	            b_in_sum -= pb;
	            a_in_sum -= pa;

	            stackOut = stackOut.next;

	            yi += 4;
	        }
	        yw += width;
	    }


	    for (x = 0; x < width; x++)
	    {
	        g_in_sum = b_in_sum = a_in_sum = r_in_sum = g_sum = b_sum = a_sum = r_sum = 0;

	        yi = x << 2;
	        r_out_sum = radiusPlus1 * (pr = pixels[yi]);
	        g_out_sum = radiusPlus1 * (pg = pixels[yi+1]);
	        b_out_sum = radiusPlus1 * (pb = pixels[yi+2]);
	        a_out_sum = radiusPlus1 * (pa = pixels[yi+3]);

	        r_sum += sumFactor * pr;
	        g_sum += sumFactor * pg;
	        b_sum += sumFactor * pb;
	        a_sum += sumFactor * pa;

	        stack = stackStart;

	        for (i = 0; i < radiusPlus1; i++)
	        {
	            stack.r = pr;
	            stack.g = pg;
	            stack.b = pb;
	            stack.a = pa;
	            stack = stack.next;
	        }

	        yp = width;

	        for (i = 1; i <= radius; i++)
	        {
	            yi = (yp + x) << 2;

	            r_sum += (stack.r = (pr = pixels[yi])) * (rbs = radiusPlus1 - i);
	            g_sum += (stack.g = (pg = pixels[yi+1])) * rbs;
	            b_sum += (stack.b = (pb = pixels[yi+2])) * rbs;
	            a_sum += (stack.a = (pa = pixels[yi+3])) * rbs;

	            r_in_sum += pr;
	            g_in_sum += pg;
	            b_in_sum += pb;
	            a_in_sum += pa;

	            stack = stack.next;

	            if(i < heightMinus1)
	            {
	                yp += width;
	            }
	        }

	        yi = x;
	        stackIn = stackStart;
	        stackOut = stackEnd;
	        for (y = 0; y < height; y++)
	        {
	            p = yi << 2;
	            pixels[p+3] = pa = (a_sum * mul_sum) >> shg_sum;
	            if (pa > 0)
	            {
	                pa = 255 / pa;
	                pixels[p]   = ((r_sum * mul_sum) >> shg_sum) * pa;
	                pixels[p+1] = ((g_sum * mul_sum) >> shg_sum) * pa;
	                pixels[p+2] = ((b_sum * mul_sum) >> shg_sum) * pa;
	            } else {
	                pixels[p] = pixels[p+1] = pixels[p+2] = 0;
	            }

	            r_sum -= r_out_sum;
	            g_sum -= g_out_sum;
	            b_sum -= b_out_sum;
	            a_sum -= a_out_sum;

	            r_out_sum -= stackIn.r;
	            g_out_sum -= stackIn.g;
	            b_out_sum -= stackIn.b;
	            a_out_sum -= stackIn.a;

	            p = (x + (((p = y + radiusPlus1) < heightMinus1 ? p : heightMinus1) * width)) << 2;

	            r_sum += (r_in_sum += (stackIn.r = pixels[p]));
	            g_sum += (g_in_sum += (stackIn.g = pixels[p+1]));
	            b_sum += (b_in_sum += (stackIn.b = pixels[p+2]));
	            a_sum += (a_in_sum += (stackIn.a = pixels[p+3]));

	            stackIn = stackIn.next;

	            r_out_sum += (pr = stackOut.r);
	            g_out_sum += (pg = stackOut.g);
	            b_out_sum += (pb = stackOut.b);
	            a_out_sum += (pa = stackOut.a);

	            r_in_sum -= pr;
	            g_in_sum -= pg;
	            b_in_sum -= pb;
	            a_in_sum -= pa;

	            stackOut = stackOut.next;

	            yi += width;
	        }
	    }
	    return imageData;
	}

	function processCanvasRGB(canvas, top_x, top_y, width, height, radius)
	{
	    if (isNaN(radius) || radius < 1) return;
	    radius |= 0;

	    var imageData = getImageDataFromCanvas(canvas, top_x, top_y, width, height);
	    imageData = processImageDataRGB(imageData, top_x, top_y, width, height, radius);

	    canvas.getContext('2d').putImageData(imageData, top_x, top_y);
	}

	function processImageDataRGB(imageData, top_x, top_y, width, height, radius)
	{
	    var pixels = imageData.data;

	    var x, y, i, p, yp, yi, yw, r_sum, g_sum, b_sum,
	        r_out_sum, g_out_sum, b_out_sum,
	        r_in_sum, g_in_sum, b_in_sum,
	        pr, pg, pb, rbs;

	    var div = radius + radius + 1;
	    var w4 = width << 2;
	    var widthMinus1  = width - 1;
	    var heightMinus1 = height - 1;
	    var radiusPlus1  = radius + 1;
	    var sumFactor = radiusPlus1 * (radiusPlus1 + 1) / 2;

	    var stackStart = new BlurStack();
	    var stack = stackStart;
	    for (i = 1; i < div; i++)
	    {
	        stack = stack.next = new BlurStack();
	        if (i == radiusPlus1) var stackEnd = stack;
	    }
	    stack.next = stackStart;
	    var stackIn = null;
	    var stackOut = null;

	    yw = yi = 0;

	    var mul_sum = mul_table[radius];
	    var shg_sum = shg_table[radius];

	    for (y = 0; y < height; y++)
	    {
	        r_in_sum = g_in_sum = b_in_sum = r_sum = g_sum = b_sum = 0;

	        r_out_sum = radiusPlus1 * (pr = pixels[yi]);
	        g_out_sum = radiusPlus1 * (pg = pixels[yi+1]);
	        b_out_sum = radiusPlus1 * (pb = pixels[yi+2]);

	        r_sum += sumFactor * pr;
	        g_sum += sumFactor * pg;
	        b_sum += sumFactor * pb;

	        stack = stackStart;

	        for (i = 0; i < radiusPlus1; i++)
	        {
	            stack.r = pr;
	            stack.g = pg;
	            stack.b = pb;
	            stack = stack.next;
	        }

	        for (i = 1; i < radiusPlus1; i++)
	        {
	            p = yi + ((widthMinus1 < i ? widthMinus1 : i) << 2);
	            r_sum += (stack.r = (pr = pixels[p])) * (rbs = radiusPlus1 - i);
	            g_sum += (stack.g = (pg = pixels[p+1])) * rbs;
	            b_sum += (stack.b = (pb = pixels[p+2])) * rbs;

	            r_in_sum += pr;
	            g_in_sum += pg;
	            b_in_sum += pb;

	            stack = stack.next;
	        }


	        stackIn = stackStart;
	        stackOut = stackEnd;
	        for (x = 0; x < width; x++)
	        {
	            pixels[yi]   = (r_sum * mul_sum) >> shg_sum;
	            pixels[yi+1] = (g_sum * mul_sum) >> shg_sum;
	            pixels[yi+2] = (b_sum * mul_sum) >> shg_sum;

	            r_sum -= r_out_sum;
	            g_sum -= g_out_sum;
	            b_sum -= b_out_sum;

	            r_out_sum -= stackIn.r;
	            g_out_sum -= stackIn.g;
	            b_out_sum -= stackIn.b;

	            p =  (yw + ((p = x + radius + 1) < widthMinus1 ? p : widthMinus1)) << 2;

	            r_in_sum += (stackIn.r = pixels[p]);
	            g_in_sum += (stackIn.g = pixels[p+1]);
	            b_in_sum += (stackIn.b = pixels[p+2]);

	            r_sum += r_in_sum;
	            g_sum += g_in_sum;
	            b_sum += b_in_sum;

	            stackIn = stackIn.next;

	            r_out_sum += (pr = stackOut.r);
	            g_out_sum += (pg = stackOut.g);
	            b_out_sum += (pb = stackOut.b);

	            r_in_sum -= pr;
	            g_in_sum -= pg;
	            b_in_sum -= pb;

	            stackOut = stackOut.next;

	            yi += 4;
	        }
	        yw += width;
	    }


	    for (x = 0; x < width; x++)
	    {
	        g_in_sum = b_in_sum = r_in_sum = g_sum = b_sum = r_sum = 0;

	        yi = x << 2;
	        r_out_sum = radiusPlus1 * (pr = pixels[yi]);
	        g_out_sum = radiusPlus1 * (pg = pixels[yi+1]);
	        b_out_sum = radiusPlus1 * (pb = pixels[yi+2]);

	        r_sum += sumFactor * pr;
	        g_sum += sumFactor * pg;
	        b_sum += sumFactor * pb;

	        stack = stackStart;

	        for (i = 0; i < radiusPlus1; i++)
	        {
	            stack.r = pr;
	            stack.g = pg;
	            stack.b = pb;
	            stack = stack.next;
	        }

	        yp = width;

	        for (i = 1; i <= radius; i++)
	        {
	            yi = (yp + x) << 2;

	            r_sum += (stack.r = (pr = pixels[yi])) * (rbs = radiusPlus1 - i);
	            g_sum += (stack.g = (pg = pixels[yi+1])) * rbs;
	            b_sum += (stack.b = (pb = pixels[yi+2])) * rbs;

	            r_in_sum += pr;
	            g_in_sum += pg;
	            b_in_sum += pb;

	            stack = stack.next;

	            if(i < heightMinus1)
	            {
	                yp += width;
	            }
	        }

	        yi = x;
	        stackIn = stackStart;
	        stackOut = stackEnd;
	        for (y = 0; y < height; y++)
	        {
	            p = yi << 2;
	            pixels[p]   = (r_sum * mul_sum) >> shg_sum;
	            pixels[p+1] = (g_sum * mul_sum) >> shg_sum;
	            pixels[p+2] = (b_sum * mul_sum) >> shg_sum;

	            r_sum -= r_out_sum;
	            g_sum -= g_out_sum;
	            b_sum -= b_out_sum;

	            r_out_sum -= stackIn.r;
	            g_out_sum -= stackIn.g;
	            b_out_sum -= stackIn.b;

	            p = (x + (((p = y + radiusPlus1) < heightMinus1 ? p : heightMinus1) * width)) << 2;

	            r_sum += (r_in_sum += (stackIn.r = pixels[p]));
	            g_sum += (g_in_sum += (stackIn.g = pixels[p+1]));
	            b_sum += (b_in_sum += (stackIn.b = pixels[p+2]));

	            stackIn = stackIn.next;

	            r_out_sum += (pr = stackOut.r);
	            g_out_sum += (pg = stackOut.g);
	            b_out_sum += (pb = stackOut.b);

	            r_in_sum -= pr;
	            g_in_sum -= pg;
	            b_in_sum -= pb;

	            stackOut = stackOut.next;

	            yi += width;
	        }
	    }

	    return imageData;
	}

	function BlurStack()
	{
	    this.r = 0;
	    this.g = 0;
	    this.b = 0;
	    this.a = 0;
	    this.next = null;
	}

	module.exports = {
	    image: processImage,
	    canvasRGBA: processCanvasRGBA,
	    canvasRGB: processCanvasRGB,
	    imageDataRGBA: processImageDataRGBA,
	    imageDataRGB: processImageDataRGB
	};


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "cbf86da34060f5e81d7d657ea649d92d.jpg"

/***/ }
/******/ ]);