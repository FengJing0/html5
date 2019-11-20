import Setup from './_Setup'
import Status from './_Status'
import user from './_user'

// 菜单
export const menu = [
  Status, Setup, user
]

// 路由
export const router = [{
  path: '/',
  name: 'index',
  meta: {
    requiresAuth: true
  },
  redirect: {
    name: 'Status-data'
  }
},
Status, Setup, user
]
