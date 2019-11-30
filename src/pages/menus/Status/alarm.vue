<template>
  <Container type="card-full"
             :scorll='false'>
    <div class="dd-title">Alarm</div>
    <el-table :data='grow'
              border
              height='500'
              style="width: 100%">
      <el-table-column :min-width="minWidth"
                       prop="atim"
                       label="Time">
        <template slot-scope="scope">
          {{format(scope.row.atim||'')}}
        </template>
      </el-table-column>
      <el-table-column :min-width="minWidth"
                       prop="acat"
                       label="Categ" />
      <el-table-column prop="astt"
                       label="State"
                       :min-width="minWidth" />
      <el-table-column prop="amod"
                       :min-width="minWidth"
                       label="Comment" />
      <el-table-column prop="comt"
                       min-width="300"
                       label="ACTIVE ENABLED" />
    </el-table>
  </Container>
</template>

<script>
import moment from 'moment'
export default {
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
