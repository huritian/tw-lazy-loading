(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["LazyLoad"] = factory();
	else
		root["LazyLoad"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
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


;(function (_) {
  /**
   *  LazyLoad
   *  @description My method description. Image lazy loading
   *  @constructor LazyLoad
   *  @version 0.0.19
   *  @example new LazyLoad({min: 20, blurry: '?x-oss-process=image/blur,r_3,s_2'})
   *  @method LazyLoad 执行函数函数懒加载
   *  @param {number} [minH=20] 图片距离屏幕下边框的距离小于minH时，执行createImg方法
   *  @param {object} [container=document] 父级元素
   *  @param {Array} [blurParame = [20, 20]] oss后缀（图片模糊)el1表示模糊半径，el2为正态分布的标准差，取值范围都为[1, 50]
   *  @param {number} [delay=50] 触发事件的时间间隔
   */
  var LazyLoad = function LazyLoad() {
    var _this2 = this;

    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var n = 0;
    var minH = 20;
    var clientH = document.documentElement.clientHeight;
    var container = document;
    var imgs = container.getElementsByTagName('img');
    var obj = Object.assign({}, options);
    var blurParame = [20, 20];
    // 模糊句柄
    var blurHandle = '/blur,r_' + blurParame[0] + ',s_' + blurParame[1];
    // OSS开头
    var OSSTAG = '?x-oss-process=image';
    var delay = 50;
    if (obj.minH) {
      if (typeof obj.minH !== 'number') return console.error('参数minH数据类型为Number');
      if (obj.minH < 0) return console.error('参数minH必须大于0');
      minH = obj.minH;
    }
    if (obj.blurParame) {
      if (!obj.blurParame instanceof Array) return console.error('参数blurParame数据类型为Array');
      if (obj.blurParame.length > 2) return console.error('参数blurParame的长度应小于等于2');
      var el1 = obj.blurParame[0];
      if (el1 < 1 || el1 > 50) return console.error('blurParame元素取值范围是[1, 50]');
      if (obj.blurParame[1]) {
        var el2 = obj.blurParame[1];
        if (el2 < 1 || el2 > 50) return console.error('blurParame元素取值范围是[1, 50]');
      }
      blurParame = Object.assign(blurParame, obj.blurParame);
      blurHandle = '/blur,r_' + blurParame[0] + ',s_' + blurParame[1];
    }
    var blurry = OSSTAG + blurHandle;
    if (obj.container) {
      container = obj.container;
      imgs = container.getElementsByTagName('img');
    }
    if (obj.delay) {
      if (typeof obj.delay !== 'number') return console.error('参数delay数据类型为Number');
      if (obj.delay < 0) return console.error('参数delay必须大于0');
      delay = obj.delay;
    }
    // 懒加载执次数控制器
    function debounce(fn, delay) {
      var _this = this,
          _arguments = arguments;

      var timer = null;
      return function (_) {
        var context = _this,
            args = _arguments;
        clearTimeout(timer);
        timer = setTimeout(function () {
          fn.apply(context, args);
        }, delay);
      };
    }
    // 屏幕滚动
    function verticalScroll(imgsArr) {
      var scrollT = document.documentElement.scrollTop;
      for (var i = n; i < imgsArr.length; i++) {
        var offsetT = imgsArr[i].offsetTop;
        if (clientH <= offsetT) {
          var h = offsetT - scrollT - clientH;
          if (h > delay) return false;
          if (h <= minH) {
            createImg(imgsArr[i]);
          }
        } else {
          createImg(imgsArr[i]);
        }
      }
    }
    // 新建清晰图片
    function createImg(obj) {
      var flag = obj.src.indexOf(OSSTAG);
      if (flag < 0) return n++;
      var src = '';
      var OSSlength = obj.src.length - flag - blurry.length;
      if (OSSlength === 0 && obj.src.indexOf(blurHandle) > 0) {
        src = obj.src.replace(blurry, '');
      }
      if (OSSlength > 0) src = obj.src.replace(blurHandle, '');
      var img = new Image();
      // 获取图片的style
      if (obj.style) Object.assign(img.style, obj.style);
      img.className = obj.className;
      img.src = src;
      img.onload = function () {
        var parent = obj.parentNode;
        if (parent) parent.replaceChild(img, obj);
      };
      n++;
    }
    /**
     *  @method blurPic 富文本添加图片模糊
     *  @param {string} content 富文本内容
     *  @returns {string} content
     */
    this.blurPic = function (content) {
      if (typeof content !== 'string') return console.error('handleBlur函数传参数据类型为String');
      content = content.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/gi, function (match, capture) {
        if (capture.indexOf(OSSTAG) >= 0) return match.replace(capture, capture + blurHandle);
        if (capture.indexOf(OSSTAG) < 0) return match.replace(capture, capture + blurry);
      });
      _this2.initPic();
      return content;
    };
    /**
     *  @method initPic 图片初始化，当图片数量变化时使用
     */
    this.initPic = function (_) {
      setTimeout(function (_) {
        var el = document;
        if (container) el = container;
        imgs = el.getElementsByTagName('img');
      }, 0);
    };
    // 页面加载完成时调用
    window.onload = function () {
      verticalScroll(imgs);
    };
    // 页面滚动时调用
    window.onscroll = debounce(function () {
      if (n === parseInt(imgs.length)) return;
      verticalScroll(imgs);
    }, delay);
  };
  module.exports = LazyLoad;
})();

/***/ })
/******/ ]);
});