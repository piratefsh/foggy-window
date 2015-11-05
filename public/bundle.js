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

	module.exports = __webpack_require__(14);


/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _interopRequireDefault = __webpack_require__(15)['default'];

	__webpack_require__(16);

	__webpack_require__(20);

	var _componentsFoggyWindow = __webpack_require__(30);

	var _componentsFoggyWindow2 = _interopRequireDefault(_componentsFoggyWindow);

	var _componentsSceneryImages = __webpack_require__(79);

	var _componentsSceneryImages2 = _interopRequireDefault(_componentsSceneryImages);

	var UPLOAD_SERVER_URL = 'http://45.55.61.164:5000/upload/file';
	var foggy = new _componentsFoggyWindow2['default']('.foggy-window');
	var btnSave = document.querySelector('#save-button');
	var btnShowInput = document.getElementById('show-input-button');
	var btnUpload = document.getElementById('upload-button');
	var inputUpload = document.getElementById('upload-input');

	// default image
	var scenery = new Image();
	var randomImage = Math.floor(Math.random() * _componentsSceneryImages2['default'].length);
	scenery.crossOrigin = 'Anonymous';
	scenery.src = _componentsSceneryImages2['default'][randomImage];
	foggy.setScenery(scenery);

	btnSave.onclick = function (e) {
	    foggy.savePic('masterpiece');
	};

	btnShowInput.onclick = function (e) {
	    toggleUploadState(true);
	};

	btnUpload.onclick = function (e) {
	    var req = new XMLHttpRequest();
	    var file = inputUpload.files[0];

	    if (!file) {
	        return;
	    }

	    // get image on CORS-friendly server
	    req.onreadystatechange = function () {
	        if (req.readyState == 4 && req.responseText) {
	            var response = JSON.parse(req.responseText);

	            if (response.success) {
	                var img = new Image();
	                img.crossOrigin = 'Anonymous';
	                img.src = response.new_url;
	                foggy.setScenery(img);

	                toggleUploadState(false);
	            } else {
	                window.alert('Invalid image. Please upload image with .jpg, .gif or .png extensions only');
	            }
	        }
	    };

	    var formData = new FormData();
	    formData.append("file", file);
	    req.open('POST', UPLOAD_SERVER_URL);
	    req.send(formData);
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
/* 15 */
/***/ function(module, exports) {

	"use strict";

	exports["default"] = function (obj) {
	  return obj && obj.__esModule ? obj : {
	    "default": obj
	  };
	};

	exports.__esModule = true;

/***/ },
/* 16 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 17 */,
/* 18 */,
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0;

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function createStyleElement() {
		var styleElement = document.createElement("style");
		var head = getHeadElement();
		styleElement.type = "text/css";
		head.appendChild(styleElement);
		return styleElement;
	}

	function createLinkElement() {
		var linkElement = document.createElement("link");
		var head = getHeadElement();
		linkElement.rel = "stylesheet";
		head.appendChild(linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement());
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement();
			update = updateLink.bind(null, styleElement);
			remove = function() {
				styleElement.parentNode.removeChild(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement();
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				styleElement.parentNode.removeChild(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(21);


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(22);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(19)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./node_modules/css-loader/index.js!./node_modules/less-loader/index.js!./font-awesome-styles.loader.js!./font-awesome.config.js", function() {
				var newContent = require("!!./node_modules/css-loader/index.js!./node_modules/less-loader/index.js!./font-awesome-styles.loader.js!./font-awesome.config.js");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(23)();
	// imports


	// module
	exports.push([module.id, ".fa-border {\n  padding: .2em .25em .15em;\n  border: solid 0.08em #eee;\n  border-radius: .1em;\n}\n.fa-pull-left {\n  float: left;\n}\n.fa-pull-right {\n  float: right;\n}\n.fa.fa-pull-left {\n  margin-right: .3em;\n}\n.fa.fa-pull-right {\n  margin-left: .3em;\n}\n/* Deprecated as of 4.4.0 */\n.pull-right {\n  float: right;\n}\n.pull-left {\n  float: left;\n}\n.fa.pull-left {\n  margin-right: .3em;\n}\n.fa.pull-right {\n  margin-left: .3em;\n}\n.fa {\n  display: inline-block;\n  font: normal normal normal 14px/1 FontAwesome;\n  font-size: inherit;\n  text-rendering: auto;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n.fa-fw {\n  width: 1.28571429em;\n  text-align: center;\n}\n/* Font Awesome uses the Unicode Private Use Area (PUA) to ensure screen\n   readers do not read off random characters that represent icons */\n.fa-glass:before {\n  content: \"\\F000\";\n}\n.fa-music:before {\n  content: \"\\F001\";\n}\n.fa-search:before {\n  content: \"\\F002\";\n}\n.fa-envelope-o:before {\n  content: \"\\F003\";\n}\n.fa-heart:before {\n  content: \"\\F004\";\n}\n.fa-star:before {\n  content: \"\\F005\";\n}\n.fa-star-o:before {\n  content: \"\\F006\";\n}\n.fa-user:before {\n  content: \"\\F007\";\n}\n.fa-film:before {\n  content: \"\\F008\";\n}\n.fa-th-large:before {\n  content: \"\\F009\";\n}\n.fa-th:before {\n  content: \"\\F00A\";\n}\n.fa-th-list:before {\n  content: \"\\F00B\";\n}\n.fa-check:before {\n  content: \"\\F00C\";\n}\n.fa-remove:before,\n.fa-close:before,\n.fa-times:before {\n  content: \"\\F00D\";\n}\n.fa-search-plus:before {\n  content: \"\\F00E\";\n}\n.fa-search-minus:before {\n  content: \"\\F010\";\n}\n.fa-power-off:before {\n  content: \"\\F011\";\n}\n.fa-signal:before {\n  content: \"\\F012\";\n}\n.fa-gear:before,\n.fa-cog:before {\n  content: \"\\F013\";\n}\n.fa-trash-o:before {\n  content: \"\\F014\";\n}\n.fa-home:before {\n  content: \"\\F015\";\n}\n.fa-file-o:before {\n  content: \"\\F016\";\n}\n.fa-clock-o:before {\n  content: \"\\F017\";\n}\n.fa-road:before {\n  content: \"\\F018\";\n}\n.fa-download:before {\n  content: \"\\F019\";\n}\n.fa-arrow-circle-o-down:before {\n  content: \"\\F01A\";\n}\n.fa-arrow-circle-o-up:before {\n  content: \"\\F01B\";\n}\n.fa-inbox:before {\n  content: \"\\F01C\";\n}\n.fa-play-circle-o:before {\n  content: \"\\F01D\";\n}\n.fa-rotate-right:before,\n.fa-repeat:before {\n  content: \"\\F01E\";\n}\n.fa-refresh:before {\n  content: \"\\F021\";\n}\n.fa-list-alt:before {\n  content: \"\\F022\";\n}\n.fa-lock:before {\n  content: \"\\F023\";\n}\n.fa-flag:before {\n  content: \"\\F024\";\n}\n.fa-headphones:before {\n  content: \"\\F025\";\n}\n.fa-volume-off:before {\n  content: \"\\F026\";\n}\n.fa-volume-down:before {\n  content: \"\\F027\";\n}\n.fa-volume-up:before {\n  content: \"\\F028\";\n}\n.fa-qrcode:before {\n  content: \"\\F029\";\n}\n.fa-barcode:before {\n  content: \"\\F02A\";\n}\n.fa-tag:before {\n  content: \"\\F02B\";\n}\n.fa-tags:before {\n  content: \"\\F02C\";\n}\n.fa-book:before {\n  content: \"\\F02D\";\n}\n.fa-bookmark:before {\n  content: \"\\F02E\";\n}\n.fa-print:before {\n  content: \"\\F02F\";\n}\n.fa-camera:before {\n  content: \"\\F030\";\n}\n.fa-font:before {\n  content: \"\\F031\";\n}\n.fa-bold:before {\n  content: \"\\F032\";\n}\n.fa-italic:before {\n  content: \"\\F033\";\n}\n.fa-text-height:before {\n  content: \"\\F034\";\n}\n.fa-text-width:before {\n  content: \"\\F035\";\n}\n.fa-align-left:before {\n  content: \"\\F036\";\n}\n.fa-align-center:before {\n  content: \"\\F037\";\n}\n.fa-align-right:before {\n  content: \"\\F038\";\n}\n.fa-align-justify:before {\n  content: \"\\F039\";\n}\n.fa-list:before {\n  content: \"\\F03A\";\n}\n.fa-dedent:before,\n.fa-outdent:before {\n  content: \"\\F03B\";\n}\n.fa-indent:before {\n  content: \"\\F03C\";\n}\n.fa-video-camera:before {\n  content: \"\\F03D\";\n}\n.fa-photo:before,\n.fa-image:before,\n.fa-picture-o:before {\n  content: \"\\F03E\";\n}\n.fa-pencil:before {\n  content: \"\\F040\";\n}\n.fa-map-marker:before {\n  content: \"\\F041\";\n}\n.fa-adjust:before {\n  content: \"\\F042\";\n}\n.fa-tint:before {\n  content: \"\\F043\";\n}\n.fa-edit:before,\n.fa-pencil-square-o:before {\n  content: \"\\F044\";\n}\n.fa-share-square-o:before {\n  content: \"\\F045\";\n}\n.fa-check-square-o:before {\n  content: \"\\F046\";\n}\n.fa-arrows:before {\n  content: \"\\F047\";\n}\n.fa-step-backward:before {\n  content: \"\\F048\";\n}\n.fa-fast-backward:before {\n  content: \"\\F049\";\n}\n.fa-backward:before {\n  content: \"\\F04A\";\n}\n.fa-play:before {\n  content: \"\\F04B\";\n}\n.fa-pause:before {\n  content: \"\\F04C\";\n}\n.fa-stop:before {\n  content: \"\\F04D\";\n}\n.fa-forward:before {\n  content: \"\\F04E\";\n}\n.fa-fast-forward:before {\n  content: \"\\F050\";\n}\n.fa-step-forward:before {\n  content: \"\\F051\";\n}\n.fa-eject:before {\n  content: \"\\F052\";\n}\n.fa-chevron-left:before {\n  content: \"\\F053\";\n}\n.fa-chevron-right:before {\n  content: \"\\F054\";\n}\n.fa-plus-circle:before {\n  content: \"\\F055\";\n}\n.fa-minus-circle:before {\n  content: \"\\F056\";\n}\n.fa-times-circle:before {\n  content: \"\\F057\";\n}\n.fa-check-circle:before {\n  content: \"\\F058\";\n}\n.fa-question-circle:before {\n  content: \"\\F059\";\n}\n.fa-info-circle:before {\n  content: \"\\F05A\";\n}\n.fa-crosshairs:before {\n  content: \"\\F05B\";\n}\n.fa-times-circle-o:before {\n  content: \"\\F05C\";\n}\n.fa-check-circle-o:before {\n  content: \"\\F05D\";\n}\n.fa-ban:before {\n  content: \"\\F05E\";\n}\n.fa-arrow-left:before {\n  content: \"\\F060\";\n}\n.fa-arrow-right:before {\n  content: \"\\F061\";\n}\n.fa-arrow-up:before {\n  content: \"\\F062\";\n}\n.fa-arrow-down:before {\n  content: \"\\F063\";\n}\n.fa-mail-forward:before,\n.fa-share:before {\n  content: \"\\F064\";\n}\n.fa-expand:before {\n  content: \"\\F065\";\n}\n.fa-compress:before {\n  content: \"\\F066\";\n}\n.fa-plus:before {\n  content: \"\\F067\";\n}\n.fa-minus:before {\n  content: \"\\F068\";\n}\n.fa-asterisk:before {\n  content: \"\\F069\";\n}\n.fa-exclamation-circle:before {\n  content: \"\\F06A\";\n}\n.fa-gift:before {\n  content: \"\\F06B\";\n}\n.fa-leaf:before {\n  content: \"\\F06C\";\n}\n.fa-fire:before {\n  content: \"\\F06D\";\n}\n.fa-eye:before {\n  content: \"\\F06E\";\n}\n.fa-eye-slash:before {\n  content: \"\\F070\";\n}\n.fa-warning:before,\n.fa-exclamation-triangle:before {\n  content: \"\\F071\";\n}\n.fa-plane:before {\n  content: \"\\F072\";\n}\n.fa-calendar:before {\n  content: \"\\F073\";\n}\n.fa-random:before {\n  content: \"\\F074\";\n}\n.fa-comment:before {\n  content: \"\\F075\";\n}\n.fa-magnet:before {\n  content: \"\\F076\";\n}\n.fa-chevron-up:before {\n  content: \"\\F077\";\n}\n.fa-chevron-down:before {\n  content: \"\\F078\";\n}\n.fa-retweet:before {\n  content: \"\\F079\";\n}\n.fa-shopping-cart:before {\n  content: \"\\F07A\";\n}\n.fa-folder:before {\n  content: \"\\F07B\";\n}\n.fa-folder-open:before {\n  content: \"\\F07C\";\n}\n.fa-arrows-v:before {\n  content: \"\\F07D\";\n}\n.fa-arrows-h:before {\n  content: \"\\F07E\";\n}\n.fa-bar-chart-o:before,\n.fa-bar-chart:before {\n  content: \"\\F080\";\n}\n.fa-twitter-square:before {\n  content: \"\\F081\";\n}\n.fa-facebook-square:before {\n  content: \"\\F082\";\n}\n.fa-camera-retro:before {\n  content: \"\\F083\";\n}\n.fa-key:before {\n  content: \"\\F084\";\n}\n.fa-gears:before,\n.fa-cogs:before {\n  content: \"\\F085\";\n}\n.fa-comments:before {\n  content: \"\\F086\";\n}\n.fa-thumbs-o-up:before {\n  content: \"\\F087\";\n}\n.fa-thumbs-o-down:before {\n  content: \"\\F088\";\n}\n.fa-star-half:before {\n  content: \"\\F089\";\n}\n.fa-heart-o:before {\n  content: \"\\F08A\";\n}\n.fa-sign-out:before {\n  content: \"\\F08B\";\n}\n.fa-linkedin-square:before {\n  content: \"\\F08C\";\n}\n.fa-thumb-tack:before {\n  content: \"\\F08D\";\n}\n.fa-external-link:before {\n  content: \"\\F08E\";\n}\n.fa-sign-in:before {\n  content: \"\\F090\";\n}\n.fa-trophy:before {\n  content: \"\\F091\";\n}\n.fa-github-square:before {\n  content: \"\\F092\";\n}\n.fa-upload:before {\n  content: \"\\F093\";\n}\n.fa-lemon-o:before {\n  content: \"\\F094\";\n}\n.fa-phone:before {\n  content: \"\\F095\";\n}\n.fa-square-o:before {\n  content: \"\\F096\";\n}\n.fa-bookmark-o:before {\n  content: \"\\F097\";\n}\n.fa-phone-square:before {\n  content: \"\\F098\";\n}\n.fa-twitter:before {\n  content: \"\\F099\";\n}\n.fa-facebook-f:before,\n.fa-facebook:before {\n  content: \"\\F09A\";\n}\n.fa-github:before {\n  content: \"\\F09B\";\n}\n.fa-unlock:before {\n  content: \"\\F09C\";\n}\n.fa-credit-card:before {\n  content: \"\\F09D\";\n}\n.fa-feed:before,\n.fa-rss:before {\n  content: \"\\F09E\";\n}\n.fa-hdd-o:before {\n  content: \"\\F0A0\";\n}\n.fa-bullhorn:before {\n  content: \"\\F0A1\";\n}\n.fa-bell:before {\n  content: \"\\F0F3\";\n}\n.fa-certificate:before {\n  content: \"\\F0A3\";\n}\n.fa-hand-o-right:before {\n  content: \"\\F0A4\";\n}\n.fa-hand-o-left:before {\n  content: \"\\F0A5\";\n}\n.fa-hand-o-up:before {\n  content: \"\\F0A6\";\n}\n.fa-hand-o-down:before {\n  content: \"\\F0A7\";\n}\n.fa-arrow-circle-left:before {\n  content: \"\\F0A8\";\n}\n.fa-arrow-circle-right:before {\n  content: \"\\F0A9\";\n}\n.fa-arrow-circle-up:before {\n  content: \"\\F0AA\";\n}\n.fa-arrow-circle-down:before {\n  content: \"\\F0AB\";\n}\n.fa-globe:before {\n  content: \"\\F0AC\";\n}\n.fa-wrench:before {\n  content: \"\\F0AD\";\n}\n.fa-tasks:before {\n  content: \"\\F0AE\";\n}\n.fa-filter:before {\n  content: \"\\F0B0\";\n}\n.fa-briefcase:before {\n  content: \"\\F0B1\";\n}\n.fa-arrows-alt:before {\n  content: \"\\F0B2\";\n}\n.fa-group:before,\n.fa-users:before {\n  content: \"\\F0C0\";\n}\n.fa-chain:before,\n.fa-link:before {\n  content: \"\\F0C1\";\n}\n.fa-cloud:before {\n  content: \"\\F0C2\";\n}\n.fa-flask:before {\n  content: \"\\F0C3\";\n}\n.fa-cut:before,\n.fa-scissors:before {\n  content: \"\\F0C4\";\n}\n.fa-copy:before,\n.fa-files-o:before {\n  content: \"\\F0C5\";\n}\n.fa-paperclip:before {\n  content: \"\\F0C6\";\n}\n.fa-save:before,\n.fa-floppy-o:before {\n  content: \"\\F0C7\";\n}\n.fa-square:before {\n  content: \"\\F0C8\";\n}\n.fa-navicon:before,\n.fa-reorder:before,\n.fa-bars:before {\n  content: \"\\F0C9\";\n}\n.fa-list-ul:before {\n  content: \"\\F0CA\";\n}\n.fa-list-ol:before {\n  content: \"\\F0CB\";\n}\n.fa-strikethrough:before {\n  content: \"\\F0CC\";\n}\n.fa-underline:before {\n  content: \"\\F0CD\";\n}\n.fa-table:before {\n  content: \"\\F0CE\";\n}\n.fa-magic:before {\n  content: \"\\F0D0\";\n}\n.fa-truck:before {\n  content: \"\\F0D1\";\n}\n.fa-pinterest:before {\n  content: \"\\F0D2\";\n}\n.fa-pinterest-square:before {\n  content: \"\\F0D3\";\n}\n.fa-google-plus-square:before {\n  content: \"\\F0D4\";\n}\n.fa-google-plus:before {\n  content: \"\\F0D5\";\n}\n.fa-money:before {\n  content: \"\\F0D6\";\n}\n.fa-caret-down:before {\n  content: \"\\F0D7\";\n}\n.fa-caret-up:before {\n  content: \"\\F0D8\";\n}\n.fa-caret-left:before {\n  content: \"\\F0D9\";\n}\n.fa-caret-right:before {\n  content: \"\\F0DA\";\n}\n.fa-columns:before {\n  content: \"\\F0DB\";\n}\n.fa-unsorted:before,\n.fa-sort:before {\n  content: \"\\F0DC\";\n}\n.fa-sort-down:before,\n.fa-sort-desc:before {\n  content: \"\\F0DD\";\n}\n.fa-sort-up:before,\n.fa-sort-asc:before {\n  content: \"\\F0DE\";\n}\n.fa-envelope:before {\n  content: \"\\F0E0\";\n}\n.fa-linkedin:before {\n  content: \"\\F0E1\";\n}\n.fa-rotate-left:before,\n.fa-undo:before {\n  content: \"\\F0E2\";\n}\n.fa-legal:before,\n.fa-gavel:before {\n  content: \"\\F0E3\";\n}\n.fa-dashboard:before,\n.fa-tachometer:before {\n  content: \"\\F0E4\";\n}\n.fa-comment-o:before {\n  content: \"\\F0E5\";\n}\n.fa-comments-o:before {\n  content: \"\\F0E6\";\n}\n.fa-flash:before,\n.fa-bolt:before {\n  content: \"\\F0E7\";\n}\n.fa-sitemap:before {\n  content: \"\\F0E8\";\n}\n.fa-umbrella:before {\n  content: \"\\F0E9\";\n}\n.fa-paste:before,\n.fa-clipboard:before {\n  content: \"\\F0EA\";\n}\n.fa-lightbulb-o:before {\n  content: \"\\F0EB\";\n}\n.fa-exchange:before {\n  content: \"\\F0EC\";\n}\n.fa-cloud-download:before {\n  content: \"\\F0ED\";\n}\n.fa-cloud-upload:before {\n  content: \"\\F0EE\";\n}\n.fa-user-md:before {\n  content: \"\\F0F0\";\n}\n.fa-stethoscope:before {\n  content: \"\\F0F1\";\n}\n.fa-suitcase:before {\n  content: \"\\F0F2\";\n}\n.fa-bell-o:before {\n  content: \"\\F0A2\";\n}\n.fa-coffee:before {\n  content: \"\\F0F4\";\n}\n.fa-cutlery:before {\n  content: \"\\F0F5\";\n}\n.fa-file-text-o:before {\n  content: \"\\F0F6\";\n}\n.fa-building-o:before {\n  content: \"\\F0F7\";\n}\n.fa-hospital-o:before {\n  content: \"\\F0F8\";\n}\n.fa-ambulance:before {\n  content: \"\\F0F9\";\n}\n.fa-medkit:before {\n  content: \"\\F0FA\";\n}\n.fa-fighter-jet:before {\n  content: \"\\F0FB\";\n}\n.fa-beer:before {\n  content: \"\\F0FC\";\n}\n.fa-h-square:before {\n  content: \"\\F0FD\";\n}\n.fa-plus-square:before {\n  content: \"\\F0FE\";\n}\n.fa-angle-double-left:before {\n  content: \"\\F100\";\n}\n.fa-angle-double-right:before {\n  content: \"\\F101\";\n}\n.fa-angle-double-up:before {\n  content: \"\\F102\";\n}\n.fa-angle-double-down:before {\n  content: \"\\F103\";\n}\n.fa-angle-left:before {\n  content: \"\\F104\";\n}\n.fa-angle-right:before {\n  content: \"\\F105\";\n}\n.fa-angle-up:before {\n  content: \"\\F106\";\n}\n.fa-angle-down:before {\n  content: \"\\F107\";\n}\n.fa-desktop:before {\n  content: \"\\F108\";\n}\n.fa-laptop:before {\n  content: \"\\F109\";\n}\n.fa-tablet:before {\n  content: \"\\F10A\";\n}\n.fa-mobile-phone:before,\n.fa-mobile:before {\n  content: \"\\F10B\";\n}\n.fa-circle-o:before {\n  content: \"\\F10C\";\n}\n.fa-quote-left:before {\n  content: \"\\F10D\";\n}\n.fa-quote-right:before {\n  content: \"\\F10E\";\n}\n.fa-spinner:before {\n  content: \"\\F110\";\n}\n.fa-circle:before {\n  content: \"\\F111\";\n}\n.fa-mail-reply:before,\n.fa-reply:before {\n  content: \"\\F112\";\n}\n.fa-github-alt:before {\n  content: \"\\F113\";\n}\n.fa-folder-o:before {\n  content: \"\\F114\";\n}\n.fa-folder-open-o:before {\n  content: \"\\F115\";\n}\n.fa-smile-o:before {\n  content: \"\\F118\";\n}\n.fa-frown-o:before {\n  content: \"\\F119\";\n}\n.fa-meh-o:before {\n  content: \"\\F11A\";\n}\n.fa-gamepad:before {\n  content: \"\\F11B\";\n}\n.fa-keyboard-o:before {\n  content: \"\\F11C\";\n}\n.fa-flag-o:before {\n  content: \"\\F11D\";\n}\n.fa-flag-checkered:before {\n  content: \"\\F11E\";\n}\n.fa-terminal:before {\n  content: \"\\F120\";\n}\n.fa-code:before {\n  content: \"\\F121\";\n}\n.fa-mail-reply-all:before,\n.fa-reply-all:before {\n  content: \"\\F122\";\n}\n.fa-star-half-empty:before,\n.fa-star-half-full:before,\n.fa-star-half-o:before {\n  content: \"\\F123\";\n}\n.fa-location-arrow:before {\n  content: \"\\F124\";\n}\n.fa-crop:before {\n  content: \"\\F125\";\n}\n.fa-code-fork:before {\n  content: \"\\F126\";\n}\n.fa-unlink:before,\n.fa-chain-broken:before {\n  content: \"\\F127\";\n}\n.fa-question:before {\n  content: \"\\F128\";\n}\n.fa-info:before {\n  content: \"\\F129\";\n}\n.fa-exclamation:before {\n  content: \"\\F12A\";\n}\n.fa-superscript:before {\n  content: \"\\F12B\";\n}\n.fa-subscript:before {\n  content: \"\\F12C\";\n}\n.fa-eraser:before {\n  content: \"\\F12D\";\n}\n.fa-puzzle-piece:before {\n  content: \"\\F12E\";\n}\n.fa-microphone:before {\n  content: \"\\F130\";\n}\n.fa-microphone-slash:before {\n  content: \"\\F131\";\n}\n.fa-shield:before {\n  content: \"\\F132\";\n}\n.fa-calendar-o:before {\n  content: \"\\F133\";\n}\n.fa-fire-extinguisher:before {\n  content: \"\\F134\";\n}\n.fa-rocket:before {\n  content: \"\\F135\";\n}\n.fa-maxcdn:before {\n  content: \"\\F136\";\n}\n.fa-chevron-circle-left:before {\n  content: \"\\F137\";\n}\n.fa-chevron-circle-right:before {\n  content: \"\\F138\";\n}\n.fa-chevron-circle-up:before {\n  content: \"\\F139\";\n}\n.fa-chevron-circle-down:before {\n  content: \"\\F13A\";\n}\n.fa-html5:before {\n  content: \"\\F13B\";\n}\n.fa-css3:before {\n  content: \"\\F13C\";\n}\n.fa-anchor:before {\n  content: \"\\F13D\";\n}\n.fa-unlock-alt:before {\n  content: \"\\F13E\";\n}\n.fa-bullseye:before {\n  content: \"\\F140\";\n}\n.fa-ellipsis-h:before {\n  content: \"\\F141\";\n}\n.fa-ellipsis-v:before {\n  content: \"\\F142\";\n}\n.fa-rss-square:before {\n  content: \"\\F143\";\n}\n.fa-play-circle:before {\n  content: \"\\F144\";\n}\n.fa-ticket:before {\n  content: \"\\F145\";\n}\n.fa-minus-square:before {\n  content: \"\\F146\";\n}\n.fa-minus-square-o:before {\n  content: \"\\F147\";\n}\n.fa-level-up:before {\n  content: \"\\F148\";\n}\n.fa-level-down:before {\n  content: \"\\F149\";\n}\n.fa-check-square:before {\n  content: \"\\F14A\";\n}\n.fa-pencil-square:before {\n  content: \"\\F14B\";\n}\n.fa-external-link-square:before {\n  content: \"\\F14C\";\n}\n.fa-share-square:before {\n  content: \"\\F14D\";\n}\n.fa-compass:before {\n  content: \"\\F14E\";\n}\n.fa-toggle-down:before,\n.fa-caret-square-o-down:before {\n  content: \"\\F150\";\n}\n.fa-toggle-up:before,\n.fa-caret-square-o-up:before {\n  content: \"\\F151\";\n}\n.fa-toggle-right:before,\n.fa-caret-square-o-right:before {\n  content: \"\\F152\";\n}\n.fa-euro:before,\n.fa-eur:before {\n  content: \"\\F153\";\n}\n.fa-gbp:before {\n  content: \"\\F154\";\n}\n.fa-dollar:before,\n.fa-usd:before {\n  content: \"\\F155\";\n}\n.fa-rupee:before,\n.fa-inr:before {\n  content: \"\\F156\";\n}\n.fa-cny:before,\n.fa-rmb:before,\n.fa-yen:before,\n.fa-jpy:before {\n  content: \"\\F157\";\n}\n.fa-ruble:before,\n.fa-rouble:before,\n.fa-rub:before {\n  content: \"\\F158\";\n}\n.fa-won:before,\n.fa-krw:before {\n  content: \"\\F159\";\n}\n.fa-bitcoin:before,\n.fa-btc:before {\n  content: \"\\F15A\";\n}\n.fa-file:before {\n  content: \"\\F15B\";\n}\n.fa-file-text:before {\n  content: \"\\F15C\";\n}\n.fa-sort-alpha-asc:before {\n  content: \"\\F15D\";\n}\n.fa-sort-alpha-desc:before {\n  content: \"\\F15E\";\n}\n.fa-sort-amount-asc:before {\n  content: \"\\F160\";\n}\n.fa-sort-amount-desc:before {\n  content: \"\\F161\";\n}\n.fa-sort-numeric-asc:before {\n  content: \"\\F162\";\n}\n.fa-sort-numeric-desc:before {\n  content: \"\\F163\";\n}\n.fa-thumbs-up:before {\n  content: \"\\F164\";\n}\n.fa-thumbs-down:before {\n  content: \"\\F165\";\n}\n.fa-youtube-square:before {\n  content: \"\\F166\";\n}\n.fa-youtube:before {\n  content: \"\\F167\";\n}\n.fa-xing:before {\n  content: \"\\F168\";\n}\n.fa-xing-square:before {\n  content: \"\\F169\";\n}\n.fa-youtube-play:before {\n  content: \"\\F16A\";\n}\n.fa-dropbox:before {\n  content: \"\\F16B\";\n}\n.fa-stack-overflow:before {\n  content: \"\\F16C\";\n}\n.fa-instagram:before {\n  content: \"\\F16D\";\n}\n.fa-flickr:before {\n  content: \"\\F16E\";\n}\n.fa-adn:before {\n  content: \"\\F170\";\n}\n.fa-bitbucket:before {\n  content: \"\\F171\";\n}\n.fa-bitbucket-square:before {\n  content: \"\\F172\";\n}\n.fa-tumblr:before {\n  content: \"\\F173\";\n}\n.fa-tumblr-square:before {\n  content: \"\\F174\";\n}\n.fa-long-arrow-down:before {\n  content: \"\\F175\";\n}\n.fa-long-arrow-up:before {\n  content: \"\\F176\";\n}\n.fa-long-arrow-left:before {\n  content: \"\\F177\";\n}\n.fa-long-arrow-right:before {\n  content: \"\\F178\";\n}\n.fa-apple:before {\n  content: \"\\F179\";\n}\n.fa-windows:before {\n  content: \"\\F17A\";\n}\n.fa-android:before {\n  content: \"\\F17B\";\n}\n.fa-linux:before {\n  content: \"\\F17C\";\n}\n.fa-dribbble:before {\n  content: \"\\F17D\";\n}\n.fa-skype:before {\n  content: \"\\F17E\";\n}\n.fa-foursquare:before {\n  content: \"\\F180\";\n}\n.fa-trello:before {\n  content: \"\\F181\";\n}\n.fa-female:before {\n  content: \"\\F182\";\n}\n.fa-male:before {\n  content: \"\\F183\";\n}\n.fa-gittip:before,\n.fa-gratipay:before {\n  content: \"\\F184\";\n}\n.fa-sun-o:before {\n  content: \"\\F185\";\n}\n.fa-moon-o:before {\n  content: \"\\F186\";\n}\n.fa-archive:before {\n  content: \"\\F187\";\n}\n.fa-bug:before {\n  content: \"\\F188\";\n}\n.fa-vk:before {\n  content: \"\\F189\";\n}\n.fa-weibo:before {\n  content: \"\\F18A\";\n}\n.fa-renren:before {\n  content: \"\\F18B\";\n}\n.fa-pagelines:before {\n  content: \"\\F18C\";\n}\n.fa-stack-exchange:before {\n  content: \"\\F18D\";\n}\n.fa-arrow-circle-o-right:before {\n  content: \"\\F18E\";\n}\n.fa-arrow-circle-o-left:before {\n  content: \"\\F190\";\n}\n.fa-toggle-left:before,\n.fa-caret-square-o-left:before {\n  content: \"\\F191\";\n}\n.fa-dot-circle-o:before {\n  content: \"\\F192\";\n}\n.fa-wheelchair:before {\n  content: \"\\F193\";\n}\n.fa-vimeo-square:before {\n  content: \"\\F194\";\n}\n.fa-turkish-lira:before,\n.fa-try:before {\n  content: \"\\F195\";\n}\n.fa-plus-square-o:before {\n  content: \"\\F196\";\n}\n.fa-space-shuttle:before {\n  content: \"\\F197\";\n}\n.fa-slack:before {\n  content: \"\\F198\";\n}\n.fa-envelope-square:before {\n  content: \"\\F199\";\n}\n.fa-wordpress:before {\n  content: \"\\F19A\";\n}\n.fa-openid:before {\n  content: \"\\F19B\";\n}\n.fa-institution:before,\n.fa-bank:before,\n.fa-university:before {\n  content: \"\\F19C\";\n}\n.fa-mortar-board:before,\n.fa-graduation-cap:before {\n  content: \"\\F19D\";\n}\n.fa-yahoo:before {\n  content: \"\\F19E\";\n}\n.fa-google:before {\n  content: \"\\F1A0\";\n}\n.fa-reddit:before {\n  content: \"\\F1A1\";\n}\n.fa-reddit-square:before {\n  content: \"\\F1A2\";\n}\n.fa-stumbleupon-circle:before {\n  content: \"\\F1A3\";\n}\n.fa-stumbleupon:before {\n  content: \"\\F1A4\";\n}\n.fa-delicious:before {\n  content: \"\\F1A5\";\n}\n.fa-digg:before {\n  content: \"\\F1A6\";\n}\n.fa-pied-piper:before {\n  content: \"\\F1A7\";\n}\n.fa-pied-piper-alt:before {\n  content: \"\\F1A8\";\n}\n.fa-drupal:before {\n  content: \"\\F1A9\";\n}\n.fa-joomla:before {\n  content: \"\\F1AA\";\n}\n.fa-language:before {\n  content: \"\\F1AB\";\n}\n.fa-fax:before {\n  content: \"\\F1AC\";\n}\n.fa-building:before {\n  content: \"\\F1AD\";\n}\n.fa-child:before {\n  content: \"\\F1AE\";\n}\n.fa-paw:before {\n  content: \"\\F1B0\";\n}\n.fa-spoon:before {\n  content: \"\\F1B1\";\n}\n.fa-cube:before {\n  content: \"\\F1B2\";\n}\n.fa-cubes:before {\n  content: \"\\F1B3\";\n}\n.fa-behance:before {\n  content: \"\\F1B4\";\n}\n.fa-behance-square:before {\n  content: \"\\F1B5\";\n}\n.fa-steam:before {\n  content: \"\\F1B6\";\n}\n.fa-steam-square:before {\n  content: \"\\F1B7\";\n}\n.fa-recycle:before {\n  content: \"\\F1B8\";\n}\n.fa-automobile:before,\n.fa-car:before {\n  content: \"\\F1B9\";\n}\n.fa-cab:before,\n.fa-taxi:before {\n  content: \"\\F1BA\";\n}\n.fa-tree:before {\n  content: \"\\F1BB\";\n}\n.fa-spotify:before {\n  content: \"\\F1BC\";\n}\n.fa-deviantart:before {\n  content: \"\\F1BD\";\n}\n.fa-soundcloud:before {\n  content: \"\\F1BE\";\n}\n.fa-database:before {\n  content: \"\\F1C0\";\n}\n.fa-file-pdf-o:before {\n  content: \"\\F1C1\";\n}\n.fa-file-word-o:before {\n  content: \"\\F1C2\";\n}\n.fa-file-excel-o:before {\n  content: \"\\F1C3\";\n}\n.fa-file-powerpoint-o:before {\n  content: \"\\F1C4\";\n}\n.fa-file-photo-o:before,\n.fa-file-picture-o:before,\n.fa-file-image-o:before {\n  content: \"\\F1C5\";\n}\n.fa-file-zip-o:before,\n.fa-file-archive-o:before {\n  content: \"\\F1C6\";\n}\n.fa-file-sound-o:before,\n.fa-file-audio-o:before {\n  content: \"\\F1C7\";\n}\n.fa-file-movie-o:before,\n.fa-file-video-o:before {\n  content: \"\\F1C8\";\n}\n.fa-file-code-o:before {\n  content: \"\\F1C9\";\n}\n.fa-vine:before {\n  content: \"\\F1CA\";\n}\n.fa-codepen:before {\n  content: \"\\F1CB\";\n}\n.fa-jsfiddle:before {\n  content: \"\\F1CC\";\n}\n.fa-life-bouy:before,\n.fa-life-buoy:before,\n.fa-life-saver:before,\n.fa-support:before,\n.fa-life-ring:before {\n  content: \"\\F1CD\";\n}\n.fa-circle-o-notch:before {\n  content: \"\\F1CE\";\n}\n.fa-ra:before,\n.fa-rebel:before {\n  content: \"\\F1D0\";\n}\n.fa-ge:before,\n.fa-empire:before {\n  content: \"\\F1D1\";\n}\n.fa-git-square:before {\n  content: \"\\F1D2\";\n}\n.fa-git:before {\n  content: \"\\F1D3\";\n}\n.fa-y-combinator-square:before,\n.fa-yc-square:before,\n.fa-hacker-news:before {\n  content: \"\\F1D4\";\n}\n.fa-tencent-weibo:before {\n  content: \"\\F1D5\";\n}\n.fa-qq:before {\n  content: \"\\F1D6\";\n}\n.fa-wechat:before,\n.fa-weixin:before {\n  content: \"\\F1D7\";\n}\n.fa-send:before,\n.fa-paper-plane:before {\n  content: \"\\F1D8\";\n}\n.fa-send-o:before,\n.fa-paper-plane-o:before {\n  content: \"\\F1D9\";\n}\n.fa-history:before {\n  content: \"\\F1DA\";\n}\n.fa-circle-thin:before {\n  content: \"\\F1DB\";\n}\n.fa-header:before {\n  content: \"\\F1DC\";\n}\n.fa-paragraph:before {\n  content: \"\\F1DD\";\n}\n.fa-sliders:before {\n  content: \"\\F1DE\";\n}\n.fa-share-alt:before {\n  content: \"\\F1E0\";\n}\n.fa-share-alt-square:before {\n  content: \"\\F1E1\";\n}\n.fa-bomb:before {\n  content: \"\\F1E2\";\n}\n.fa-soccer-ball-o:before,\n.fa-futbol-o:before {\n  content: \"\\F1E3\";\n}\n.fa-tty:before {\n  content: \"\\F1E4\";\n}\n.fa-binoculars:before {\n  content: \"\\F1E5\";\n}\n.fa-plug:before {\n  content: \"\\F1E6\";\n}\n.fa-slideshare:before {\n  content: \"\\F1E7\";\n}\n.fa-twitch:before {\n  content: \"\\F1E8\";\n}\n.fa-yelp:before {\n  content: \"\\F1E9\";\n}\n.fa-newspaper-o:before {\n  content: \"\\F1EA\";\n}\n.fa-wifi:before {\n  content: \"\\F1EB\";\n}\n.fa-calculator:before {\n  content: \"\\F1EC\";\n}\n.fa-paypal:before {\n  content: \"\\F1ED\";\n}\n.fa-google-wallet:before {\n  content: \"\\F1EE\";\n}\n.fa-cc-visa:before {\n  content: \"\\F1F0\";\n}\n.fa-cc-mastercard:before {\n  content: \"\\F1F1\";\n}\n.fa-cc-discover:before {\n  content: \"\\F1F2\";\n}\n.fa-cc-amex:before {\n  content: \"\\F1F3\";\n}\n.fa-cc-paypal:before {\n  content: \"\\F1F4\";\n}\n.fa-cc-stripe:before {\n  content: \"\\F1F5\";\n}\n.fa-bell-slash:before {\n  content: \"\\F1F6\";\n}\n.fa-bell-slash-o:before {\n  content: \"\\F1F7\";\n}\n.fa-trash:before {\n  content: \"\\F1F8\";\n}\n.fa-copyright:before {\n  content: \"\\F1F9\";\n}\n.fa-at:before {\n  content: \"\\F1FA\";\n}\n.fa-eyedropper:before {\n  content: \"\\F1FB\";\n}\n.fa-paint-brush:before {\n  content: \"\\F1FC\";\n}\n.fa-birthday-cake:before {\n  content: \"\\F1FD\";\n}\n.fa-area-chart:before {\n  content: \"\\F1FE\";\n}\n.fa-pie-chart:before {\n  content: \"\\F200\";\n}\n.fa-line-chart:before {\n  content: \"\\F201\";\n}\n.fa-lastfm:before {\n  content: \"\\F202\";\n}\n.fa-lastfm-square:before {\n  content: \"\\F203\";\n}\n.fa-toggle-off:before {\n  content: \"\\F204\";\n}\n.fa-toggle-on:before {\n  content: \"\\F205\";\n}\n.fa-bicycle:before {\n  content: \"\\F206\";\n}\n.fa-bus:before {\n  content: \"\\F207\";\n}\n.fa-ioxhost:before {\n  content: \"\\F208\";\n}\n.fa-angellist:before {\n  content: \"\\F209\";\n}\n.fa-cc:before {\n  content: \"\\F20A\";\n}\n.fa-shekel:before,\n.fa-sheqel:before,\n.fa-ils:before {\n  content: \"\\F20B\";\n}\n.fa-meanpath:before {\n  content: \"\\F20C\";\n}\n.fa-buysellads:before {\n  content: \"\\F20D\";\n}\n.fa-connectdevelop:before {\n  content: \"\\F20E\";\n}\n.fa-dashcube:before {\n  content: \"\\F210\";\n}\n.fa-forumbee:before {\n  content: \"\\F211\";\n}\n.fa-leanpub:before {\n  content: \"\\F212\";\n}\n.fa-sellsy:before {\n  content: \"\\F213\";\n}\n.fa-shirtsinbulk:before {\n  content: \"\\F214\";\n}\n.fa-simplybuilt:before {\n  content: \"\\F215\";\n}\n.fa-skyatlas:before {\n  content: \"\\F216\";\n}\n.fa-cart-plus:before {\n  content: \"\\F217\";\n}\n.fa-cart-arrow-down:before {\n  content: \"\\F218\";\n}\n.fa-diamond:before {\n  content: \"\\F219\";\n}\n.fa-ship:before {\n  content: \"\\F21A\";\n}\n.fa-user-secret:before {\n  content: \"\\F21B\";\n}\n.fa-motorcycle:before {\n  content: \"\\F21C\";\n}\n.fa-street-view:before {\n  content: \"\\F21D\";\n}\n.fa-heartbeat:before {\n  content: \"\\F21E\";\n}\n.fa-venus:before {\n  content: \"\\F221\";\n}\n.fa-mars:before {\n  content: \"\\F222\";\n}\n.fa-mercury:before {\n  content: \"\\F223\";\n}\n.fa-intersex:before,\n.fa-transgender:before {\n  content: \"\\F224\";\n}\n.fa-transgender-alt:before {\n  content: \"\\F225\";\n}\n.fa-venus-double:before {\n  content: \"\\F226\";\n}\n.fa-mars-double:before {\n  content: \"\\F227\";\n}\n.fa-venus-mars:before {\n  content: \"\\F228\";\n}\n.fa-mars-stroke:before {\n  content: \"\\F229\";\n}\n.fa-mars-stroke-v:before {\n  content: \"\\F22A\";\n}\n.fa-mars-stroke-h:before {\n  content: \"\\F22B\";\n}\n.fa-neuter:before {\n  content: \"\\F22C\";\n}\n.fa-genderless:before {\n  content: \"\\F22D\";\n}\n.fa-facebook-official:before {\n  content: \"\\F230\";\n}\n.fa-pinterest-p:before {\n  content: \"\\F231\";\n}\n.fa-whatsapp:before {\n  content: \"\\F232\";\n}\n.fa-server:before {\n  content: \"\\F233\";\n}\n.fa-user-plus:before {\n  content: \"\\F234\";\n}\n.fa-user-times:before {\n  content: \"\\F235\";\n}\n.fa-hotel:before,\n.fa-bed:before {\n  content: \"\\F236\";\n}\n.fa-viacoin:before {\n  content: \"\\F237\";\n}\n.fa-train:before {\n  content: \"\\F238\";\n}\n.fa-subway:before {\n  content: \"\\F239\";\n}\n.fa-medium:before {\n  content: \"\\F23A\";\n}\n.fa-yc:before,\n.fa-y-combinator:before {\n  content: \"\\F23B\";\n}\n.fa-optin-monster:before {\n  content: \"\\F23C\";\n}\n.fa-opencart:before {\n  content: \"\\F23D\";\n}\n.fa-expeditedssl:before {\n  content: \"\\F23E\";\n}\n.fa-battery-4:before,\n.fa-battery-full:before {\n  content: \"\\F240\";\n}\n.fa-battery-3:before,\n.fa-battery-three-quarters:before {\n  content: \"\\F241\";\n}\n.fa-battery-2:before,\n.fa-battery-half:before {\n  content: \"\\F242\";\n}\n.fa-battery-1:before,\n.fa-battery-quarter:before {\n  content: \"\\F243\";\n}\n.fa-battery-0:before,\n.fa-battery-empty:before {\n  content: \"\\F244\";\n}\n.fa-mouse-pointer:before {\n  content: \"\\F245\";\n}\n.fa-i-cursor:before {\n  content: \"\\F246\";\n}\n.fa-object-group:before {\n  content: \"\\F247\";\n}\n.fa-object-ungroup:before {\n  content: \"\\F248\";\n}\n.fa-sticky-note:before {\n  content: \"\\F249\";\n}\n.fa-sticky-note-o:before {\n  content: \"\\F24A\";\n}\n.fa-cc-jcb:before {\n  content: \"\\F24B\";\n}\n.fa-cc-diners-club:before {\n  content: \"\\F24C\";\n}\n.fa-clone:before {\n  content: \"\\F24D\";\n}\n.fa-balance-scale:before {\n  content: \"\\F24E\";\n}\n.fa-hourglass-o:before {\n  content: \"\\F250\";\n}\n.fa-hourglass-1:before,\n.fa-hourglass-start:before {\n  content: \"\\F251\";\n}\n.fa-hourglass-2:before,\n.fa-hourglass-half:before {\n  content: \"\\F252\";\n}\n.fa-hourglass-3:before,\n.fa-hourglass-end:before {\n  content: \"\\F253\";\n}\n.fa-hourglass:before {\n  content: \"\\F254\";\n}\n.fa-hand-grab-o:before,\n.fa-hand-rock-o:before {\n  content: \"\\F255\";\n}\n.fa-hand-stop-o:before,\n.fa-hand-paper-o:before {\n  content: \"\\F256\";\n}\n.fa-hand-scissors-o:before {\n  content: \"\\F257\";\n}\n.fa-hand-lizard-o:before {\n  content: \"\\F258\";\n}\n.fa-hand-spock-o:before {\n  content: \"\\F259\";\n}\n.fa-hand-pointer-o:before {\n  content: \"\\F25A\";\n}\n.fa-hand-peace-o:before {\n  content: \"\\F25B\";\n}\n.fa-trademark:before {\n  content: \"\\F25C\";\n}\n.fa-registered:before {\n  content: \"\\F25D\";\n}\n.fa-creative-commons:before {\n  content: \"\\F25E\";\n}\n.fa-gg:before {\n  content: \"\\F260\";\n}\n.fa-gg-circle:before {\n  content: \"\\F261\";\n}\n.fa-tripadvisor:before {\n  content: \"\\F262\";\n}\n.fa-odnoklassniki:before {\n  content: \"\\F263\";\n}\n.fa-odnoklassniki-square:before {\n  content: \"\\F264\";\n}\n.fa-get-pocket:before {\n  content: \"\\F265\";\n}\n.fa-wikipedia-w:before {\n  content: \"\\F266\";\n}\n.fa-safari:before {\n  content: \"\\F267\";\n}\n.fa-chrome:before {\n  content: \"\\F268\";\n}\n.fa-firefox:before {\n  content: \"\\F269\";\n}\n.fa-opera:before {\n  content: \"\\F26A\";\n}\n.fa-internet-explorer:before {\n  content: \"\\F26B\";\n}\n.fa-tv:before,\n.fa-television:before {\n  content: \"\\F26C\";\n}\n.fa-contao:before {\n  content: \"\\F26D\";\n}\n.fa-500px:before {\n  content: \"\\F26E\";\n}\n.fa-amazon:before {\n  content: \"\\F270\";\n}\n.fa-calendar-plus-o:before {\n  content: \"\\F271\";\n}\n.fa-calendar-minus-o:before {\n  content: \"\\F272\";\n}\n.fa-calendar-times-o:before {\n  content: \"\\F273\";\n}\n.fa-calendar-check-o:before {\n  content: \"\\F274\";\n}\n.fa-industry:before {\n  content: \"\\F275\";\n}\n.fa-map-pin:before {\n  content: \"\\F276\";\n}\n.fa-map-signs:before {\n  content: \"\\F277\";\n}\n.fa-map-o:before {\n  content: \"\\F278\";\n}\n.fa-map:before {\n  content: \"\\F279\";\n}\n.fa-commenting:before {\n  content: \"\\F27A\";\n}\n.fa-commenting-o:before {\n  content: \"\\F27B\";\n}\n.fa-houzz:before {\n  content: \"\\F27C\";\n}\n.fa-vimeo:before {\n  content: \"\\F27D\";\n}\n.fa-black-tie:before {\n  content: \"\\F27E\";\n}\n.fa-fonticons:before {\n  content: \"\\F280\";\n}\n/* makes the font 33% larger relative to the icon container */\n.fa-lg {\n  font-size: 1.33333333em;\n  line-height: 0.75em;\n  vertical-align: -15%;\n}\n.fa-2x {\n  font-size: 2em;\n}\n.fa-3x {\n  font-size: 3em;\n}\n.fa-4x {\n  font-size: 4em;\n}\n.fa-5x {\n  font-size: 5em;\n}\n.fa-ul {\n  padding-left: 0;\n  margin-left: 2.14285714em;\n  list-style-type: none;\n}\n.fa-ul > li {\n  position: relative;\n}\n.fa-li {\n  position: absolute;\n  left: -2.14285714em;\n  width: 2.14285714em;\n  top: 0.14285714em;\n  text-align: center;\n}\n.fa-li.fa-lg {\n  left: -1.85714286em;\n}\n/* FONT PATH\n * -------------------------- */\n@font-face {\n  font-family: 'FontAwesome';\n  src: url(" + __webpack_require__(24) + ");\n  src: url(" + __webpack_require__(25) + "?#iefix&v=4.4.0) format('embedded-opentype'), url(" + __webpack_require__(26) + ") format('woff2'), url(" + __webpack_require__(27) + ") format('woff'), url(" + __webpack_require__(28) + ") format('truetype'), url(" + __webpack_require__(29) + "#fontawesomeregular) format('svg');\n  font-weight: normal;\n  font-style: normal;\n}\n.fa-rotate-90 {\n  filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=1);\n  -webkit-transform: rotate(90deg);\n  -ms-transform: rotate(90deg);\n  transform: rotate(90deg);\n}\n.fa-rotate-180 {\n  filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=2);\n  -webkit-transform: rotate(180deg);\n  -ms-transform: rotate(180deg);\n  transform: rotate(180deg);\n}\n.fa-rotate-270 {\n  filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=3);\n  -webkit-transform: rotate(270deg);\n  -ms-transform: rotate(270deg);\n  transform: rotate(270deg);\n}\n.fa-flip-horizontal {\n  filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=0, mirror=1);\n  -webkit-transform: scale(-1, 1);\n  -ms-transform: scale(-1, 1);\n  transform: scale(-1, 1);\n}\n.fa-flip-vertical {\n  filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=2, mirror=1);\n  -webkit-transform: scale(1, -1);\n  -ms-transform: scale(1, -1);\n  transform: scale(1, -1);\n}\n:root .fa-rotate-90,\n:root .fa-rotate-180,\n:root .fa-rotate-270,\n:root .fa-flip-horizontal,\n:root .fa-flip-vertical {\n  filter: none;\n}\n.fa-spin {\n  -webkit-animation: fa-spin 2s infinite linear;\n  animation: fa-spin 2s infinite linear;\n}\n.fa-pulse {\n  -webkit-animation: fa-spin 1s infinite steps(8);\n  animation: fa-spin 1s infinite steps(8);\n}\n@-webkit-keyframes fa-spin {\n  0% {\n    -webkit-transform: rotate(0deg);\n    transform: rotate(0deg);\n  }\n  100% {\n    -webkit-transform: rotate(359deg);\n    transform: rotate(359deg);\n  }\n}\n@keyframes fa-spin {\n  0% {\n    -webkit-transform: rotate(0deg);\n    transform: rotate(0deg);\n  }\n  100% {\n    -webkit-transform: rotate(359deg);\n    transform: rotate(359deg);\n  }\n}\n.fa-stack {\n  position: relative;\n  display: inline-block;\n  width: 2em;\n  height: 2em;\n  line-height: 2em;\n  vertical-align: middle;\n}\n.fa-stack-1x,\n.fa-stack-2x {\n  position: absolute;\n  left: 0;\n  width: 100%;\n  text-align: center;\n}\n.fa-stack-1x {\n  line-height: inherit;\n}\n.fa-stack-2x {\n  font-size: 2em;\n}\n.fa-inverse {\n  color: #fff;\n}\n", ""]);

	// exports


/***/ },
/* 23 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "45c73723862c6fc5eb3d6961db2d71fb.eot"

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "45c73723862c6fc5eb3d6961db2d71fb.eot"

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "4b5a84aaf1c9485e060c503a0ff8cadb.woff2"

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "dfb02f8f6d0cedc009ee5887cc68f1f3.woff"

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "7c87870ab40d63cfb8870c1f183f9939.ttf"

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "76a4f23c6be74fd309e0d0fd2c27a5de.svg"

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = __webpack_require__(31)['default'];

	var _classCallCheck = __webpack_require__(35)['default'];

	var _slicedToArray = __webpack_require__(36)['default'];

	var _interopRequireDefault = __webpack_require__(15)['default'];

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _stackblurCanvas = __webpack_require__(75);

	var _stackblurCanvas2 = _interopRequireDefault(_stackblurCanvas);

	var _OverlayWindow = __webpack_require__(76);

	var _OverlayWindow2 = _interopRequireDefault(_OverlayWindow);

	var _utilDebug = __webpack_require__(77);

	var _utilDebug2 = _interopRequireDefault(_utilDebug);

	var _utilTimer = __webpack_require__(78);

	var _utilTimer2 = _interopRequireDefault(_utilTimer);

	var FoggyWindow = (function () {
	    function FoggyWindow(query) {
	        var _this = this;

	        _classCallCheck(this, FoggyWindow);

	        this['debugger'] = new _utilDebug2['default']();
	        this.timer = new _utilTimer2['default'](3000, function () {
	            _this.fogOver(2000);
	        });

	        this.timer.start();

	        // setup canvas
	        this.canvas = document.querySelector(query);
	        this.overlay = new _OverlayWindow2['default']();

	        this.context = this.canvas.getContext('2d');
	        this.context.scale(window.devicePixelRatio / 2, window.devicePixelRatio / 2);
	        this.startedDrawing = false;
	        this.blurRadius = 18;
	        this.lightenColor = 'rgba(255,255,255,0.14)';
	        this.unblurredImageData = null;

	        var moveListener = function moveListener(event) {
	            event.preventDefault();
	            _this.draw(event);
	        };

	        window.onresize = function () {
	            _this.render();
	        };

	        this.overlay.canvas.addEventListener('mousedown', function (event) {
	            _this.draw(event);
	            _this.overlay.canvas.addEventListener('mousemove', moveListener);
	        });
	        this.overlay.canvas.addEventListener('touchstart', function (event) {
	            event.preventDefault();
	            _this.draw(event);
	            _this.overlay.canvas.addEventListener('touchmove', moveListener);
	        });
	        this.overlay.canvas.addEventListener('mouseup', function (event) {
	            _this.startedDrawing = false;
	            event.target.removeEventListener('mousemove', moveListener);
	        });
	        this.overlay.canvas.addEventListener('touchend', function (event) {
	            _this.startedDrawing = false;
	            event.target.removeEventListener('touchmove', moveListener);
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
	            this.context.fillStyle = this.lightenColor;
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
	            // don't allow drawing as window is fogging
	            if (this.overlay.isTransitioning) {
	                return;
	            }

	            // stop fog over timer
	            this.timer.reset();

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

	            // draw lines on overlay
	            var newLine = !this.startedDrawing;
	            this.overlay.draw(newLine, x, y);
	            this.overlay.drawClear(this.unblurredImageData);

	            if (!this.startedDrawing) {
	                this.startedDrawing = true;
	            }
	        }
	    }, {
	        key: 'fogOver',
	        value: function fogOver(time) {
	            var _this3 = this;

	            var startTime = null;
	            this.overlay.isTransitioning = true;
	            var fade = function fade(timestamp) {
	                if (startTime == null) {
	                    startTime = timestamp;
	                }

	                // calculate and set opacity
	                var progress = timestamp - startTime;
	                var opacity = 1 - progress / time;

	                _this3.overlay.setOpacity(opacity);

	                // keep going till transparent
	                if (opacity >= 0) {
	                    requestAnimationFrame(fade);
	                }

	                // if done, clear overlay and show again
	                else {
	                        _this3.overlay.clear();
	                        _this3.overlay.setOpacity(1);
	                        _this3.overlay.isTransitioning = false;
	                    }
	            };

	            requestAnimationFrame(fade);
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
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _Object$defineProperty = __webpack_require__(32)["default"];

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
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(33), __esModule: true };

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(34);
	module.exports = function defineProperty(it, key, desc){
	  return $.setDesc(it, key, desc);
	};

/***/ },
/* 34 */
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
/* 35 */
/***/ function(module, exports) {

	"use strict";

	exports["default"] = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

	exports.__esModule = true;

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _getIterator = __webpack_require__(37)["default"];

	var _isIterable = __webpack_require__(72)["default"];

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
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(38), __esModule: true };

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(39);
	__webpack_require__(64);
	module.exports = __webpack_require__(67);

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(40);
	var Iterators = __webpack_require__(43);
	Iterators.NodeList = Iterators.HTMLCollection = Iterators.Array;

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var setUnscope = __webpack_require__(41)
	  , step       = __webpack_require__(42)
	  , Iterators  = __webpack_require__(43)
	  , toIObject  = __webpack_require__(44);

	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	__webpack_require__(48)(Array, 'Array', function(iterated, kind){
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
/* 41 */
/***/ function(module, exports) {

	module.exports = function(){ /* empty */ };

/***/ },
/* 42 */
/***/ function(module, exports) {

	module.exports = function(done, value){
	  return {value: value, done: !!done};
	};

/***/ },
/* 43 */
/***/ function(module, exports) {

	module.exports = {};

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(45)
	  , defined = __webpack_require__(47);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	// indexed object, fallback for non-array-like ES3 strings
	var cof = __webpack_require__(46);
	module.exports = 0 in Object('z') ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 46 */
/***/ function(module, exports) {

	var toString = {}.toString;

	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 47 */
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY         = __webpack_require__(49)
	  , $def            = __webpack_require__(50)
	  , $redef          = __webpack_require__(53)
	  , hide            = __webpack_require__(54)
	  , has             = __webpack_require__(58)
	  , SYMBOL_ITERATOR = __webpack_require__(59)('iterator')
	  , Iterators       = __webpack_require__(43)
	  , BUGGY           = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
	  , FF_ITERATOR     = '@@iterator'
	  , KEYS            = 'keys'
	  , VALUES          = 'values';
	var returnThis = function(){ return this; };
	module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCE){
	  __webpack_require__(62)(Constructor, NAME, next);
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
	    var IteratorPrototype = __webpack_require__(34).getProto(_default.call(new Base));
	    // Set @@toStringTag to native iterators
	    __webpack_require__(63)(IteratorPrototype, TAG, true);
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
/* 49 */
/***/ function(module, exports) {

	module.exports = true;

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(51)
	  , core      = __webpack_require__(52)
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
/* 51 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var UNDEFINED = 'undefined';
	var global = module.exports = typeof window != UNDEFINED && window.Math == Math
	  ? window : typeof self != UNDEFINED && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 52 */
/***/ function(module, exports) {

	var core = module.exports = {version: '1.2.1'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(54);

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	var $          = __webpack_require__(34)
	  , createDesc = __webpack_require__(55);
	module.exports = __webpack_require__(56) ? function(object, key, value){
	  return $.setDesc(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },
/* 55 */
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
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(57)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 57 */
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 58 */
/***/ function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	var store  = __webpack_require__(60)('wks')
	  , Symbol = __webpack_require__(51).Symbol;
	module.exports = function(name){
	  return store[name] || (store[name] =
	    Symbol && Symbol[name] || (Symbol || __webpack_require__(61))('Symbol.' + name));
	};

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(51)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 61 */
/***/ function(module, exports) {

	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $ = __webpack_require__(34)
	  , IteratorPrototype = {};

	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(54)(IteratorPrototype, __webpack_require__(59)('iterator'), function(){ return this; });

	module.exports = function(Constructor, NAME, next){
	  Constructor.prototype = $.create(IteratorPrototype, {next: __webpack_require__(55)(1,next)});
	  __webpack_require__(63)(Constructor, NAME + ' Iterator');
	};

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	var has  = __webpack_require__(58)
	  , hide = __webpack_require__(54)
	  , TAG  = __webpack_require__(59)('toStringTag');

	module.exports = function(it, tag, stat){
	  if(it && !has(it = stat ? it : it.prototype, TAG))hide(it, TAG, tag);
	};

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $at  = __webpack_require__(65)(true);

	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(48)(String, 'String', function(iterated){
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
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	// true  -> String#at
	// false -> String#codePointAt
	var toInteger = __webpack_require__(66)
	  , defined   = __webpack_require__(47);
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
/* 66 */
/***/ function(module, exports) {

	// 7.1.4 ToInteger
	var ceil  = Math.ceil
	  , floor = Math.floor;
	module.exports = function(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	var anObject = __webpack_require__(68)
	  , get      = __webpack_require__(70);
	module.exports = __webpack_require__(52).getIterator = function(it){
	  var iterFn = get(it);
	  if(typeof iterFn != 'function')throw TypeError(it + ' is not iterable!');
	  return anObject(iterFn.call(it));
	};

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(69);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 69 */
/***/ function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(71)
	  , ITERATOR  = __webpack_require__(59)('iterator')
	  , Iterators = __webpack_require__(43);
	module.exports = __webpack_require__(52).getIteratorMethod = function(it){
	  if(it != undefined)return it[ITERATOR] || it['@@iterator'] || Iterators[classof(it)];
	};

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	// getting tag from 19.1.3.6 Object.prototype.toString()
	var cof = __webpack_require__(46)
	  , TAG = __webpack_require__(59)('toStringTag')
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
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(73), __esModule: true };

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(39);
	__webpack_require__(64);
	module.exports = __webpack_require__(74);

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(71)
	  , ITERATOR  = __webpack_require__(59)('iterator')
	  , Iterators = __webpack_require__(43);
	module.exports = __webpack_require__(52).isIterable = function(it){
	  var O = Object(it);
	  return ITERATOR in O || '@@iterator' in O || Iterators.hasOwnProperty(classof(O));
	};

/***/ },
/* 75 */
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
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = __webpack_require__(31)['default'];

	var _classCallCheck = __webpack_require__(35)['default'];

	var _interopRequireDefault = __webpack_require__(15)['default'];

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _utilDebug = __webpack_require__(77);

	var _utilDebug2 = _interopRequireDefault(_utilDebug);

	var OverlayWindow = (function () {
	    function OverlayWindow() {
	        _classCallCheck(this, OverlayWindow);

	        this.canvas = document.createElement('canvas');
	        this.context = this.canvas.getContext('2d');

	        this.lines = [];
	        this.isTransitioning = false;

	        //// debug
	        document.querySelector('#canvases').appendChild(this.canvas);
	    }

	    _createClass(OverlayWindow, [{
	        key: 'setSize',
	        value: function setSize(width, height) {
	            this.canvas.width = width;
	            this.canvas.height = height;
	        }

	        // draw new line or continue from previous
	    }, {
	        key: 'draw',
	        value: function draw(newLine, x, y) {
	            var context = this.context;

	            context.lineCap = 'round';
	            context.lineJoin = 'round';
	            context.lineWidth = 35;
	            context.strokeStyle = 'rgba(255,0,0,0.2)';
	            context.shadowColor = 'rgba(255,0,0,1)';
	            context.shadowBlur = 1;

	            var currLine = this.lines[this.lines.length - 1];

	            if (newLine) {
	                currLine = [];
	                this.lines.push(currLine);
	                context.beginPath();
	                context.moveTo(x, y);
	                context.lineTo(x + 1, y + 1);
	            } else if (currLine.length < 2) {
	                //not enough points to start drawing
	            } else {
	                    var twoPointsBack = currLine[currLine.length - 2];
	                    var onePointBack = currLine[currLine.length - 1];
	                    var x0 = twoPointsBack[0]; //x coordinate or previous point in path
	                    var y0 = twoPointsBack[1];

	                    var x1 = onePointBack[0]; //this is where the center of the curve should pass through
	                    var y1 = onePointBack[1];

	                    //formulas from: http://codetheory.in/calculate-control-point-to-make-your-canvas-curve-hit-a-specific-point/
	                    var controlX = x1 * 2 - (x0 + x) / 2;
	                    var controlY = y1 * 2 - (y0 + y) / 2;

	                    context.quadraticCurveTo(controlX, controlY, x, y);
	                }

	            currLine.push([x, y]);
	            context.stroke();

	            var overlayImgData = context.getImageData(0, 0, this.canvas.width, this.canvas.height);

	            return overlayImgData;
	        }

	        // empty canvas
	    }, {
	        key: 'clear',
	        value: function clear() {
	            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	        }

	        // set canvas opacity
	    }, {
	        key: 'setOpacity',
	        value: function setOpacity(opacity) {
	            this.canvas.style.opacity = opacity;
	        }

	        // draw unblurry parts
	    }, {
	        key: 'drawClear',
	        value: function drawClear(unblurredImageData) {
	            var clearParts = this.makeClear(unblurredImageData);
	            this.context.putImageData(clearParts, 0, 0);
	        }

	        // generate clear parts given image data of unblurred image to be drawn
	        // returns ImageData of clear parts
	    }, {
	        key: 'makeClear',
	        value: function makeClear(unblurredImageData) {
	            var data = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height).data;
	            var pixels = new Uint8ClampedArray(data.length);

	            for (var i = 0; i < data.length; i = i + 4) {
	                if (data[i] != 0 || data[i + 1] != 0 || data[i + 3] != 0) {
	                    pixels[i] = unblurredImageData.data[i];
	                    pixels[i + 1] = unblurredImageData.data[i + 1];
	                    pixels[i + 2] = unblurredImageData.data[i + 2];
	                    pixels[i + 3] = data[i + 3];
	                }
	            }

	            var overlay = new ImageData(pixels, this.canvas.width, this.canvas.height);

	            return overlay;
	        }
	    }]);

	    return OverlayWindow;
	})();

	exports['default'] = OverlayWindow;
	module.exports = exports['default'];

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = __webpack_require__(31)['default'];

	var _classCallCheck = __webpack_require__(35)['default'];

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
	            this.log(x, y);
	        }
	    }, {
	        key: 'beginPath',
	        value: function beginPath(context, x, y) {
	            var thickness = arguments.length <= 3 || arguments[3] === undefined ? 35 : arguments[3];

	            context.strokeStyle = 'rgba(255, 0, 0, 0.1)';
	            context.lineWidth = thickness;
	            context.lineCap = 'round';
	            context.beginPath();
	            context.moveTo(x, y);
	        }
	    }, {
	        key: 'quadraticCurve',
	        value: function quadraticCurve(context, x0, y0, x1, y1) {
	            var midpointX = parseInt((x1 + x0) / 2);
	            var midpointY = parseInt((y1 + y0) / 2);
	            context.quadraticCurveTo(midpointX, midpointY, x1, y1);
	            context.stroke();
	        }
	    }, {
	        key: 'log',
	        value: function log() {
	            console.info.apply(console, arguments);
	        }
	    }]);

	    return Debug;
	})();

	exports['default'] = Debug;
	module.exports = exports['default'];

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = __webpack_require__(31)["default"];

	var _classCallCheck = __webpack_require__(35)["default"];

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var Timer = (function () {
	    function Timer(delay, callback) {
	        _classCallCheck(this, Timer);

	        this.delay = delay;
	        this.callback = callback;
	        this.timeout = null;
	        this.startTime = null;
	    }

	    _createClass(Timer, [{
	        key: "start",
	        value: function start() {
	            var _this = this;

	            this.startTime = new Date();
	            this.timeout = setTimeout(function () {
	                _this.startTime = new Date();
	                _this.callback();
	            }, this.delay);
	        }
	    }, {
	        key: "reset",
	        value: function reset() {
	            clearTimeout(this.timeout);
	            this.start();
	        }
	    }]);

	    return Timer;
	})();

	exports["default"] = Timer;
	module.exports = exports["default"];

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _interopRequireDefault = __webpack_require__(15)['default'];

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _imagesBrooklynbridgeJpg = __webpack_require__(80);

	var _imagesBrooklynbridgeJpg2 = _interopRequireDefault(_imagesBrooklynbridgeJpg);

	var _imagesColdMorningJpg = __webpack_require__(81);

	var _imagesColdMorningJpg2 = _interopRequireDefault(_imagesColdMorningJpg);

	var _imagesDarkStreetJpg = __webpack_require__(82);

	var _imagesDarkStreetJpg2 = _interopRequireDefault(_imagesDarkStreetJpg);

	var _imagesDockJpg = __webpack_require__(83);

	var _imagesDockJpg2 = _interopRequireDefault(_imagesDockJpg);

	var _imagesEveningSkylineJpg = __webpack_require__(84);

	var _imagesEveningSkylineJpg2 = _interopRequireDefault(_imagesEveningSkylineJpg);

	var _imagesForestJpg = __webpack_require__(85);

	var _imagesForestJpg2 = _interopRequireDefault(_imagesForestJpg);

	var _imagesManhattanNightJpg = __webpack_require__(86);

	var _imagesManhattanNightJpg2 = _interopRequireDefault(_imagesManhattanNightJpg);

	var _imagesPuppiesJpg = __webpack_require__(87);

	var _imagesPuppiesJpg2 = _interopRequireDefault(_imagesPuppiesJpg);

	var _imagesSnowyStreetJpg = __webpack_require__(88);

	var _imagesSnowyStreetJpg2 = _interopRequireDefault(_imagesSnowyStreetJpg);

	var _imagesBonticouJpg = __webpack_require__(89);

	var _imagesBonticouJpg2 = _interopRequireDefault(_imagesBonticouJpg);

	var _imagesNiagaraJpg = __webpack_require__(90);

	var _imagesNiagaraJpg2 = _interopRequireDefault(_imagesNiagaraJpg);

	exports['default'] = [_imagesBrooklynbridgeJpg2['default'], _imagesColdMorningJpg2['default'], _imagesDarkStreetJpg2['default'], _imagesDockJpg2['default'], _imagesEveningSkylineJpg2['default'], _imagesForestJpg2['default'], _imagesManhattanNightJpg2['default'], _imagesPuppiesJpg2['default'], _imagesSnowyStreetJpg2['default'], _imagesBonticouJpg2['default'], _imagesNiagaraJpg2['default']];
	module.exports = exports['default'];

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "cb7d9efe1ac489ed31d6980b24d4386f.jpg"

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "d75254e298831885ffe965d3d6ae2af6.jpg"

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "fe570ffe5f1b38585304678a1ddc256e.jpg"

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "cbf86da34060f5e81d7d657ea649d92d.jpg"

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "ef5996778330cdf8bcb7a481337a8098.jpg"

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "3d68f313fb4fe05ff8fb32416518b524.jpg"

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "f3a5b1f2c74ab72741a4d90cf8eb0ea8.jpg"

/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "838ce686e815c05042d0e36ab463f22c.jpg"

/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "5ca66a34b56f74bb4a205ac241168e23.jpg"

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "15513107496f74256151109825f133f5.jpg"

/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "bcbc7ea897478ace6258e17ded2beb11.jpg"

/***/ }
/******/ ]);