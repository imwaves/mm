/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(_) {Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_main_styl__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_main_styl___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_main_styl__);


console.log('Started!');

// HEADER LOGO

const $headerLogo = document.querySelector('#header-logo');
const HEADER_LOGO_RATIO = 1.777;

const resizeHeaderLogo = _.debounce(() => {
  $headerLogo.style.height = +$headerLogo.offsetWidth / HEADER_LOGO_RATIO + 'px';
}, 500);

window.addEventListener('resize', resizeHeaderLogo);
window.addEventListener('load', resizeHeaderLogo);

// PANORAMA

pannellum.viewer('panorama', {
  // "type": "equirectangular",
  // "panorama": "./pano-resized.png",
  "type": "multires",

  "multiRes": {
    "path": "panorama-tiles/%l/%s%y_%x",
    "fallbackPath": "panorama-tiles/fallback/%s",
    "extension": "jpg",
    "tileResolution": 512,
    "maxLevel": 4,
    "cubeResolution": 2600
  },
  "autoLoad": true
});

// LABIRINT

var viewportH, $labirint, $escape, escapeLength, rect, $marker, $escape, scrollY, fired, topTrigger;

function updateLabirint() {
  $labirint = document.querySelector('#labirint');
  $escape = $labirint.querySelector('#escape');
  $marker = $labirint.querySelector('#marker');
  viewportH = window.innerHeight;

  escapeLength = $escape.getTotalLength();
}

var startTime = 0,
    stopAnimation;

const Animate = {
  _arr: [],
  _stopped: false,
  _active: false,
  add(fn, time = 1000, easing = easeInOutSin) {
    Animate._stopped = false;
    this._arr.push({ fn, time, start: Date.now(), easing });
    if (!this._active) this._go();
  },
  _lastDate: 0,
  _go() {
    const l = Animate._arr.length;
    if (!l && Animate._stopped) return;

    let now = Date.now();
    if (now === Animate._lastDate) now++;
    Animate._lastDate = now;

    let arr = Animate._arr.slice();

    for (let i = 0; i < l; i++) {
      let { fn, time, start, easing } = arr[i];
      let phase = (now - start) / time;
      let end = phase > 1;
      if (end) Animate._arr.splice(i, 1);
      fn(easing(end ? 1 : phase));
    }

    if (!Animate._arr.length) return;

    requestAnimationFrame(Animate._go);
  },
  stop() {
    Animate._stopped = true;
    Animate._active = false;
  }
};
// function animate (fn, time = 7000) {
//   var now = Date.now();
//   if (!startTime)
//     startTime = now;
//   var phase = (now - startTime) / time;
//   if (phase > 1)
//     return (startTime = 0);
//   fn(easeInOutSin(phase));
//   requestAnimationFrame(() => animate(fn, time));
// }

function translateAlong(el, path) {
  var l = path.getTotalLength();
  var { width, height } = el.getBBox();
  var [, startX, startY] = path.getAttribute('d').match(/^M([\d\.]+),([\d\.]+) /);
  el.setAttribute('transform', `translate(${parseFloat(startX)}, ${parseFloat(startY)})`);

  var p0 = { x: startX, y: startY };
  return function (phase) {
    var p = path.getPointAtLength(phase * l);
    var angle = Math.atan2(p.y - p0.y, p.x - p0.x) * 180 / Math.PI;
    p0 = p;
    var centerX = p.x - width / 2,
        centerY = p.y - height / 2;
    el.setAttribute('transform', `translate(${centerX},${centerY}) rotate(${angle} ${width / 2} ${height / 2})`);
  };
}

function offsetDasharray(path) {
  var l = path.getTotalLength();
  path.style.strokeDasharray = escapeLength + ' ' + escapeLength;
  path.style.strokeDashoffset = escapeLength;
  return function (phase) {
    path.style.strokeDashoffset = l - phase * l;
  };
}

function winLabirint(dir) {
  if (dir === -1) {
    translateAlong($marker, $escape);
    offsetDasharray($escape);
  } else if (dir === 1) {
    Animate.add(translateAlong($marker, $escape), 7000);
    Animate.add(offsetDasharray($escape), 7000);
  }
}

document.addEventListener('orientationchange', updateLabirint);
document.addEventListener('resize', updateLabirint);
document.addEventListener('DOMContentLoaded', () => {
  updateLabirint();
  winLabirint(-1);
});

document.addEventListener('scroll', _.debounce(() => {
  scrollY = window.scrollY;
  rect = $labirint.getBoundingClientRect();
  topTrigger = rect.height;
  if (!fired && rect.top < topTrigger) {
    fired = true;
    winLabirint(1);
  }

  if (fired && rect.top > viewportH) {
    fired = false;
    winLabirint(-1);
  }
}, 100));

function pathStartPoint(path) {
  var d = path.attr("d"),
      dsplitted = d.split(" ");
  return dsplitted[1].split(",");
}

function easeInOut(t) {
  return t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

function easeInSin(t) {
  return 1 + Math.sin(Math.PI / 2 * t - Math.PI / 2);
}
function easeOutSin(t) {
  return Math.sin(Math.PI / 2 * t);
}
function easeInOutSin(t) {
  return (1 + Math.sin(Math.PI * t - Math.PI / 2)) / 2;
}

function linear(t) {
  return t;
}
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(1)))

/***/ }),
/* 1 */
/***/ (function(module, exports) {

function debounce(func, wait, immediate) {
    var timeout;
    return function () {
        var context = this,
            args = arguments;
        var later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};

module.exports = { debounce };

/***/ }),
/* 2 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(0);


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map