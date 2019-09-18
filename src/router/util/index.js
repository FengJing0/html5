export default (config) => {
  const { title } = config
  return {
    title,
    path: '/',
    component: () => import('@/components/core/MainLayout/index.vue'),
    meta: { requiresAuth: true },
    redirect: {
      name: title
    },
    children: [
      {
        path: title,
        name: title,
        meta: { requiresAuth: true },
        component: () => import(`@/pages/core/index/${title}.vue`)
      }
    ]
  }
}
