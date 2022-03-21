import { createVNode, render } from 'vue'
import Toast from './Toast.vue'

const div = document.createElement('div')
div.setAttribute('class', 'toast-wrapper')
document.body.appendChild(div)

let time = null
export default ({ message }) => {
  // 3. 创建虚拟dom          (组件对象， props)
  const vnode = createVNode(Toast, { message })
  // 4. 把虚拟dom渲染到div
  render(vnode, div)

  // 5. 设置定时器清空
  clearTimeout(time)
  time = setTimeout(() => {
    render(null, div)
  }, 2000)

  console.log('message.js')
}
