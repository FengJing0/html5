<template>
  <Container type="card-full"
             :scorll='false'>
    <span class="dd-title">Overview</span>
    <p>Driver Name: {{driverName}} &nbsp;&nbsp;&nbsp;&nbsp; {{driverType}}</p>
    <div class="dd-mb"
         v-if="showObject">
      <p>Object</p>
      <ObjectTable :objectList='testRes.objd'>
        <el-table-column label="Attribute"
                         slot='attributeTable'
                         min-width="500">
          <template slot-scope="scope">
            <AttributeTable :attributeList='scope.row.oatt'
                            :objectName='scope.row.objn' />
          </template>
        </el-table-column>
      </ObjectTable>
    </div>

    <div class="dd-mb"
         v-if="showEvent">
      <p>Event</p>
      <EventTable :eventList='testRes.msgd' />
    </div>

    <el-button @click="submit">submit</el-button>
  </Container>
</template>

<script>
import { mapGetters } from 'vuex'
import { clone } from '@/utils'
import exampleJson from './example.json'
import { Ethernet, Serial } from '@/config'
import AttributeTable from './components/attrbuteTable'
import EventTable from './components/eventTable'
import ObjectTable from './components/objectTable'
export default {
  data () {
    return {
      testRes: {
      },
      driverName: '',
      minWidth: '150'
    }
  },
  computed: {
    ...mapGetters(['res']),
    driverType () {
      const chdv = this.testRes.chdv
      let tmp
      tmp = Ethernet.filter(i => i.val === chdv)[0]
      if (tmp) {
        this.driverName = tmp.label
        return 'Ethernet drivers'
      }
      tmp = Serial.filter(i => i.val === chdv)[0]
      if (tmp) {
        this.driverName = tmp.label
        return 'Serial drivers'
      }
      return ''
    },
    showObject () {
      return this.testRes.objd && this.testRes.objd.length
    },
    showEvent () {
      return this.testRes.msgd && this.testRes.msgd.length
    }
  },
  mounted () {
    this.testRes = exampleJson
    console.log(this.testRes)
  },
  methods: {
    submit () {
      // let res = clone(this.res)
      // res.objd.forEach(i => {
      //   if (i.preAndSuff) delete i.preAndSuff
      // })
      // res.func = 21
      this.$ws().send(this.testRes)
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
