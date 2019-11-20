<template>
  <div class="statuBar">
    <div>
      COMM:{{commState||''}}
    </div>
    <div>
      {{status.mach||''}}
    </div>
    <div>
      galm:{{status.galm||''}}
    </div>
    <div>
      mode:{{status.mode||''}}
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      status: state => state.Status.status
    }),
    commState () {
      return this.status.model === 'ACTIVE' ? 'OK' : this.status.model
    }
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
