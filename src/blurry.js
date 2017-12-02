;(_ => {
  /**
   *  LazyLoad
   *  @description My method description. Image lazy loading
   *  @constructor LazyLoad
   *  @version 0.0.19
   *  @example new LazyLoad({min: 20, blurry: '?x-oss-process=image/blur,r_3,s_2'})
   *  @method LazyLoad 执行函数函数懒加载
   *  @param {number} [minH=180] 图片距离屏幕下边框的距离小于minH时，执行createImg方法
   *  @param {string} [tw_className='tw-lazy-load'] 标记需要处理的懒加载图片
   *  @param {object} [container=document] 父级元素
   *  @param {Array} [blurParame = [20, 20]] oss后缀（图片模糊)el1表示模糊半径，el2为正态分布的标准差，取值范围都为[1, 50]
   *  @param {number} [delay=20] 触发事件的时间间隔
   */
  var LazyLoad = function (options = {}) {
    let n = 0
    let minH = 180
    let clientH = document.documentElement.clientHeight
    let container = document
    let tw_className = 'tw-lazy-load'
    let obj = Object.assign({}, options)
    let blurParame = [20, 20]
    // 模糊句柄
    let blurHandle = '/blur,r_'+ blurParame[0] +',s_' + blurParame[1]
    // OSS开头
    const OSSTAG = '?x-oss-process=image'
    let delay = 20
    if (obj.minH) {
      if (typeof obj.minH !== 'number') return console.error('参数minH数据类型为Number')
      if (obj.minH < 0) return console.error('参数minH必须大于0')
      minH = obj.minH
    }
    if (obj.blurParame) {
      if (!obj.blurParame instanceof Array) return console.error('参数blurParame数据类型为Array')
      if (obj.blurParame.length > 2) return console.error('参数blurParame的长度应小于等于2')
      let el1 =  obj.blurParame[0]
      if (el1 < 1 || el1 > 50) return console.error('blurParame元素取值范围是[1, 50]')
      if (obj.blurParame[1]) {
        let el2 =  obj.blurParame[1]
        if (el2 < 1 || el2 > 50) return console.error('blurParame元素取值范围是[1, 50]') 
      }
      blurParame = Object.assign(blurParame, obj.blurParame)
      blurHandle = '/blur,r_'+ blurParame[0] +',s_' + blurParame[1]
    }
    // 图片模糊
    let blurry = OSSTAG + blurHandle
    if (obj.container) container = obj.container
    if (obj.tw_className) tw_className = obj.tw_className
    let imgs = container.getElementsByClassName(tw_className)
    if (obj.delay) {
      if (typeof obj.delay !== 'number') return console.error('参数delay数据类型为Number')
      if (obj.delay < 0) return console.error('参数delay必须大于0')
      delay = obj.delay
    }
    // 懒加载执次数控制器
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
    // 屏幕滚动
    function verticalScroll(imgsArr) {
      let scrollT = document.documentElement.scrollTop || document.body.scrollTop || 0
      for (let i = n; i < imgsArr.length; i++) {
        let offsetT = imgsArr[i].offsetTop
        if (clientH <= offsetT) {
          let h = offsetT - scrollT - clientH
          if (h > minH) return false
          if (h <= minH) {
            createImg(imgsArr[i])
          }
        } else {
          createImg(imgsArr[i])
        }
      }
    }
    // 新建清晰图片
    function createImg(obj){
      let flag = obj.src.indexOf(blurHandle)
      if (flag < 0) return n++
      let src = ''
      let OSSlength = obj.src.length - obj.src.indexOf(OSSTAG) - blurry.length
      if (OSSlength === 0) {
        src = obj.src.replace(blurry, '')
      }
      if (OSSlength > 0) src = obj.src.replace(blurHandle, '')
      obj.src = src
      n++
    }
    // 添加class
    function addClass(item) {
      if (/class/.test(item)) {
        if (/class=\"/.test(item)) return item = item.replace('class="', 'class="' + tw_className + ' ')
        return item = item.replace('class=\'', 'class=\'' + tw_className + ' ')
      }
      return item = item.replace('<img', '<img class="' + tw_className + '"')
    }
    /**
     *  @method blurPic 富文本添加图片模糊
     *  @param {string} content 富文本内容
     *  @returns {string} content
     */
    this.blurPic = (content) => {
      if (typeof content !== 'string') return console.error('handleBlur函数传参数据类型为String')
      content = content.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/gi, (match, capture) => {
        match = addClass(match)
        if (capture.indexOf(OSSTAG) >= 0) return match.replace(capture, capture + blurHandle)
        if (capture.indexOf(OSSTAG) < 0) return match.replace(capture, capture + blurry)
    })
      this.initPic()
      return content
    }
    /**
     *  @method initPic 图片初始化，当图片数量变化时使用
     */
    this.initPic = _ => {
      setTimeout(_ => {
        let el = document
        if (container) el = container
        imgs = el.getElementsByClassName(tw_className)
      }, 0)
    }
    /**
     *  @method initCounter 初始化计数器
     */
    this.initCounter = function (_) {
      n = 0;
    }
    // 页面加载完成时调用
    window.onload = function () {
      setTimeout(_ => {
        verticalScroll(imgs)
      }, 0)
    }
    // 页面滚动时调用
    window.onscroll = debounce(() => {
      if (imgs.length !== 0 && n === parseInt(imgs.length)) return
      verticalScroll(imgs)
    }, delay)
  }
  module.exports = LazyLoad
})();