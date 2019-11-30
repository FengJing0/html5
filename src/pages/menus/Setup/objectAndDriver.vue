<template>
  <Container type="card-full"
             :scorll='false'>
    <div class="row flex">
      <div class="dd-title">Object And Driver</div>
      <div class="driverName">{{driverName}}</div>
      <div class="btnGroup">
        <DriverSetup />
      </div>
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
import { Ethernet, Serial } from '@/config/index'
import { mapState } from 'vuex'
export default {
  mixins: [indexMixin],
  computed: {
    ...mapState({
      driverData: state => state.SetUpData.driverData
    }),
    driverName () {
      let res = this.driverList.filter(i => i.val === this.driverData.chdv)
      return res.length ? res[0].label : ''
    },
    driverList () {
      return [...Ethernet, ...Serial]
    }
  },
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
.flex {
  display: flex;
  justify-content: space-between;
  .driverName {
    line-height: 40px;
  }
}
</style>
