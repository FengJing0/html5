import { formatName } from '@/utils'

const meta = {
  requiresAuth: true
}

const moduleName = 'Setup'

const maker = (path, hide) => {
  return {
    path,
    name: `${moduleName}-${path}`,
    meta: {
      ...meta,
      hide
    },
    title: formatName(path),
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
    name: `${moduleName}-objectAndDriver`
  },
  children: [
    maker('objectAndDriver'),
    maker('edit', true),
    maker('eventSetup'),
    maker('overview'),
    maker('setup')
  ]
}