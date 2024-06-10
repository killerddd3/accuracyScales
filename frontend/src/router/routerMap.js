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
        path: '/scales',
        name: 'Scales',
        component: () => import('@/layouts/Menu.vue'),
        props: { id: 'scales' },
        redirect: { name: 'ScalesIndex' },
        children: [
          {
            path: 'index',
            name: 'ScalesIndex',
            component: () => import('@/views/scales/index.vue')
          },
        ]
      },
    ]
  },
  {
/*

        path: '/login',
        name: 'SpecialLoginWindow',
        component: () => import('@/views/effect/login/Window.vue')
      */
  },
]

export default constantRouterMap
