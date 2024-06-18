import {createRouter, createWebHashHistory, useRouter} from 'vue-router'
import routerMap from './routerMap'

import {ipc} from "@/utils/ipcRenderer";
import {ipcApiRoute} from "@/api/main";
import useUserStore from "@/store/modules/user";

const Router = createRouter({
  history: createWebHashHistory(),
  routes: routerMap,
})

const whiteList = ['/login'];

Router.beforeEach((to, from, next) => {
  ipc.request(ipcApiRoute.isLogin).then(res=>{
    if (res) {
      /* has token*/
      if (to.path === '/login') {
        next({ path: '/' })
      } else if (whiteList.indexOf(to.path) !== -1) {
        next()
      } else {
        const userStore = useUserStore()
        userStore.getInfo()
        next()
      }
    } else {
      // 没有token
      if (whiteList.indexOf(to.path) !== -1) {
        // 在免登录白名单，直接进入
        next()
      } else {
        next(`/login`) // 否则全部重定向到登录页
      }
    }
  })
})

Router.afterEach(() => {
})

export default Router
