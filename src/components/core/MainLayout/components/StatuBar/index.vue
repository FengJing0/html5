<template>
  <div class="statuBar">
    <div>
      comm:{{status.comm||''}}
    </div>
    <div>
      dalm:{{status.dalm||''}}
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
export default {
  props: {
    status: {
      type: Object,
      required: true
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
