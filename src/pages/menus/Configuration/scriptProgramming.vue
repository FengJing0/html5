<template>
  <Container type="card-full"
             :scorll='false'>
    <div class="flex">
      <div class="dd-title">Script Programming</div>
      <div class='row'>
        <ScriptTypeSelect v-model="type"
                          @delete='init'
                          @submit="submit" />
        &nbsp;&nbsp;
        <el-button class='dd-fr'
                   type="primary"
                   @click='handleSubmit'>submit</el-button>
      </div>
    </div>
    <el-table class="scriptTable"
              :height='tableHeight'
              :data='scriptData'
              border>
      <el-table-column label="stmt"
                       min-width="120">
        <template slot-scope="scope">
          <el-select v-model="scope.row.stmt"
                     clearable
                     style='width:100%;'>
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
          <el-input-number v-if='scope.row.stmt==="POS"'
                           v-model="scope.row.expr"
                           :controls='false'></el-input-number>
          <el-input placeholder=""
                    v-else
                    v-model="scope.row.expr">
          </el-input>
        </template>
      </el-table-column>
      <el-table-column label="edit"
                       min-width="60">
        <template slot-scope="scope">
          <div class='btn'>
            <i class="el-icon-circle-plus plus"
               @click='add(scope.$index)'></i>&nbsp;
            <i class="el-icon-remove remove"
               @click='remove(scope.$index)'></i>
          </div>
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
      this.scriptData = []
      let i = 6
      while (i--) {
        this.scriptData.push({
          stmt: '',
          expr: ''
        })
      }
    },
    readSubroutine (subr) {
      this.$ws().set({ success: this.getData }).send({ func: 33, subr: +subr })
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
        this.$message.error('select a subroutine')
        return
      }
      this.$confirm('Are you sure submit these script programming', 'Submit', {
        type: 'warning'
      }).then(() => {
        const rows = this.scriptData
        const { name, subr } = this.type
        this.submit(name, subr, rows)
      }).catch(() => {
      })
    },
    submit (name, subr, rows) {
      if (!rows) {
        rows = []
      }
      this.$ws().set().send({
        func: 34,
        csub: 0,
        name,
        subr: +subr,
        nrow: rows.length,
        rows
      })
    },
    add (index) {
      this.scriptData.splice(index + 1, 0, { stmt: '', expr: '' })
    },
    remove (index) {
      this.scriptData.splice(index, 1)
    }
  },
  watch: {
    'type.subr' (val) {
      if (val) {
        this.readSubroutine(val)
      }
    }
  },
  computed: {
    tableHeight () {
      return window.innerHeight - 60 - 50 - 40 - 50
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
.btn {
  font-size: 24px;
  .plus {
    color: $color-primary;
    cursor: pointer;
  }
  .remove {
    color: $color-danger;
    cursor: pointer;
  }
}

/deep/.el-input-number {
  width: 100%;
  .el-input__inner {
    text-align: left;
  }
}
</style>
