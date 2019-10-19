<template>
  <Container type="card-full"
             :scorll='false'>
    <div class="dd-title">Script</div>
    <div class='row'>
      <ScriptTypeSelect v-model="type" />
      <el-button class='dd-fr'
                 @click='handleSubmit'>submit</el-button>
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
      type: {
        name: '',
        subr: ''
      }
    }
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
    readSubroutine (subr) {
      this.$ws().set({ success: this.getData }).send({ func: 33, subr })
    },
    getData (data) {
      if (data.func === 33) {
        this.$ws().remove(this.getData)

        if (data.rows) {
          if (data.rows.length === 0) {
            this.init()
          } else {
            this.scriptData = data.rows
          }
        } else {
          this.init()
        }
      }
    },
    handleSubmit () {
      if (!this.type.subr) {
        this.$message.error('选择')
        return
      }
      const rows = this.scriptData
      const { name, subr } = this.type
      this.$ws().set().send({
        func: 34,
        csub: 0,
        name,
        subr,
        nrow: rows.length,
        rows
      })
      // console.log(list)
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
  watch: {
    'type.subr' (val) {
      if (val) {
        this.readSubroutine(val)
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
