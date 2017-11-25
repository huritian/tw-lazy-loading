/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var HandleClearPic = function HandleClearPic() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var n = 0;
  var minH = 20;
  var clientH = document.documentElement.clientHeight;
  var container = document;
  var imgs = container.getElementsByTagName('img');
  var obj = {};
  var blurry = '?x-oss-process=image/blur,r_3,s_2';
  // 富文本添加模糊图片
  var handleBLur = function handleBLur(content) {
    if (typeof content !== 'string') return console.error('handleBlur函数传参数据类型为String');
    content = content.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/gi, function (match, capture) {
      return match.replace(capture, capture + blurry);
    });
    return content;
  };
  // exports.handleBLur = handleBLur
  if (options) {
    obj = JSON.parse(JSON.stringify(options));
  }
  if (obj.minH) {
    if (typeof obj.minH !== 'number') return console.error('参数minH数据类型为Number');
    minH = obj.minH;
  }
  if (obj.blurry) {
    if (typeof obj.blurry !== 'string') return console.error('参数blurry数据类型为String');
    blurry = obj.blurry;
  }
  if (obj.container) {
    container = obj.container;
  }
  // 滚动判定
  function verticalScroll(imgsArr) {
    var scrollT = document.documentElement.scrollTop;
    for (var i = n; i < imgsArr.length; i++) {
      var offsetT = imgsArr[i].offsetTop;
      if (clientH <= offsetT) {
        var h = offsetT - scrollT - clientH;
        if (h <= minH) {
          createImg(imgsArr[i]);
        }
      } else {
        createImg(imgsArr[i]);
      }
    }
  }
  window.onload = function () {
    verticalScroll(imgs);
  };
  // 修改成清晰图片
  function createImg(obj) {
    var flag = obj.src.indexOf(blurry);
    if (flag < 0) {
      return n++;
    }
    var src = obj.src.replace(blurry, '');
    var img = new Image();
    for (var key in obj.style) {
      if (obj.style.hasOwnProperty(key)) img.style[key] = obj.style[key];
    }
    img.className = obj.className;
    img.src = src;
    img.onload = function () {
      var parent = obj.parentNode;
      if (parent) parent.replaceChild(img, obj);
    };
    n++;
  }
  // 初始化图片数据
  var initPic = function initPic(container) {
    var el = document;
    if (container) el = container;
    imgs = el.getElementsByTagName('img');
  };

  window.onscroll = function () {
    verticalScroll(imgs);
  };
};
// exports.HandleClearPic = HandleClearPic
module.exports = HandleClearPic;

/***/ })
/******/ ]);