import HandleClearPic from '../src/blurry.js'
console.log(HandleClearPic)

let content = '<p style=\"text-align: center; \"><b><br></b></p><p style=\"text-align: center; \"><b>黑总的表情包</b></p><p style=\"text-align: left;\"><img class=\"test\" src=\"http://file.yirimao.com/1510059983_215023.jpg\" style=\"width: 500px;height:500px;\"><b><br></b></p><p style=\"text-align: left;\"><img src=\"http://file.yirimao.com/1510059992_136798.jpg\" style=\"width: 500px;\"><b><br></b></p><p style=\"text-align: left;\"><img src=\"http://file.yirimao.com/1510060000_848396.jpg\" style=\"width: 500px;\"><b><br></b></p><p style=\"text-align: left;\"><img src=\"http://file.yirimao.com/1510060007_16181.jpg\" style=\"width: 500px;\"><b><br></b></p><p style=\"text-align: left;\"><img src=\"http://file.yirimao.com/1510060015_902917.jpg\" style=\"width: 500px;\"><b><br></b></p><p style=\"text-align: left;\"><img src=\"http://file.yirimao.com/1510060026_842803.jpg\" style=\"width: 500px;\"><b><br></b></p><p style=\"text-align: left;\"><img src=\"http://file.yirimao.com/1510060044_620717.jpg\" style=\"width: 500px;\"><b><br></b></p><p style=\"text-align: left;\"><img src=\"http://file.yirimao.com/1510060052_482129.jpg\" style=\"width: 500px;\"><b><br></b></p><p style=\"text-align: left;\"><img src=\"http://file.yirimao.com/1510060059_404083.jpg\" style=\"width: 500px;\"><b><br></b></p><p style=\"text-align: left;\"><img src=\"http://file.yirimao.com/1510060071_515355.jpg\" style=\"width: 500px;\"><b><br></b></p>'

new HandleClearPic({
  minH: 20,
  blurry: '?x-oss-process=image/blur,r_5,s_2',
  container: document
})
// let newVal = handleBLur(content)
// document.getElementsByTagName('div')[0].innerHTML = newVal