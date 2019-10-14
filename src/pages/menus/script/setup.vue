<template>
  <Container type="card-full"
             :scorll='false'>
    <div class="dd-title">Script</div>
    <div class='row'>
      <ScriptTypeSelect v-model="type" />
      <el-button @click='handleSubmit'>submit</el-button>
    </div>
    <el-table class="scriptTable"
              :data='scriptData'
              border>
      <el-table-column label="stmt"
                       min-width="120">
        <template slot-scope="scope">
          <el-select v-model="scope.row.stmt"
                     style='width:100%;'
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
          <el-input placeholder=""
                    :ref='"input-"+scope.$index'
                    @keyup.enter.native='add(scope.$index)'
                    @keyup.up.native='moveUp(scope.$index)'
                    @keyup.down.native='moveDown(scope.$index)'
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
import ScriptTypeSelect from './components/scriptType'
export default {
  mixins: [indexMixin],
  data () {
    return {
      scriptData: [],
      scriptList: ScriptList,
      type: null
    }
  },
  beforeMount () {
    this.init()
  },
  methods: {
    init () {
      let i = 10
      while (i--) {
        this.scriptData.push({
          stmt: '',
          expr: ''
        })
      }
    },
    handleSubmit () {
      const list = this.scriptData
      console.log(list)
    },
    add (index) {
      if (index === this.scriptData.length - 1) {
        this.scriptData.push({ stmt: '', expr: '' })
      }
    },
    moveUp (index) {
      if (index > 0) {
        this.$refs['input-' + (index - 1)].focus()
      }
    },
    moveDown (index) {
      if (index < this.scriptData.length - 1) {
        this.$refs['input-' + (index + 1)].focus()
      }
    }
  },
  components: {
    ScriptTypeSelect
  }
}
</script>

<style scoped lang='scss'>
@import "@/assets/style/public";
.scriptTable {
  /deep/input {
    border-color: transparent;
  }
  /deep/td {
    padding: 10px 0;
  }
}
</style>
