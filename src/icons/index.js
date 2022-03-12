// 全局注册自定义图标
// require.context() 创建 context
// 可以给这个函数传入三个参数：搜索目录，标记是否搜索子目录，匹配文件的正则表达式
// 返回一个 require 函数，该函数提供三个属性：resolve、keys、id
// require 函数接收一个 request 的参数，用于做 require 的导入
// 用到的是 keys，它是一个函数，返回一个数组，这个数组里包含了所有的 svg 图标文件名
// 遍历图标，把它作为 request 传入 require 导入函数中，完成本地 svg 图标的导入

import SvgIcon from '@/components/SvgIcon'

const svgRequire = require.context('./svg', false, /\.svg$/)
svgRequire.keys().forEach((svgIcon) => svgRequire(svgIcon))

// 传入 app 实例，进行全局注册 SvgIcon 组件
export default function installIcons(app) {
  app.component('SvgIcon', SvgIcon)
}
