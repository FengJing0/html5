<template>
  <Container type="card-full"
             :scorll='false'>
    <div class="dd-title">Current Alarm</div>
    <el-table :data='grow'
              border
              :height='tableHeight'
              style="width: 100%">
      <el-table-column min-width="130"
                       prop="atim"
                       label="Time">
        <template slot-scope="scope">
          {{format(scope.row.atim||'')}}
        </template>
      </el-table-column>
      <el-table-column min-width="60"
                       prop="acat"
                       label="Categ" />
      <el-table-column prop="astt"
                       label="State"
                       min-width="50" />
      <el-table-column min-width="100"
                       label="Comment">
        <template slot-scope="scope">
          <div @click="handleClick(scope.row)">{{scope.row.amod}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="comt"
                       min-width="400"
                       label="ACTIVE ENABLED" />
    </el-table>
  </Container>
</template>

<script>
import Mixins from '@/mixins'
import moment from 'moment'
export default {
  mixins: [Mixins],
  data () {
    return {
      minWidth: 100
    }
  },
  computed: {
    grow () {
      return this.$store.state.Status.status.grow || []
    }
  },
  methods: {
    handleClick (row) {
      if (row.amod === 'UNACKALARM') {
        this.$ws().send({
          func: 80,
          alid: row.alid,
          actn: 'acknowledge'
        })
      }
    },
    format (time) {
      return moment(time * 1000).format('YYYY-MM-DD HH:mm:ss')
    }
  }
}
</script>

<style lang='scss' scoped>
</style>
