<template>
  <Container type="card-full"
             :scorll='false'>
    <span>Object List: </span>
    &nbsp;&nbsp;&nbsp;&nbsp;
    <el-select v-model="objName">
      <el-option v-for="item in objList"
                 :key="item"
                 :label="item"
                 :value="item">
      </el-option>
    </el-select>
    <el-table :data="data"
              v-if='tableData.length'
              border
              height='500'
              class="table">
      <el-table-column prop="prop"
                       label="attrbute"
                       min-width="180">
      </el-table-column>
      <el-table-column prop="val"
                       label="value"
                       min-width="180">
      </el-table-column>
    </el-table>
    <div v-else
         class="noData">
      NO DATA
    </div>
  </Container>
</template>

<script>
import { mapState } from 'vuex'
import moment from 'moment'
export default {
  data () {
    return {
      objName: ''
    }
  },
  computed: {
    ...mapState({
      dataList: state => state.Status.alarmList
    }),
    objList () {
      return this.dataList.map(i => i.objn)
    },
    tableData () {
      return this.dataList.filter(i => i.objn === this.objName).map(i => {
        if (i.tstp) {
          i.tstp = this.format(i.tstp)
        }
        return i
      })
    },
    tableKey () {
      return Object.keys(this.dataList[0])
    },
    data () {
      let data = []
      // this.tableData.foreach(())
      this.tableKey.forEach(i => {
        if (i !== 'objn') {
          data.push({
            prop: i,
            val: this.tableData[0][i]
          })
        }
      })
      return data
    }
  },
  watch: {
    objList: {
      handler (val) {
        if (val.length && this.objName === '') {
          this.objName = val[0]
        }
      },
      deep: true
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
.table {
  width: 100%;
  margin-top: 20px;
}
.noData {
  text-align: center;
  margin: 50px;
}
</style>
