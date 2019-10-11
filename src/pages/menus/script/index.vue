<template>
  <Container type="card-full"
             :scorll='false'>
    <div class="dd-title">Script</div>
    <div class='row'>
      <el-radio-group v-model="csub"
                      class="dd-mr">
        <el-radio :label="0">备选项</el-radio>
        <el-radio :label="1">备选项</el-radio>
        <el-radio :label="2">备选项</el-radio>
      </el-radio-group>
      <el-button @click='handleSubmit'>submit</el-button>
    </div>
    <el-table :data='scriptData'
              border>
      <el-table-column label="stmt"
                       min-width="120">
        <template slot-scope="scope">
          <el-select v-model="scope.row.stmt"
                     @change='handleChange(scope.$index)'
                     placeholder="">
            <el-option v-for="item in scriptList"
                       :key="item.val"
                       :label="item.val"
                       :value="item.val">
            </el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="expr"
                       min-width="300">
        <template slot-scope="scope">
          <el-input type="textarea"
                    :rows="2"
                    placeholder="please input"
                    v-model="scope.row.expr">
          </el-input>
        </template>
      </el-table-column>
    </el-table>
  </Container>
</template>

<script>
import indexMixin from '../mixins'
import { ScriptList } from '@/config/index'
export default {
  mixins: [indexMixin],
  data () {
    return {
      scriptData: [{
        stmt: '',
        expr: ''
      }, {
        stmt: '',
        expr: ''
      }],
      scriptList: ScriptList,
      csub: 0
    }
  },
  methods: {
    handleChange (index) {
      if (index + 1 === this.scriptData.length) {
        this.scriptData.push({ stmt: '', expr: '' })
      }
    },
    handleSubmit () {
      const list = this.scriptData.filter(i => i.stmt && i.expr)
      console.log(list)
    }
  }
}
</script>

<style scoped lang='scss'>
@import "@/assets/style/public";
</style>
