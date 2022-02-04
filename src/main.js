// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import Axios from 'axios'


//导入组件

import Goods from "@/components/Goods/Goods.vue"
import Ratings from "@/components/Ratings/Ratings.vue"
import Seller from "@/components/Seller/Seller.vue"


Vue.use(VueRouter) 

// 如果要在其他的组件中使用axios命令 需要改为他的原型属性
Vue.prototype.$axios = Axios

// 2. 定义路由

const routes = [
  {path:"/",redirect:"/goods"},
  { path: '/goods', component: Goods },
  { path: '/ratings', component: Ratings},
  { path: '/seller', component: Seller}]

  // 3. 创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数, 不过先这么简单着吧。
const router = new VueRouter({
  routes, // (缩写) 相当于 routes: routes
  // 默认router-link-active
  linkActiveClass:"active"
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router
})
