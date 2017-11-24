;( _ => {
  var HandleClearPic = function (options = {}) {
    let n = 0
    let minH = 20
    let clientH = document.documentElement.clientHeight
    let container = document
    let imgs = container.getElementsByTagName('img')
    let obj = {}
    let blurry = '?x-oss-process=image/blur,r_3,s_2'
    // 富文本添加模糊图片
    let handleBLur = (content) => {
      if (typeof content !== 'string') return console.error('handleBlur函数传参数据类型为String')
      content = content.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/gi, (match, capture) => {
        return match.replace(capture, capture + blurry)
    })
      return content
    }
    window.handleBLur = handleBLur
    if (options) {
      obj = JSON.parse(JSON.stringify(options))
    }
    if (obj.minH) {
      if (typeof obj.minH !== 'number') return console.error('参数minH数据类型为Number')
      minH = obj.minH
    }
    if (obj.blurry) {
      if (typeof obj.blurry !== 'string') return console.error('参数blurry数据类型为String')
    }
    if (obj.container) {
      container = obj.container
    }
    blurry = obj.blurry
    // 滚动判定
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
    window.onload = function () {
      verticalScroll(imgs)
    }
    // 修改成清晰图片
    function createImg(obj){
      let flag = obj.src.indexOf(blurry)
      if (flag < 0) {
        return n++
      }
      let src = obj.src.replace(blurry, '')
      let img = new Image()
      for (let key in obj.style) {
        if (obj.style.hasOwnProperty(key)) img.style[key] = obj.style[key]
      }
      img.className = obj.className
      img.src = src
      img.onload = function () {
        let parent = obj.parentNode
        if (parent) parent.replaceChild(img, obj)
      }
      n++
    }
    // 初始化图片数据
    let initPic = container => {
      let el = document
      if (container) el = container
      imgs = el.getElementsByTagName('img')
    }

    window.onscroll = function () {
      verticalScroll(imgs)
    }
  }
  window.HandleClearPic = HandleClearPic
  module.exports = {
    HandleClearPic
  }
})()
