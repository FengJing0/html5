<template>
  <Container type="card-full"
             :scorll='false'>
    <div class="dd-title">Alarm</div>
    <el-table :data='grow'
              border
              :height='tableHeight'
              style="width: 100%">
      <el-table-column :min-width="minWidth"
                       prop="atim"
                       label="Time">
        <template slot-scope="scope">
          {{format(scope.row.atim||'')}}
        </template>
      </el-table-column>
      <el-table-column min-width="40"
                       prop="acat"
                       label="Categ" />
      <el-table-column prop="astt"
                       label="State"
                       min-width="40" />
      <el-table-column prop="amod"
                       min-width="70"
                       label="Comment" />
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
    format (time) {
      return moment(time * 1000).format('YYYY-MM-DD HH:mm:ss')
    }
  }
}
</script>

<style lang='scss' scoped>
</style>
