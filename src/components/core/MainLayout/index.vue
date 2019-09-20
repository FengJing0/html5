<template>
  <div class="layout-main"
       :class="theme">
    <div class="dd-layout-header">
      <div class="logo-group"
           :style="logoGroupStyle">
        <img v-if="collapse"
             src="@/assets/image/logo/header-icon-only.png">
        <img v-else
             src="@/assets/image/logo/header.png">
      </div>
      <!-- <el-tooltip placement="bottom"
                  v-if="hasSideMenu">
        <div slot="content">{{content}}</div>
        <div class="toggle-sidemenu-btn"
             @click="toggleAside">
          <Icon name="bars"
                :style="rotate"></Icon>
        </div>
      </el-tooltip> -->
      <HeaderMenu></HeaderMenu>
      <HeaderRight></HeaderRight>
    </div>
    <div class="dd-layout-container">
      <!-- <div class="dd-layout-aside"
           :style="logoGroupStyle"
           v-if="hasSideMenu"> -->
      <!-- <SideMenu :collapse="collapse"></SideMenu> -->
      <!-- </div> -->
      <div class="dd-layout-main">
        <transition name="fade-transverse">
          <router-view></router-view>
        </transition>
        <StatuBar />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  data () {
    return {
      theme: 'default',
      collapse: false,
      content: '展开菜单',
      hasSideMenu: false
    }
  },
  watch: {
    sideMenu () {
      this.hasSideMenu = !(this.sideMenu.length === 0)
    }
  },
  methods: {
    ...mapMutations([
      'setSideMenu',
      'setStatus'
    ]),
    toggleAside () {
      this.collapse = !this.collapse
      this.content = this.collapse ? '展开菜单' : '收起菜单'
    }
    // // 更新侧边栏
    // refreshSideMenu (menu) {
    //   let sideMenu = menu.map(i => i.children[0])

    //   this.setSideMenu({
    //     sideMenu
    //   })
    // }
  },
  mounted () {
    // this.refreshSideMenu(menu)
  },
  computed: {
    logoGroupStyle () {
      return `width:${this.collapse ? 40 : 140}px;`
    },
    rotate () {
      return `transform:rotate(${this.collapse ? 90 : 0}deg);`
    },
    ...mapState({
      sideMenu: state => state.menu.sideMenu
    })
  },
  components: {
    HeaderMenu: () => import('./components/HeaderMenu'),
    HeaderRight: () => import('./components/HeaderRight'),
    StatuBar: () => import('./components/StatuBar')
    // SideMenu: () => import('./components/SideMenu')
  }
}
</script>

<style lang="scss">
@import "@/assets/style/theme/default.scss";
</style>
