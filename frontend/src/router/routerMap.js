/**
 * 基础路由
 * @type { *[] }
 */

const constantRouterMap = [
  {
    path: '/',
    component: () => import('@/layouts/AppSider.vue'),
    children: [
      {
        path: '/subMenu/:id',
        name: 'SubMenu',
        props: true,
        component: () => import('@/layouts/Menu.vue'),
        children: [
          {
            path: 'scales',
            name: 'ScalesIndex',
            component: () => import('@/views/scales/index.vue')
          },
          {
            path: 'loginInfo',
            name: 'LoginInfo',
            component: () => import('@/views/setting/loginInfo.vue')
          },
        ]
      }
    ]
  },
  {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/login/login.vue')
  },
]

export default constantRouterMap
