;(_ => {
  /**
   *  My method description. Image lazy loading
   *  @constructor LazyLoad
   *  @version 0.0.19
   *  @example new LazyLoad({min: 20, blurry: '?x-oss-process=image/blur,r_3,s_2'})
   *  @method LazyLoad 执行函数函数懒加载
   *  @param {number} minH 图片距离屏幕下边框的距离小于minH时，执行createImg方法
   *  @param {object} container 父级元素
   *  @param {string} blurry oss后缀（图片模糊）
   *  @param {number} delay 触发事件的时间间隔
   *  @author huxin <993512782@qq.com>
   */
  var LazyLoad = function (options = {}) {
    /**
     * @constant
     * @default
     */
    let n = 0
    /**
     * @constant
     * @default
     */
    let minH = 20
    /**
     * @constant
     * @default
     */
    let clientH = document.documentElement.clientHeight
    /**
     * @constant
     * @default
     */
    let container = document
    /**
     * @default
     */
    let imgs = container.getElementsByTagName('img')
    let obj = {}
    /**
     * @constant
     * @default
     */
    let blurry = '?x-oss-process=image/blur,r_3,s_2'
    /**
     * @constant
     * @default
     */
    let delay = 50
    if (options) {
      obj = JSON.parse(JSON.stringify(options))
    }
    if (obj.minH) {
      if (typeof obj.minH !== 'number') return console.error('参数minH数据类型为Number')
      minH = obj.minH
    }
    if (obj.blurry) {
      if (typeof obj.blurry !== 'string') return console.error('参数blurry数据类型为String')
      blurry = obj.blurry
    }
    if (obj.container) {
      container = obj.container
    }
    if (obj.delay) {
      if (typeof obj.delay !== 'number') return console.error('参数delay数据类型为Number')
      delay = obj.delay
    }
    /**
     *  @method debounce 控制图片懒加载的间隔时间
     *  @param {} minH 图片距离屏幕下边框的距离小于minH时，执行createImg方法
     *  @param {function} fn 控制函数
     *  @param {delay} 间隔时间 oss后缀（图片模糊）
     */
    function debounce(fn, delay) {
      let timer = null;
      return _ => {
        let context = this, args = arguments
        clearTimeout(timer)
        timer = setTimeout(() => {
          fn.apply(context, args)
        }, delay);
      }
    }
    /**
     *  @method verticalScroll 判定屏幕滚动
     *  @param {array} imgsArr 图片集合
     */
    function verticalScroll(imgsArr) {
      let scrollT = document.documentElement.scrollTop
      for (let i = n; i < imgsArr.length; i++) {
        let offsetT = imgsArr[i].offsetTop
        if (clientH <= offsetT) {
          let h = offsetT - scrollT - clientH
          if (h <= minH) {
            createImg(imgsArr[i])
          }
        } else {
          createImg(imgsArr[i])
        }
      }
    }
    /**
     *  @method createImg 判定屏幕滚动
     *  @param {object} obj img标签
     */
    function createImg(obj){
      let flag = obj.src.indexOf(blurry)
      if (flag < 0) return n++
      let src = obj.src.replace(blurry, '')
      let img = new Image()
      // 获取图片的style
      if (obj.style) Object.assign(img.style, obj.style)
      img.className = obj.className
      img.src = src
      img.onload = function () {
        let parent = obj.parentNode
        if (parent) parent.replaceChild(img, obj)
      }
      n++
    }
    /**
     *  @method handleBLur 富文本添加图片模糊
     *  @param {string} content 富文本内容
     *  @returns {string} content
     */
    this.handleBLur = (content) => {
      if (typeof content !== 'string') return console.error('handleBlur函数传参数据类型为String')
      content = content.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/gi, (match, capture) => {
        return match.replace(capture, capture + blurry)
    })
      return content
    }
    /**
     *  @method initPic 图片初始化，当图片数量变化时使用
     */
    this.initPic = container => {
      let el = document
      if (container) el = container
      imgs = el.getElementsByTagName('img')
    }
    /**
     *  @method onload 页面加载完成时调用
     */
    window.onload = function () {
      verticalScroll(imgs)
    }
    /**
     *  @method onscroll 页面滚动时调用
     */
    window.onscroll = debounce(() => {
      verticalScroll(imgs)
    }, delay)
  }
  // exports.LazyLoad = LazyLoad
  module.exports = LazyLoad
})();
