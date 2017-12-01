# 项目名称
tw-lazy-loading
图片懒加载(只针对垂直滚动的情况)

# example
可以下载浏览./example/richText.html
启动示例命令行
npm run dev

# 下载安装
npm install tw-lazy-loading

# 使用
```javascript
> import LazyLoad from 'tw-lazy-loading'
let LazyLoad = new LazyLoad(option)
```
>标签引入
```javascript
<script src="./node_modules/tw-lazy-loading/dist/index.js"></script>
let LazyLoad = new window.LazyLoad(option)
```
>引入dist包下面的index.js
>需要使用处参数选项

```javascript
option = {
  minH // 选填，number 屏幕滚动到什么位置时调用图片清晰函数，minH必须为大于等于0的整数
  blurParame // 选填，array 图片模糊OSS参数[el1, el2],参数取值范围为1~50，length <= 2
  container // 选填， 标签容器，在什么标签内，使用本方法，如document.getElemmentById(ID),vue开发情况下，不能使用refs
  delay // 选填 number 屏幕滚动间隔多少毫秒执行一次图片转化为清晰图片的函数, delay必须大于0
}
```

# 暴露的方法
1、LazyLoad.handleBlur(content) 给富文本添加OSS图片模糊的后缀
> @parma content {string} 富文本
> @return content

2、LazyLoad.initPic()
> 页面调用接口，增加了页面的图片数量时，调用此接口，修改图片容器大小，没有返回值
