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
/******/ 	__webpack_require__.p = "";

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

	var _interopRequireDefault = __webpack_require__(2)['default'];

	__webpack_require__(3);

	var _FoggyWindow = __webpack_require__(7);

	var _FoggyWindow2 = _interopRequireDefault(_FoggyWindow);

	var UPLOAD_SERVER_URL = 'http://45.55.61.164:5000/upload/url';
	var foggy = new _FoggyWindow2['default']('.foggy-window');

	// default image
	var scenery = new Image();
	scenery.crossOrigin = 'Anonymous';
	scenery.src = 'http://localhost:5000/get/e8881593e82109cdd89341ad82a2c9ee.jpg';
	foggy.setScenery(scenery);

	document.querySelector('#save-button').onclick = function () {
	    foggy.savePic('masterpiece');
	};

	var btnShowInput = document.getElementById('show-input-button');
	var btnUpload = document.getElementById('upload-button');
	var inputUpload = document.getElementById('upload-input');

	btnShowInput.onclick = function (e) {
	    toggleUploadState(true);
	};

	btnUpload.onclick = function (e) {
	    var req = new XMLHttpRequest();
	    var url = inputUpload.value;

	    if (url.length < 1) {
	        return;
	    }

	    // get image on CORS-friendly server
	    req.onreadystatechange = function () {
	        if (req.readyState == 4 && req.responseText) {
	            var response = JSON.parse(req.responseText);
	            var img = new Image();
	            img.crossOrigin = 'Anonymous';
	            img.src = response.new_url;
	            foggy.setScenery(img);

	            toggleUploadState(false);
	        }
	    };

	    var params = 'url=' + url;
	    req.open('POST', UPLOAD_SERVER_URL);
	    req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	    req.send(params);
	};

	function toggleUploadState(showUpload) {
	    if (showUpload) {
	        inputUpload.classList.remove('hidden');
	        btnShowInput.classList.add('hidden');
	        btnUpload.classList.remove('hidden');
	    } else {
	        inputUpload.classList.add('hidden');
	        btnShowInput.classList.remove('hidden');
	        btnUpload.classList.add('hidden');
	    }
	}

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";

	exports["default"] = function (obj) {
	  return obj && obj.__esModule ? obj : {
	    "default": obj
	  };
	};

	exports.__esModule = true;

/***/ },
/* 3 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = __webpack_require__(8)['default'];

	var _classCallCheck = __webpack_require__(12)['default'];

	var _slicedToArray = __webpack_require__(13)['default'];

	var _interopRequireDefault = __webpack_require__(2)['default'];

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _stackblurCanvas = __webpack_require__(52);

	var _stackblurCanvas2 = _interopRequireDefault(_stackblurCanvas);

	var _OverlayWindow = __webpack_require__(53);

	var _OverlayWindow2 = _interopRequireDefault(_OverlayWindow);

	var _Debug = __webpack_require__(54);

	var _Debug2 = _interopRequireDefault(_Debug);

	var _imagesDockJpg = __webpack_require__(55);

	var _imagesDockJpg2 = _interopRequireDefault(_imagesDockJpg);

	var FoggyWindow = (function () {
	    function FoggyWindow(query) {
	        var _this = this;

	        _classCallCheck(this, FoggyWindow);

	        this['debugger'] = new _Debug2['default']();

	        // setup canvas
	        this.canvas = document.querySelector(query);
	        this.overlay = new _OverlayWindow2['default']();

	        this.context = this.canvas.getContext('2d');
	        this.context.scale(window.devicePixelRatio / 2, window.devicePixelRatio / 2);
	        this.startedDrawing = false;
	        this.blurRadius = 10;
	        this.points = [];
	        this.unblurredImageData = null;

	        var moveListener = function moveListener(event) {
	            return _this.draw(event);
	        };

	        window.onresize = function () {
	            return _this.render();
	        };

	        this.canvas.addEventListener('mousedown', function (event) {
	            //console.log('mousedown')
	            _this.draw(event);
	            _this.canvas.addEventListener('mousemove', moveListener);
	        });
	        this.canvas.addEventListener('touchstart', function (event) {
	            _this.draw(event);
	            _this.canvas.addEventListener('touchmove', moveListener);
	        });
	        this.canvas.addEventListener('mouseup', function (event) {
	            //console.log('mouseup')
	            _this.startedDrawing = false;
	            event.target.removeEventListener('mousemove', moveListener);
	            _this.points = [];
	        });
	        this.canvas.addEventListener('touchend', function (event) {
	            _this.startedDrawing = false;
	            event.target.removeEventListener('touchmove', moveListener);
	            _this.points = [];
	        });
	    }

	    _createClass(FoggyWindow, [{
	        key: 'setScenery',
	        value: function setScenery(scenery) {
	            var _this2 = this;

	            this.scenery = scenery;
	            this.scenery.onload = function () {
	                _this2.render();
	            };
	        }
	    }, {
	        key: 'getImageOffset',
	        value: function getImageOffset(image) {
	            var imgAspectRatio = image.width / image.height;
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

	            return [imgOffsetX, imgOffsetY, imgRenderWidth, imgRenderHeight];
	        }
	    }, {
	        key: 'render',
	        value: function render() {

	            this.canvas.width = window.innerWidth;
	            this.canvas.height = window.innerHeight;

	            this.overlay.setSize(window.innerWidth, window.innerHeight);

	            this.startedDrawing = false;

	            var _getImageOffset = this.getImageOffset(this.scenery);

	            var _getImageOffset2 = _slicedToArray(_getImageOffset, 4);

	            var imgOffsetX = _getImageOffset2[0];
	            var imgOffsetY = _getImageOffset2[1];
	            var imgRenderWidth = _getImageOffset2[2];
	            var imgRenderHeight = _getImageOffset2[3];

	            this.context.drawImage(this.scenery, imgOffsetX, imgOffsetY, imgRenderWidth, imgRenderHeight);

	            // save unblurred image
	            this.unblurredImageData = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);

	            this.lighten();
	            this.blur(this.blurRadius);
	        }
	    }, {
	        key: 'lighten',
	        value: function lighten() {
	            this.context.fillStyle = 'rgba(255,255,255,0.1)';
	            this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
	            this.context.stroke();
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

	            var context = this.overlay.context;

	            if ('clientX' in event) {
	                x = event.clientX;
	                y = event.clientY;
	            } else if ('touches' in event) {
	                x = event.touches[0].clientX;
	                y = event.touches[0].clientY;
	            } else {
	                console.error('Unknown event sent to draw function');
	            }

	            context.lineCap = 'round';
	            context.lineWidth = 35;
	            context.strokeStyle = 'rgba(255,0,0,0.05)';

	            if (!this.startedDrawing) {
	                context.beginPath();
	                context.moveTo(x, y);
	                this.startedDrawing = true;
	                context.lineTo(x + 1, y + 1);
	            } else {
	                var previousPoint = this.points[this.points.length - 1];
	                var x0 = previousPoint[0]; //x coordinate or previous point in path
	                var y0 = previousPoint[1];
	                var midpointX = parseInt((x + x0) / 2);
	                var midpointY = parseInt((y + y0) / 2);

	                context.quadraticCurveTo(midpointX, midpointY, x, y);

	                //// this.debugger.point(this.overlayContext, midpointX, midpointY);
	            }

	            context.stroke();

	            var overlayImgData = context.getImageData(0, 0, this.overlay.canvas.width, this.overlay.canvas.height);
	            this.drawClear(overlayImgData);
	            this.points.push([x, y]);
	        }
	    }, {
	        key: 'drawClear',
	        value: function drawClear(imgData) {
	            var clearParts = this.overlay.makeClear(this.unblurredImageData);
	            this.context.drawImage(this.overlay.canvas, 0, 0);
	        }
	    }, {
	        key: 'savePic',
	        value: function savePic(filename) {
	            var link = document.createElement('a');
	            link.download = filename;
	            link.href = this.canvas.toDataURL();
	            link.click();
	        }
	    }]);

	    return FoggyWindow;
	})();

	exports['default'] = FoggyWindow;
	module.exports = exports['default'];

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _Object$defineProperty = __webpack_require__(9)["default"];

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
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(10), __esModule: true };

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(11);
	module.exports = function defineProperty(it, key, desc){
	  return $.setDesc(it, key, desc);
	};

/***/ },
/* 11 */
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
/* 12 */
/***/ function(module, exports) {

	"use strict";

	exports["default"] = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

	exports.__esModule = true;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _getIterator = __webpack_require__(14)["default"];

	var _isIterable = __webpack_require__(49)["default"];

	exports["default"] = (function () {
	  function sliceIterator(arr, i) {
	    var _arr = [];
	    var _n = true;
	    var _d = false;
	    var _e = undefined;

	    try {
	      for (var _i = _getIterator(arr), _s; !(_n = (_s = _i.next()).done); _n = true) {
	        _arr.push(_s.value);

	        if (i && _arr.length === i) break;
	      }
	    } catch (err) {
	      _d = true;
	      _e = err;
	    } finally {
	      try {
	        if (!_n && _i["return"]) _i["return"]();
	      } finally {
	        if (_d) throw _e;
	      }
	    }

	    return _arr;
	  }

	  return function (arr, i) {
	    if (Array.isArray(arr)) {
	      return arr;
	    } else if (_isIterable(Object(arr))) {
	      return sliceIterator(arr, i);
	    } else {
	      throw new TypeError("Invalid attempt to destructure non-iterable instance");
	    }
	  };
	})();

	exports.__esModule = true;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(15), __esModule: true };

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(16);
	__webpack_require__(41);
	module.exports = __webpack_require__(44);

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(17);
	var Iterators = __webpack_require__(20);
	Iterators.NodeList = Iterators.HTMLCollection = Iterators.Array;

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var setUnscope = __webpack_require__(18)
	  , step       = __webpack_require__(19)
	  , Iterators  = __webpack_require__(20)
	  , toIObject  = __webpack_require__(21);

	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	__webpack_require__(25)(Array, 'Array', function(iterated, kind){
	  this._t = toIObject(iterated); // target
	  this._i = 0;                   // next index
	  this._k = kind;                // kind
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , kind  = this._k
	    , index = this._i++;
	  if(!O || index >= O.length){
	    this._t = undefined;
	    return step(1);
	  }
	  if(kind == 'keys'  )return step(0, index);
	  if(kind == 'values')return step(0, O[index]);
	  return step(0, [index, O[index]]);
	}, 'values');

	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	Iterators.Arguments = Iterators.Array;

	setUnscope('keys');
	setUnscope('values');
	setUnscope('entries');

/***/ },
/* 18 */
/***/ function(module, exports) {

	module.exports = function(){ /* empty */ };

/***/ },
/* 19 */
/***/ function(module, exports) {

	module.exports = function(done, value){
	  return {value: value, done: !!done};
	};

/***/ },
/* 20 */
/***/ function(module, exports) {

	module.exports = {};

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(22)
	  , defined = __webpack_require__(24);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	// indexed object, fallback for non-array-like ES3 strings
	var cof = __webpack_require__(23);
	module.exports = 0 in Object('z') ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 23 */
/***/ function(module, exports) {

	var toString = {}.toString;

	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 24 */
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY         = __webpack_require__(26)
	  , $def            = __webpack_require__(27)
	  , $redef          = __webpack_require__(30)
	  , hide            = __webpack_require__(31)
	  , has             = __webpack_require__(35)
	  , SYMBOL_ITERATOR = __webpack_require__(36)('iterator')
	  , Iterators       = __webpack_require__(20)
	  , BUGGY           = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
	  , FF_ITERATOR     = '@@iterator'
	  , KEYS            = 'keys'
	  , VALUES          = 'values';
	var returnThis = function(){ return this; };
	module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCE){
	  __webpack_require__(39)(Constructor, NAME, next);
	  var createMethod = function(kind){
	    switch(kind){
	      case KEYS: return function keys(){ return new Constructor(this, kind); };
	      case VALUES: return function values(){ return new Constructor(this, kind); };
	    } return function entries(){ return new Constructor(this, kind); };
	  };
	  var TAG      = NAME + ' Iterator'
	    , proto    = Base.prototype
	    , _native  = proto[SYMBOL_ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
	    , _default = _native || createMethod(DEFAULT)
	    , methods, key;
	  // Fix native
	  if(_native){
	    var IteratorPrototype = __webpack_require__(11).getProto(_default.call(new Base));
	    // Set @@toStringTag to native iterators
	    __webpack_require__(40)(IteratorPrototype, TAG, true);
	    // FF fix
	    if(!LIBRARY && has(proto, FF_ITERATOR))hide(IteratorPrototype, SYMBOL_ITERATOR, returnThis);
	  }
	  // Define iterator
	  if(!LIBRARY || FORCE)hide(proto, SYMBOL_ITERATOR, _default);
	  // Plug for library
	  Iterators[NAME] = _default;
	  Iterators[TAG]  = returnThis;
	  if(DEFAULT){
	    methods = {
	      keys:    IS_SET            ? _default : createMethod(KEYS),
	      values:  DEFAULT == VALUES ? _default : createMethod(VALUES),
	      entries: DEFAULT != VALUES ? _default : createMethod('entries')
	    };
	    if(FORCE)for(key in methods){
	      if(!(key in proto))$redef(proto, key, methods[key]);
	    } else $def($def.P + $def.F * BUGGY, NAME, methods);
	  }
	};

/***/ },
/* 26 */
/***/ function(module, exports) {

	module.exports = true;

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(28)
	  , core      = __webpack_require__(29)
	  , PROTOTYPE = 'prototype';
	var ctx = function(fn, that){
	  return function(){
	    return fn.apply(that, arguments);
	  };
	};
	var $def = function(type, name, source){
	  var key, own, out, exp
	    , isGlobal = type & $def.G
	    , isProto  = type & $def.P
	    , target   = isGlobal ? global : type & $def.S
	        ? global[name] : (global[name] || {})[PROTOTYPE]
	    , exports  = isGlobal ? core : core[name] || (core[name] = {});
	  if(isGlobal)source = name;
	  for(key in source){
	    // contains in native
	    own = !(type & $def.F) && target && key in target;
	    if(own && key in exports)continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    if(isGlobal && typeof target[key] != 'function')exp = source[key];
	    // bind timers to global for call from export context
	    else if(type & $def.B && own)exp = ctx(out, global);
	    // wrap global constructors for prevent change them in library
	    else if(type & $def.W && target[key] == out)!function(C){
	      exp = function(param){
	        return this instanceof C ? new C(param) : C(param);
	      };
	      exp[PROTOTYPE] = C[PROTOTYPE];
	    }(out);
	    else exp = isProto && typeof out == 'function' ? ctx(Function.call, out) : out;
	    // export
	    exports[key] = exp;
	    if(isProto)(exports[PROTOTYPE] || (exports[PROTOTYPE] = {}))[key] = out;
	  }
	};
	// type bitmap
	$def.F = 1;  // forced
	$def.G = 2;  // global
	$def.S = 4;  // static
	$def.P = 8;  // proto
	$def.B = 16; // bind
	$def.W = 32; // wrap
	module.exports = $def;

/***/ },
/* 28 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var UNDEFINED = 'undefined';
	var global = module.exports = typeof window != UNDEFINED && window.Math == Math
	  ? window : typeof self != UNDEFINED && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 29 */
/***/ function(module, exports) {

	var core = module.exports = {version: '1.2.1'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(31);

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	var $          = __webpack_require__(11)
	  , createDesc = __webpack_require__(32);
	module.exports = __webpack_require__(33) ? function(object, key, value){
	  return $.setDesc(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },
/* 32 */
/***/ function(module, exports) {

	module.exports = function(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  };
	};

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(34)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 34 */
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 35 */
/***/ function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	var store  = __webpack_require__(37)('wks')
	  , Symbol = __webpack_require__(28).Symbol;
	module.exports = function(name){
	  return store[name] || (store[name] =
	    Symbol && Symbol[name] || (Symbol || __webpack_require__(38))('Symbol.' + name));
	};

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(28)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 38 */
/***/ function(module, exports) {

	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $ = __webpack_require__(11)
	  , IteratorPrototype = {};

	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(31)(IteratorPrototype, __webpack_require__(36)('iterator'), function(){ return this; });

	module.exports = function(Constructor, NAME, next){
	  Constructor.prototype = $.create(IteratorPrototype, {next: __webpack_require__(32)(1,next)});
	  __webpack_require__(40)(Constructor, NAME + ' Iterator');
	};

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	var has  = __webpack_require__(35)
	  , hide = __webpack_require__(31)
	  , TAG  = __webpack_require__(36)('toStringTag');

	module.exports = function(it, tag, stat){
	  if(it && !has(it = stat ? it : it.prototype, TAG))hide(it, TAG, tag);
	};

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $at  = __webpack_require__(42)(true);

	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(25)(String, 'String', function(iterated){
	  this._t = String(iterated); // target
	  this._i = 0;                // next index
	// 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , index = this._i
	    , point;
	  if(index >= O.length)return {value: undefined, done: true};
	  point = $at(O, index);
	  this._i += point.length;
	  return {value: point, done: false};
	});

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	// true  -> String#at
	// false -> String#codePointAt
	var toInteger = __webpack_require__(43)
	  , defined   = __webpack_require__(24);
	module.exports = function(TO_STRING){
	  return function(that, pos){
	    var s = String(defined(that))
	      , i = toInteger(pos)
	      , l = s.length
	      , a, b;
	    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l
	      || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	        ? TO_STRING ? s.charAt(i) : a
	        : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

/***/ },
/* 43 */
/***/ function(module, exports) {

	// 7.1.4 ToInteger
	var ceil  = Math.ceil
	  , floor = Math.floor;
	module.exports = function(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	var anObject = __webpack_require__(45)
	  , get      = __webpack_require__(47);
	module.exports = __webpack_require__(29).getIterator = function(it){
	  var iterFn = get(it);
	  if(typeof iterFn != 'function')throw TypeError(it + ' is not iterable!');
	  return anObject(iterFn.call(it));
	};

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(46);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 46 */
/***/ function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(48)
	  , ITERATOR  = __webpack_require__(36)('iterator')
	  , Iterators = __webpack_require__(20);
	module.exports = __webpack_require__(29).getIteratorMethod = function(it){
	  if(it != undefined)return it[ITERATOR] || it['@@iterator'] || Iterators[classof(it)];
	};

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	// getting tag from 19.1.3.6 Object.prototype.toString()
	var cof = __webpack_require__(23)
	  , TAG = __webpack_require__(36)('toStringTag')
	  // ES3 wrong here
	  , ARG = cof(function(){ return arguments; }()) == 'Arguments';

	module.exports = function(it){
	  var O, T, B;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (T = (O = Object(it))[TAG]) == 'string' ? T
	    // builtinTag case
	    : ARG ? cof(O)
	    // ES3 arguments fallback
	    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	};

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(50), __esModule: true };

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(16);
	__webpack_require__(41);
	module.exports = __webpack_require__(51);

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(48)
	  , ITERATOR  = __webpack_require__(36)('iterator')
	  , Iterators = __webpack_require__(20);
	module.exports = __webpack_require__(29).isIterable = function(it){
	  var O = Object(it);
	  return ITERATOR in O || '@@iterator' in O || Iterators.hasOwnProperty(classof(O));
	};

/***/ },
/* 52 */
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
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = __webpack_require__(8)['default'];

	var _classCallCheck = __webpack_require__(12)['default'];

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var OverlayWindow = (function () {
	    function OverlayWindow() {
	        _classCallCheck(this, OverlayWindow);

	        this.canvas = document.createElement('canvas');
	        this.context = this.canvas.getContext('2d');

	        //// debug
	        //document.querySelector('body').appendChild(this.canvas);
	    }

	    _createClass(OverlayWindow, [{
	        key: 'setSize',
	        value: function setSize(width, height) {
	            this.canvas.width = width;
	            this.canvas.height = height;
	        }

	        // generate clear parts given image data of unblurred image
	    }, {
	        key: 'makeClear',
	        value: function makeClear(unblurredImageData) {
	            var data = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height).data;
	            var pixels = new Uint8ClampedArray(data.length);

	            for (var i = 0; i < data.length; i = i + 4) {
	                if (data[i] != 0) {
	                    pixels[i] = unblurredImageData.data[i];
	                    pixels[i + 1] = unblurredImageData.data[i + 1];
	                    pixels[i + 2] = unblurredImageData.data[i + 2];
	                    pixels[i + 3] = data[i + 3];
	                }
	            }

	            var overlay = new ImageData(pixels, this.canvas.width, this.canvas.height);
	            this.context.putImageData(overlay, 0, 0);

	            return this.canvas;
	        }
	    }]);

	    return OverlayWindow;
	})();

	exports['default'] = OverlayWindow;
	module.exports = exports['default'];

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = __webpack_require__(8)['default'];

	var _classCallCheck = __webpack_require__(12)['default'];

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var Debug = (function () {
	    function Debug() {
	        _classCallCheck(this, Debug);
	    }

	    _createClass(Debug, [{
	        key: 'point',
	        value: function point(context, x, y) {
	            context.fillStyle = '#ff0022';
	            context.fillRect(x, y, 3, 3);
	            context.stroke();
	            console.log(x, y);
	        }
	    }]);

	    return Debug;
	})();

	exports['default'] = Debug;
	module.exports = exports['default'];

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "cbf86da34060f5e81d7d657ea649d92d.jpg"

/***/ }
/******/ ]);