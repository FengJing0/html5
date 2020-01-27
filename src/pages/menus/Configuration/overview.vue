<template>
  <Container type="card-full"
             :scorll='false'>
    <div class="flex">
      <div class="dd-title">Overview</div>
      <el-button @click="submit">submit</el-button>
    </div>
    <p>Driver Name: {{driverName}} &nbsp;&nbsp;&nbsp;&nbsp; {{driverType}}</p>
    <div class="dd-mb">
      <p>Object:</p>
      <ObjectTable showAttr />
    </div>

    <div class="dd-mb">
      <p>Event:</p>
      <EventTable :eventList='res.msgd' />
    </div>
  </Container>
</template>

<script>
import indexMixin from '../mixins'
import { mapGetters } from 'vuex'
import { clone } from '@/utils'
import EventTable from './components/eventTable'
import ObjectTable from './components/objectTable'
export default {
  mixins: [indexMixin],
  data () {
    return {
      minWidth: '150',
      driverName: '',
      driverType: ''
    }
  },
  computed: {
    ...mapGetters(['res']),
    driverList () {
      return this.$store.state.Device.deviceList
    }
  },
  watch: {
    'res.chdv': {
      handler (val) {
        if (!val) return
        let res = this.driverList.filter(i => i.val === this.res.chdv)
        this.driverName = res.length ? res[0].label : ''
        this.driverType = res.length ? res[0].type : ''
      },
      immediate: true
    }
  },
  methods: {
    submit () {
      let res = clone(this.res)
      res.objd.forEach(i => {
        if (i.preAndSuff) delete i.preAndSuff
      })
      res.func = 21
      this.$ws().send(this.res)
    }
  },
  components: {
    EventTable,
    ObjectTable
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/style/public";
.flex {
  display: flex;
  justify-content: space-between;
}
</style>
