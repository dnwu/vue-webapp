import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// 导入路由组件
import goods from '../components/goods/goods'
import ratings from '../components/ratings/ratings'
import seller from '../components/seller/seller'
export default new Router({
  routes: [{
      path: '/goods',
      component: goods
    }, {
      path: '/ratings',
      component: ratings
    },
    {
      path: '/seller',
      component: seller
    },
    {
      path: '/',
      redirect: '/goods'
    }
  ]
})
