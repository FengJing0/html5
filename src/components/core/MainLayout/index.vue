<template>
  <div class="layout-main"
       :class="theme">
    <div class="dd-layout-header">
      <div class="logo-group">
        <p>NEURON</p>
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
      loadData: false
    }
  },
  methods: {
    initData () {
      this.$ws().test().set({ success: this.receiveStatus }).set({ success: this.receiveAlarmList }).set({ success: this.setDevice }).set({ success: this.setData }).set({ success: this.getWritableObj })
      setTimeout(() => {
        this.$ws().send({
          func: 23
        })
      }, 500)
    },
    ...mapMutations([
      'setAllData',
      'setAlarmStatus',
      'setAlarmList'
    ]),
    setData (res) {
      if (+res.func === 22) {
        this.$ws().send({
          func: 60
        })
        this.$ws().remove(this.setData)
        this.setAllData(res)
      }
    },
    setDevice (data) {
      if (+data.func === 23) {
        this.$ws().remove(this.setDevice)
        this.$store.commit('setDeviceList', data.rows)
      }
    },
    getWritableObj (data) {
      if (+data.func === 60) {
        this.$ws().remove(this.getWritableObj)
        this.$store.commit('setWritableList', data.tele)
      }
    },
    receiveStatus (data) {
      if (!data.func && data.tstp) {
        if (data.mode !== 'INACTIVE' && !this.loadData) {
          this.loadData = true
          this.$ws().send({
            func: 22
          })
        }
        this.setAlarmStatus(data)
      }
    },
    receiveAlarmList (data) {
      if (!data.func && data.tele) {
        this.setAlarmList(data.tele)
      }
    }
  },
  mounted () {
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
