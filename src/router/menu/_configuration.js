const meta = {
  requiresAuth: true
}

const moduleName = 'configration'

const maker = (path) => {
  return {
    path,
    name: `${moduleName}-${path}`,
    meta,
    component: () =>
      import(`@/pages/menus/${moduleName}/${path}.vue`)
  }
}

export default {
  title: moduleName,
  path: `/${moduleName}`,
  name: moduleName,
  component: () => import('@/components/core/MainLayout/index.vue'),
  meta,
  redirect: {
    name: `${moduleName}-index`
  },
  children: [
    maker('index'),
    maker('edit'),
    maker('event')
  ]
}
