import { createRouter, createWebHashHistory, createWebHistory, type RouteLocationNamedRaw, type RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '../views/Login.vue'
import AboutView from '../views/AboutView.vue'
const myMenu = {
  path: '/',
  component: () => import('../components/layout/index.vue'),
  name: "/",
  children:[
    {
      path: '/home',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
    },
  ]
}
const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
]
const router = createRouter({
  history: createWebHistory(),
  routes

})

import { START_LOCATION } from 'vue-router'
import { getCurrentUserTreeApi } from '@/api/login'
import { useUserStore } from '@/stores/user'



router.beforeEach(async (to, from) => {
  const token = sessionStorage.getItem('token')
  if(!token&&to.name !== 'login'){
    return { name: 'login' }
  }
  if (from === START_LOCATION) {
    // 初始导航 重置菜单
    if (token) {
      resetRouter((myMenu: RouteRecordRaw,data:[])=>{
        router.addRoute(myMenu)
        //存入pinia
        const store=useUserStore()
        store.saveMenu(data)
         router.push(to)
        // return '/'
        // router.replace(router.currentRoute.value.fullPath)
      })

    }
  }

})
router.beforeResolve((to, from) => {
  console.log('router.beforeResolve')

})

export function resetRouter(callback?: any) {
  //import('@/api/login/data.json')
  getCurrentUserTreeApi().then((res: any) => {
    const jiankongMenu = res.data[0]
    // 递归遍历jiankongMenu 生成路由
    const data = filterAsyncRouter(jiankongMenu.children)
    setDefaultRoute(data)
   data.map(item=>{
      myMenu.children.push(item)
    } )
console.log(data,'data')
    callback&&callback(myMenu,data)
  
  })
}
//递归遍历
function filterAsyncRouter(asyncRouterMap: any[]) {

  asyncRouterMap.map(item => {
    item.path = item.href || ""
    if (item.path != "") {
      //添加页面
      let view = item.path.split('/')[2]
      item.component = () => import(`@/views/${view}/index.vue`)
    }
    if (item.children) {
      item.children = filterAsyncRouter(item.children)
    }
  })

  return asyncRouterMap
}

/**
 *
 * @param {Array} routes 用户过滤后的路由
 *
 * 递归为所有有子路由的路由设置第一个children.path为默认路由
 */
export function setDefaultRoute(routes:any[]) {

 
  routes.map((route) => {
    let c=route.children[0]
   route.redirect =c.children[0]?.href
   
  })
  
}


export default router