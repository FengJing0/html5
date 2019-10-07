const meta = {
  requiresAuth: true
}

const moduleName = 'configration'

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
    name: `${moduleName}-object`
  },
  children: [
    maker('object'),
    maker('edit', true),
    maker('event'),
    maker('overview')
  ]
}
