<template>
  <el-menu mode="horizontal"
           :default-active="index">
    <el-menu-item v-for="item in menu"
                  :key="item.title"
                  :index="item.name"
                  @click.native="active(item)">{{item.title}}</el-menu-item>
  </el-menu>
</template>

<script>
import { mapMutations } from 'vuex'
import { menu } from '@/router/menu'
export default {
  data () {
    return {
      menu
    }
  },
  mounted () {
    // this.refreshSideMenu()
    // console.log(this.menu)
  },
  computed: {
    routeName () {
      return this.$route.name
    },
    index () {
      return this.routeName.split('-')[0]
    }
    // 不管当前路由是不是顶级菜单 都返回这个路由所属的顶级菜单对象的name
    // 如果返回 null 代表这个路由不是在菜单里显示的路由
    // routeTopLevelName () {
    //   if (this.router.find(e => e.name === this.routeName)) {
    //     return this.routeName
    //   } else {
    //     const find = this.router.find(e => e.children.find(child => child.name === this.routeName))
    //     return find ? find.name : null
    //   }
    // },
    // 返回当前对象对应的顶级菜单下的所有子菜单 这些菜单可以在侧边栏菜单中直接使用
    // 如果返回 null 代表这个路由没有对应的一级路由也就没有菜单
    // routeTopLevelMenu () {
    //   return this.routeTopLevelName ? this.menu.find(e => e.name === this.routeTopLevelName).children : null
    // }
  },
  methods: {
    ...mapMutations([
      'setSideMenu'
    ]),
    // 跳转
    active (item) {
      let name = item.name
      if (this.index === name) {
        return
      }
      if (name === '') {
        this.$router.push({ path: '/' })
      } else {
        this.$router.push({ name })
      }
    }
    // 更新侧边栏
    // refreshSideMenu () {
    //   this.setSideMenu({
    //     sideMenu: this.routeTopLevelMenu ? this.routeTopLevelMenu : []
    //   })
    // }
  },
  watch: {
    // routeName () {
    //   // this.show()
    //   this.refreshSideMenu()
    // }
  }
}
</script>

<style scoped>
</style>
