<template>
  <div class="statuBar">
    <div :class="status.comm==='UP'?'green':'red'">
      COMM&nbsp;{{status.comm||''}}
    </div>
    <div>
      {{status.mach||''}}
    </div>
    <div :class="status.mode==='ACTIVE'?'green':status.mach==='STANDBY'?'yellow':'red'">
      {{status.mode||''}}
    </div>
    <div :class="status.mqcn==='MQDISCONNECT'?'red':'green'">
      {{status.mqcn||'MQDISCONNECT'}}
    </div>
    <div :class="galm==='ALARM'?'red':'green'">
      {{galm}}
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
    },
    galm () {
      return this.status.galm === 'NON-EXIST' ? 'NO ALARM' : 'ALARM'
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
  .red {
    color: $color-danger;
  }
  .green {
    color: $color-success;
  }
  .yellow {
    color: $color-warning;
  }
}
</style>
