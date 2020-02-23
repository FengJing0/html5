<template>
  <Container type="card-full"
             :scorll='false'>
    <div class="row flex">
      <div class="dd-title">Data Monitoring</div>
      <div class="btnGroup">
        <span>Object Name: </span>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <el-select v-model="objName">
          <el-option v-for="item in objList"
                     :key="item"
                     :label="item"
                     :value="item">
          </el-option>
        </el-select>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <el-button @click='handleShow(null,"History")'>history</el-button>
        <el-button @click='handleShow(null,"Current")'>current</el-button>
      </div>
    </div>
    <el-table :data="data"
              v-if='tableData.length'
              border
              :height='tableHeight'
              class="table">
      <el-table-column prop="prop"
                       label="attrbute"
                       min-width="180">
      </el-table-column>
      <el-table-column prop="val"
                       label="value"
                       min-width="180">
      </el-table-column>
      <el-table-column label=" "
                       width="170">
        <template slot-scope="scope">
          <div class='btn'
               v-if="scope.row.prop!=='tstp'">
            <el-button type="text"
                       v-if="scope.row.writable"
                       @click='handleWrite(scope.row)'>write</el-button>
            <el-button type="text"
                       @click='handleShow(scope.row,"History")'>history</el-button>
            <el-button type="text"
                       @click='handleShow(scope.row,"Current")'>current</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div v-else
         class="noData">
      NO DATA
    </div>
    <CurrentChartDialog ref='CurrentChartDialog'
                        :objName='objName' />
    <HistoryChartDialog ref='HistoryChartDialog'
                        :objName='objName' />
    <WriteDialog ref='WriteDialog'
                 :objName='objName' />
  </Container>
</template>

<script>
import Mixins from '@/mixins'
import { mapState } from 'vuex'
import moment from 'moment'
export default {
  mixins: [Mixins],
  data () {
    return {
      objName: ''
    }
  },
  computed: {
    ...mapState({
      dataList: state => state.Status.alarmList,
      objectData: state => state.SetUpData.objectData,
      writableList: state => state.Status.writableList
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
      return Object.keys(this.tableData[0])
    },
    currentWritableData () {
      return this.writableList.find(j => j.objn === this.objName)
    },
    data () {
      let data = []

      this.tableKey.forEach(i => {
        if (i !== 'objn') {
          data.push({
            prop: i,
            val: this.tableData[0][i],
            writable: !!this.currentWritableData[i]
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
      }
    }
  },
  methods: {
    handleWrite (row) {
      this.$refs.WriteDialog.handleShow(row.prop)
    },
    handleShow (row, type) {
      this.$refs[type + 'ChartDialog'].handleShow(row)
    },
    format (time) {
      return moment(time * 1000).format('YYYY-MM-DD HH:mm:ss')
    }
  },
  components: {
    CurrentChartDialog: () => import('./components/CurrentChartDialog'),
    HistoryChartDialog: () => import('./components/HistoryChartDialog'),
    WriteDialog: () => import('./components/WriteDialog')
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
.btnGroup {
  width: 700px;
  /deep/.el-select {
    width: 350px;
  }
}
</style>
