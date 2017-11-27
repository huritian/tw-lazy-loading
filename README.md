# 项目名称
tw-lazy-loading
图片懒加载

# example
可以下载浏览./example/richText.html
启动示例命令行
npm run dev

# 下载安装
npm install tw-lazy-loading

# 使用
import LazyLoad from 'tw-lazy-loading'
需要使用处
let LazyLoad = new LazyLoad(option)
其中option = {
  minH // 选填，屏幕滚动到什么位置时调用图片清晰函数
  blurry // 选填，图片模糊OSS参数
  container // 选填， 标签容器，在什么标签内，使用本方法
  delay // 选填，屏幕滚动间隔多久执行一次图片转化为清晰图片的函数
}

# 暴露的方法
1、LazyLoad.handleBLur(content) 给富文本添加OSS图片模糊的后缀
arg content 必填，富文本内容
函数返回处理过的content

2、LazyLoad.initPic()
页面调用接口，增加了页面的图片数量时，调用此接口，修改图片容器大小，没有返回值
