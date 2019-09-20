export default {
  title: 'index',
  path: '/',
  name: 'index',
  component: () => import('@/components/core/MainLayout/index.vue'),
  meta: { requiresAuth: true },
  redirect: {
    name: 'index-index'
  },
  children: [
    {
      path: 'index',
      name: 'index-index',
      meta: { requiresAuth: true },
      component: () => import('@/pages/core/index/index.vue')
    }
  ]
}
