<template>
  <div class="statuBar">
    <div>
      comm:{{comm}}
    </div>
    <div>
      dalm:{{dalm}}
    </div>
    <div>
      galm:{{galm}}
    </div>
    <div>
      mode:{{mode}}
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      comm: '',
      dalm: '',
      galm: '',
      mode: ''
    }
  },
  mounted () {
    this.$ws({ success: this.receiveStatus }).test()
    // this.refreshSideMenu()
    // console.log(this.menu)
  },
  methods: {
    receiveStatus (data) {
      if (!data.func) {
        this.comm = data.comm
        this.dalm = data.dalm
        this.galm = data.galm
        this.mode = data.mode
      }
    }
  },
  beforeDestroy () {
    this.$ws().remove(this.receiveStatus)
  }
}
</script>

<style scoped lang='scss'>
@import "@/assets/style/public.scss";
.statuBar {
  position: absolute;
  bottom: 0;
  left: 20px;
  right: 20px;
  height: 50px;
  display: flex;
  div {
    flex: 1;
    text-align: center;
    line-height: 50px;
    font-size: $font-size-sub;
    font-weight: normal;
  }
}
</style>
