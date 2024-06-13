/**
 * 基础路由
 * @type { *[] }
 */

const constantRouterMap = [
  {
    path: '/',
    component: () => import('@/views/login/login.vue'),
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

        path: '/login',
        name: 'Login',
        component: () => import('@/views/login/login.vue')
  },
]

export default constantRouterMap
