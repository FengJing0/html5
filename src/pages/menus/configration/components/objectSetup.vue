<template>
  <div>
    <div class="dd-mb">
      <el-button @click='dialogTableVisible=true'>New Object</el-button>
    </div>
    <div class="row">
      <ObjectTable :objectList='objd'
                   :showBtn='true'
                   @go='go' />
    </div>
    <el-dialog @closed='close'
               :title='isDetail?"Object setup":"Object index setup"'
               :visible.sync="dialogTableVisible">
      <div class="row"
           v-if="isDetail">
        <el-form ref='objectSetupFrom'
                 :rules="objectSetupFromRules"
                 :model="objectSetupFrom"
                 class="dd-mb"
                 label-width="160px">
          <el-form-item label="Object name"
                        prop="objn">
            <el-input v-model="objectSetupFrom.objn"></el-input>
          </el-form-item>
          <el-form-item label="Object size"
                        prop="obsz">
            <el-input-number v-model="objectSetupFrom.obsz"
                             :controls='false'
                             :precision='0'
                             :min="1"
                             :max="9" />
          </el-form-item>
          <el-form-item label="Update time"
                        prop="updt">
            <el-input-number v-model="objectSetupFrom.updt"
                             :controls='false'
                             :precision='0'
                             :min="0" />
          </el-form-item>
          <el-form-item label="Logging time"
                        prop="logt">
            <el-input-number v-model="objectSetupFrom.logt"
                             :controls='false'
                             :precision='0'
                             :min="0" />
          </el-form-item>
          <el-form-item label="Timestamp display"
                        prop="logt">
            <el-radio-group v-model="objectSetupFrom.tstd">
              <el-radio :label="1">Yes</el-radio>
              <el-radio :label="0">No</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="Display"
                        prop="disp">
            <el-radio-group v-model="objectSetupFrom.disp">
              <el-radio :label="1">Yes</el-radio>
              <el-radio :label="0">No</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="Logging"
                        prop="logs">
            <el-radio-group v-model="objectSetupFrom.logs">
              <el-radio :label="1">Yes</el-radio>
              <el-radio :label="0">No</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
        <el-button @click='submitObjectSetupFrom'>submit</el-button>
      </div>
      <div class="row"
           v-if="objectIndexSetupList.length &&!isDetail">
        <el-table :data='objectIndexSetupList'
                  class="dd-mb"
                  border>
          <el-table-column label="Index">
            <template slot-scope="scope">
              {{scope.row.obix+1}}
            </template>
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
import ObjectTable from './objectTable'
import { mapMutations, mapState } from 'vuex'
export default {
  mounted () {

  },
  data () {
    return {
      dialogTableVisible: false,
      isDetail: true,
      objectSetupFrom: {},
      objectSetupFromRules: {
        objn: [
          { required: true, message: '请输入name', trigger: 'blur' },
          { max: 30, message: 'max 30', trigger: 'blur' }
        ],
        obsz: [
          { required: true, message: '请输入size', trigger: 'blur' }
        ],
        updt: [
          { required: true, message: '请输入update time', trigger: 'blur' }
        ],
        logt: [
          { required: true, message: '请输入logging time', trigger: 'blur' }
        ],
        disp: [
          { required: true, message: '请select display', trigger: 'blur' }
        ],
        logs: [
          { required: true, message: '请select logging', trigger: 'blur' }
        ]
      },
      objectIndexSetupList: []
    }
  },
  watch: {
    'objectSetupFrom.obsz' (val) {
      let res = []
      for (let i = 0; i < val; i++) {
        res.push({
          obix: i,
          pref: '',
          suff: ''
        })
      }
      this.objectIndexSetupList = res
    }
  },
  methods: {
    submitObjectSetupFrom () {
      this.$refs.objectSetupFrom.validate((valid) => {
        if (valid) {
          this.isDetail = false
          // alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    submitObjectDetail () {
      let list = this.objectIndexSetupList.map(i => i.pref + i.suff)
      let length = list.length
      let newLength = [...new Set(list)].length
      if (length && length === newLength) {
        this.objectSetupFrom.preAndSuff = this.objectIndexSetupList
        this.addObjectData(this.objectSetupFrom)
        this.dialogTableVisible = false
      } else {
        this.$message.error("Don't repeat")
      }
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
      // console.log(row)
      this.$router.push({ name: 'configration-edit', params: { data: row.objn } })
    },
    close () {
      this.isDetail = true
      this.objectSetupFrom = {
        oatt: []
      }
      this.objectIndexSetupList = []
      this.$refs.objectSetupFrom && this.$refs.objectSetupFrom.clearValidate()
    },
    ...mapMutations(['addObjectData'])
  },
  computed: {
    ...mapState({
      objd: state => state.SetUpData.objectData
    })
  },
  components: {
    ObjectTable
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/style/public.scss";
</style>
