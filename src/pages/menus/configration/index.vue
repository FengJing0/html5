<template>
  <Container type="card-full"
             :scorll='false'>
    <div class="row">
      <span class="dd-title">Configration</span>
      <!-- <el-button @click='$router.go(-1)'>Back</el-button> -->
      <el-button @click='submit'>submit</el-button>
      <el-button @click="goEventSetup">Event Setup</el-button>
    </div>
    <div>
      <DriverSetup v-model="driverData" />
      <ObjectSetup v-model="objectData" />
    </div>
  </Container>
</template>

<script>
import indexMixin from '../mixins'
import DriverSetup from './components/driverSetup'
import ObjectSetup from './components/objectSetup'
export default {
  name: 'configration_index',
  mixins: [indexMixin],
  data () {
    return {
      isNew: true,
      driverData: {},
      objectData: []
    }
  },
  methods: {
    submit () {
      console.log(JSON.stringify(this.res))
    },
    goEventSetup () {
      this.$router.push({ name: 'configration-event', params: { data: JSON.stringify(this.res) } })
    },
    init () {
      let configration = sessionStorage.getItem('configration')
      if (configration) {
        configration = JSON.parse(configration)
        this.objectData = configration.objd
        this.driverData = {
          chdv: configration.chdv,
          chnl: configration.chnl
        }
      }
      let { name, data } = this.$route.params
      if (data) {
        data = JSON.parse(data)
        for (let i = 0, len = this.objectData.length; i < len; i++) {
          const item = this.objectData[i]
          if (item.objn === name) {
            item.oatt = data
            break
          }
        }
      }
    }
  },
  computed: {
    res () {
      return {
        ...this.driverData,
        objd: this.objectData
      }
    }
  },
  watch: {
    res: {
      handler (val) {
        sessionStorage.setItem('configration', JSON.stringify(val))
      },
      deep: true
    }
  },
  mounted () {
    this.init()
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
