<template>
  <div class="layout-main"
       :class="theme">
    <div class="dd-layout-header">
      <div class="logo-group">
        <p>Neuron</p>
        <!-- <img v-if="collapse"
             src="@/assets/image/logo/header-icon-only.png">
        <img v-else
             src="@/assets/image/logo/header.png"> -->
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
          <!-- <keep-alive :include="keepAliveList"> -->
          <router-view></router-view>
          <!-- </keep-alive> -->
        </transition>
        <StatuBar />
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  data () {
    return {
      theme: 'default',
      collapse: false,
      // content: '展开菜单',
      // hasSideMenu: false,
      // keepAliveList: ['configration_index'],
      func: 22
    }
  },
  methods: {
    initData () {
      this.$ws().test().set({ success: this.receiveStatus }).set({ success: this.receiveAlarmList }).set({ success: this.setData })
      this.$ws().send({
        func: this.func
      })
    },
    ...mapMutations([
      'setAllData',
      'setAlarmStatus',
      'setAlarmList'
    ]),
    setData (res) {
      if (+res.func === this.func) {
        this.$ws().remove(this.setData)
        this.setAllData(res)
      }
    },
    receiveStatus (data) {
      if (!data.func && data.tstp) {
        this.setAlarmStatus(data)
      }
    },
    receiveAlarmList (data) {
      if (!data.func && data.tele) {
        this.setAlarmList(data.tele)
      }
    }
  },
  beforeMount () {
    this.initData()
  },
  beforeDestroy () {
    this.$ws().remove(this.receiveStatus)
  },
  components: {
    HeaderMenu: () => import('./components/HeaderMenu'),
    HeaderRight: () => import('./components/HeaderRight'),
    StatuBar: () => import('./components/StatuBar')

  }
}
</script>

<style lang="scss">
@import "@/assets/style/theme/default.scss";
</style>
