<template>
  <div>
    <div class="dd-mb">
      <el-button @click='dialogTableVisible=true'>New Object</el-button>
    </div>
    <div class="row">
      <el-table :data='objd'
                border
                style="width: 100%">
        <el-table-column type='index'
                         label="No" />
        <el-table-column prop="objn"
                         label="Name"
                         min-width="150" />
        <el-table-column prop="obsz"
                         min-width="100"
                         label="Size" />
        <el-table-column prop="updt"
                         min-width="120"
                         label="Update time" />
        <el-table-column prop="logt"
                         min-width="120"
                         label="Logging time" />
        <el-table-column prop="disp"
                         min-width="100"
                         label="Display" />
        <el-table-column prop="logs"
                         min-width="100"
                         label="Logging" />
        <el-table-column label="Attribute">
          <template slot-scope="scope">
            <el-button type="text"
                       @click="go(scope.row)">set attribute</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog title="Object Setup"
               @closed='close'
               :visible.sync="dialogTableVisible">
      <div class="row"
           v-if="isDetail">
        <h3 class="dd-title">Object setup</h3>
        <el-form ref='objectSetupFrom'
                 :model="objectSetupFrom"
                 label-width="100px">
          <el-form-item label="Object name">
            <el-input v-model="objectSetupFrom.objn"></el-input>
          </el-form-item>
          <el-form-item label="Object size">
            <el-input v-model="objectSetupFrom.obsz"></el-input>
          </el-form-item>
          <el-form-item label="Update time">
            <el-input v-model="objectSetupFrom.updt"></el-input>
          </el-form-item>
          <el-form-item label="Logging time">
            <el-input v-model="objectSetupFrom.logt"></el-input>
          </el-form-item>
          <el-form-item label="Display">
            <el-radio-group v-model="objectSetupFrom.disp">
              <el-radio :label="1">Yes</el-radio>
              <el-radio :label="0">No</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="Logging">
            <el-radio-group v-model="objectSetupFrom.logs">
              <el-radio :label="1">Yes</el-radio>
              <el-radio :label="0">No</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
        <el-button @click='isDetail=false'>submit</el-button>
      </div>
      <div class="row"
           v-if="objectIndexSetupList.length &&!isDetail">
        <h3>Object index setup</h3>
        <el-table :data='objectIndexSetupList'
                  border>
          <el-table-column prop="obix"
                           label="Index">
          </el-table-column>
          <el-table-column label="Prefix">
            <template slot-scope="scope">
              <el-input v-model="scope.row.pref"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="Suffix">
            <template slot-scope="scope">
              <el-input v-model="scope.row.suff"></el-input>
            </template>
          </el-table-column>
        </el-table>

        <el-button type="primary"
                   @click="submitObjectDetail">submit</el-button>
        <el-button @click="handleCancel">cancel</el-button>

      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Array,
      default: () => ([])
    }
  },
  mounted () {

  },
  data () {
    return {
      dialogTableVisible: false,
      isDetail: true,
      objd: [],
      objectSetupFrom: {},
      objectIndexSetupList: []
    }
  },
  watch: {
    'objectSetupFrom.obsz' (val) {
      let res = []
      for (let i = 0; i < val; i++) {
        res.push({
          obix: i + 1,
          pref: '',
          suff: ''
        })
      }
      this.objectIndexSetupList = res
    },
    value: {
      handler () {
        this.objd = this.value
      },
      immediate: true
    }
  },
  methods: {
    submitObjectDetail () {
      this.objectSetupFrom.preAndSuff = this.objectIndexSetupList
      this.objd.push(this.objectSetupFrom)
      this.$emit('input', this.objd)
      this.dialogTableVisible = false
    },
    handleCancel () {
      this.isDetail = true
      this.objectIndexSetupList = this.objectIndexSetupList.map(i => {
        i.pref = ''
        i.suff = ''
        return i
      })
    },
    go (row) {
      this.$router.push({ name: 'configration-edit', params: { data: JSON.stringify(row) } })
      // console.log(row)
    },
    close () {
      this.isDetail = true
      // this.objd = []
      this.objectSetupFrom = {
        oatt: []
      }
      this.objectIndexSetupList = []
    }
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/style/public.scss";
</style>
