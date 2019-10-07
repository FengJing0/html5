<template>
  <Container type="card-full"
             :scorll='false'>
    <div class="row">
      <span class="dd-title">Configration</span>
      <el-button @click='submit'>submit</el-button>
      <el-button @click="goEventSetup">Event Setup</el-button>
    </div>
    <div>
      <DriverSetup />
      <ObjectSetup />
    </div>
  </Container>
</template>

<script>
import indexMixin from '../mixins'
import DriverSetup from './components/driverSetup'
import ObjectSetup from './components/objectSetup'
import clone from '@/utils/clone'
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'configration_index',
  mixins: [indexMixin],
  data () {
    return {
      isNew: true,
      func: 21
    }
  },
  methods: {
    submit () {
      let res = clone(this.res)
      res.objd.map(i => {
        delete i.preAndSuff
        return i
      })
      res.func = this.func
      this.$ws().set({ success: this.succb }).send(res)
    },
    succb (res) {
      if (+res.func === +this.func) {
        this.$ws().remove(this.succb)
        console.log(res)
      }
    },
    goEventSetup () {
      this.$router.push({ name: 'configration-event', params: { data: JSON.stringify(this.res) } })
    },
    ...mapMutations(['setDriverData'])
  },
  computed: {
    ...mapState({
      event: state => state.SetUpData.event,
      res: state => state.SetUpData.res
    })
  },
  components: {
    DriverSetup,
    ObjectSetup
  }
}
</script>

<style scoped lang='scss'>
/deep/.el-input-number {
  width: 100%;
  &.is-without-controls .el-input__inner {
    text-align: left;
  }
}
</style>
