<template>
  <Container type="card-full"
             :scorll='false'>
    <span class="dd-title">Overview</span>
    <p>Driver Name: {{driverName}} &nbsp;&nbsp;&nbsp;&nbsp; {{driverType}}</p>
    <div class="dd-mb"
         v-if="showObject">
      <p>Object</p>
      <ObjectTable :objectList='res.objd'
                   showAttr />
    </div>

    <div class="dd-mb"
         v-if="showEvent">
      <p>Event</p>
      <EventTable :eventList='res.msgd' />
    </div>

    <el-button @click="submit">submit</el-button>
  </Container>
</template>

<script>
import indexMixin from '../mixins'
import { mapGetters } from 'vuex'
import { clone } from '@/utils'
import { Ethernet, Serial } from '@/config'
import AttributeTable from './components/attrbuteTable'
import EventTable from './components/eventTable'
import ObjectTable from './components/objectTable'
export default {
  mixins: [indexMixin],
  data () {
    return {
      driverName: '',
      minWidth: '150'
    }
  },
  computed: {
    ...mapGetters(['res']),
    driverType () {
      const chdv = this.res.chdv
      let tmp
      tmp = Ethernet.filter(i => i.val === chdv)[0]
      if (tmp) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.driverName = tmp.label
        return 'Ethernet drivers'
      }
      tmp = Serial.filter(i => i.val === chdv)[0]
      if (tmp) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.driverName = tmp.label
        return 'Serial drivers'
      }
      return ''
    },
    showObject () {
      return this.res.objd && this.res.objd.length
    },
    showEvent () {
      return this.res.msgd && this.res.msgd.length
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
    AttributeTable,
    EventTable,
    ObjectTable
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/style/public";
</style>
