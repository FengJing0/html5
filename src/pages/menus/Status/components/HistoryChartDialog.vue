<template>
  <el-dialog :title='propName||objName'
             :visible.sync="dialogVisible"
             width="900px"
             @closed="handleClose">
    <div v-if='step===1'
         class="select">
      <el-date-picker v-model="time"
                      range-separator="-"
                      start-placeholder="start"
                      end-placeholder="end"
                      type="datetimerange">
      </el-date-picker>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <el-button @click="handleSubmit">submit</el-button>
    </div>
    <div :style="chartStyle"
         v-else
         ref="chartContainer"></div>
  </el-dialog>
</template>

<script>
import charts from 'echarts'
export default {
  props: {
    objName: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      dialogVisible: false,
      chartInstance: null,
      propName: null,
      step: 1,
      params: {},
      time: [new Date(), new Date()],
      option: {
        grid: {
          top: '20px'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999'
            }
          }
        },
        xAxis: {
          type: 'category',
          data: []
        },
        yAxis: {
          type: 'value'
        },
        series: []
      }
    }
  },
  computed: {
    chartStyle () {
      return {
        width: '900px',
        height: '700px'
      }
    }
  },
  watch: {

  },
  methods: {
    handleSubmit () {
      const [start, end] = this.time
      this.params = {
        'func': 82,
        'srcn': this.objName,
        'attn': this.propName || '',
        'fend': 0,
        'tokn': -1,
        'fryr': start.getFullYear(),
        'frmo': start.getMonth() + 1,
        'frda': start.getDate(),
        'frhr': start.getHours(),
        'frmi': start.getMinutes(),
        'toyr': end.getFullYear(),
        'tomo': end.getMonth() + 1,
        'toda': end.getDate(),
        'tohr': end.getHours(),
        'tomi': end.getMinutes()
      }
      this.step = 2
      this.$ws().set({ success: this.setData }).send(this.params)
    },
    setData (data) {
      if (data.func === 82) {
        console.log(data)
      }
    },
    initChart () {
      if (!this.chartInstance) {
        this.chartInstance = charts.init(this.$refs.chartContainer)
      }
      if (this.propName) {
        this.option.series.push({
          data: [],
          type: 'line',
          name: this.propName
        })
      } else {
        Object.keys(this.status).forEach(i => {
          if (i !== 'tstp' && i !== 'objn') {
            this.option.series.push({
              data: [],
              type: 'line',
              name: i
            })
          }
        })
      }
      this.chartInstance.setOption(this.option)
    },
    handleClose () {
      this.option.series = []
      this.option.xAxis.data = []
      this.propName = null
      this.step = 1
      this.params = {}
      // this.chartInstance.clear()
    },
    handleShow (row, type) {
      this.propName = row ? row.prop : null
      this.dialogVisible = true
      // this.$nextTick(this.initChart)
    }
  }
}
</script>

<style lang='scss' scoped>
/deep/.el-dialog__body {
  padding: 0;
}
.select {
  padding: 20px;
}
</style>
