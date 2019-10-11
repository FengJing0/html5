const meta = {
  requiresAuth: true
}

const moduleName = 'script'

const maker = (path, hide) => {
  return {
    path,
    name: `${moduleName}-${path}`,
    meta: {
      ...meta,
      hide
    },
    title: path,
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
    maker('index', true)
  ]
}
