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
    <el-table :data="tableData"
              v-if='tableData.length'
              border
              class="table">
      <el-table-column v-for="key in tableKey"
                       :key='key'
                       :prop="key"
                       :label="key"
                       min-width="180">
        <template slot-scope="scope">
          <span>{{key==='tstp'?format(scope.row[key]): scope.row[key] }}</span>
        </template>
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
      return this.dataList.filter(i => i.objn === this.objName)
    },
    tableKey () {
      return Object.keys(this.dataList[0])
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
      return moment(time).format('YYYY-MM-DD HH:mm:ss')
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
