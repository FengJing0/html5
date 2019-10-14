<template>
  <Container type="card-full"
             :scorll='false'>
    <div class="row">
      <div class="dd-title">Object Setup</div>
      <DriverSetup />
    </div>
    <div>
      <ObjectSetup />
    </div>
  </Container>
</template>

<script>
import indexMixin from '../mixins'
import DriverSetup from './components/driverSetup'
import ObjectSetup from './components/objectSetup'

// import { mapState, mapMutations } from 'vuex'
export default {
  name: 'configration_index',
  mixins: [indexMixin],
  data () {
    return {
    }
  },
  methods: {
    // goEventSetup () {
    //   this.$router.push({ name: 'configration-event' })
    // }
  },
  // computed: {
  //   ...mapState({
  //     event: state => state.SetUpData.event,
  //     res: state => state.SetUpData.res
  //   })
  // },
  components: {
    DriverSetup,
    ObjectSetup
  }
}
</script>

<style scoped lang='scss'>
@import "@/assets/style/public";
/deep/.el-input-number {
  width: 100%;
  &.is-without-controls .el-input__inner {
    text-align: left;
  }
}
</style>
