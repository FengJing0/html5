<template>
  <Container type="card-full"
             :scorll='false'>
    <div class="row">
      <div class="dd-title">Attribute</div>
      <el-button @click='$router.go(-1)'>Back</el-button>
      <el-button @click='dialogTableVisible=true'
                 type="primary">Create</el-button>
      <el-button @click='handleDelete'
                 type="danger">Delete</el-button>
      <el-button @click='handleSubmit'
                 type="primary"
                 :disabled="!canSubmit">Submit</el-button>
    </div>
    <div>
      <AttrbuteTable v-model="multipleSelection"
                     :attributeList='attributeList'
                     :showBtn='true'
                     :objectName='objn'
                     @add='addAddress' />
    </div>
    <el-dialog title="Data Attribute Setup"
               :visible.sync="dialogTableVisible"
               @closed='close'>
      <el-form ref='AttributeSetupFrom'
               :model="AttributeSetupFrom"
               :rules="AttributeSetupFromRules"
               label-width="120px">
        <el-form-item label="Attribute name"
                      prop="attn">
          <el-input v-model="AttributeSetupFrom.attn"></el-input>
        </el-form-item>
        <el-form-item label="Attribute type"
                      prop="attn">
          <el-select v-model="AttributeSetupFrom.attt">
            <el-option v-for="item in AttributeTypeList"
                       :key="item.val"
                       :label="item.val"
                       :value="item.val">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Decimal"
                      v-if="showDecimal"
                      prop="deci">
          <el-input-number v-model="AttributeSetupFrom.deci"
                           :controls='false'
                           :precision='0'
                           :min="0" />
        </el-form-item>
        <el-form-item label="Display"
                      prop="adis">
          <el-radio-group v-model="AttributeSetupFrom.adis">
            <el-radio :label="1">Yes</el-radio>
            <el-radio :label="0">No</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="Change"
                      prop="achg">
          <el-radio-group v-model="AttributeSetupFrom.achg">
            <el-radio :label="1">Yes</el-radio>
            <el-radio :label="0">No</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="Direction"
                      prop="attr">
          <el-radio-group v-model="AttributeSetupFrom.attr">
            <el-radio label="R">R</el-radio>
            <el-radio label="W">W</el-radio>
            <el-radio label="R/W">R/W</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="Read time"
                      prop="rtim"
                      v-if="showReadTime">
          <el-input-number v-model="AttributeSetupFrom.rtim"
                           :controls='false'
                           :precision='0'
                           :min="0" />
        </el-form-item>
      </el-form>
      <el-button @click='submitAttributeSetupFrom'>submit</el-button>
    </el-dialog>
    <el-dialog title="Data Address Setup"
               :visible.sync="addressVisible">
      <el-table :data='preAndSuff'
                class="dd-mb"
                border>
        <el-table-column label="Index"
                         :width="minWidth">
          <template slot-scope="scope">
            {{scope.row.obix+1}}
          </template>
        </el-table-column>
        <el-table-column prop="pref"
                         :width="minWidth"
                         label="Prefix" />
        <el-table-column label="Suffix"
                         :width="minWidth"
                         prop="suff" />
        <el-table-column label="Address">
          <template slot-scope="scope">
            <el-input v-model="scope.row.addr"></el-input>
          </template>
        </el-table-column>
      </el-table>
      <el-button @click='addressSubmit'
                 type="primary">submit</el-button>
    </el-dialog>
  </Container>
</template>

<script>
import { clone } from '@/utils/index'
import { AttributeTypeList } from '@/config/index'
import AttrbuteTable from './components/attrbuteTable'
import { mapState, mapMutations } from 'vuex'
export default {
  data () {
    return {
      minWidth: 80,
      objn: '',
      preAndSuff: [],
      dialogTableVisible: false,
      attributeList: [],
      AttributeSetupFrom: {
        aadd: []
      },
      AttributeSetupFromRules: {
        attn: [
          { required: true, message: 'pleace input Name', trigger: 'blur' },
          { max: 30, message: 'max 30', trigger: 'blur' }
        ],
        attt: [
          { required: true, message: 'pleace select Type', trigger: 'blur' }
        ],
        deci: [
          { required: true, message: 'pleace input Decimal', trigger: 'blur' }
        ],
        adis: [
          { required: true, message: 'pleace select Display', trigger: 'blur' }
        ],
        achg: [
          { required: true, message: 'pleace select Change', trigger: 'blur' }
        ],
        attr: [
          { required: true, message: 'pleace select Direction', trigger: 'blur' }
        ],
        rtim: [
          { required: true, message: 'pleact input Time', trigger: 'blur' }
        ]
      },
      AttributeTypeList: AttributeTypeList,
      addressVisible: false,
      activeAttributeRow: {},
      multipleSelection: []
    }
  },
  methods: {
    close () {

    },
    getFullName (pref, suff) {
      return `${pref}_${this.objn}_${suff}`
    },
    submitAttributeSetupFrom () {
      this.$refs.AttributeSetupFrom.validate((valid) => {
        if (valid) {
          this.attributeList.push(clone(this.AttributeSetupFrom))
          this.dialogTableVisible = false
          this.AttributeSetupFrom = {}
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleSubmit () {
      this.setObjectAttribute({ name: this.objn, attributeList: this.attributeList })
      this.$router.push({
        name: 'Setup-objectAndDriver'
      })
    },
    addAddress (row) {
      this.activeAttributeRow = row
      if (row.aadd.length) {
        this.preAndSuff = row.aadd
      }
      this.addressVisible = true
    },
    addressSubmit () {
      this.addressVisible = false
      this.$set(this.activeAttributeRow, 'aadd', clone(this.preAndSuff))
      this.resetPreAndSuff()
    },
    resetPreAndSuff () {
      this.preAndSuff = this.preAndSuff.map(i => {
        i.addr = ''
        return i
      })
    },
    handleDelete () {
      if (!this.multipleSelection.length) return
      this.$confirm('Are you sure delete these attribute?', 'delete attribute', {
        confirmButtonText: 'yes',
        cancelButtonText: 'no',
        type: 'warning'
      }).then(() => {
        const deleteList = this.multipleSelection.map(i => i.attn)
        this.attributeList = this.attributeList.filter(i => !deleteList.includes(i.attn))
        this.setObjectAttribute({ name: this.objn, attributeList: this.attributeList })
        // this.$message({
        //   type: 'success',
        //   message: 'delete success'
        // })
      }).catch(() => {
      })
    },
    init () {
      let name = this.$route.params.data
      if (name) {
        this.objn = name
        this.objectData.some(i => {
          if (i.objn === name) {
            this.preAndSuff = i.preAndSuff ? [...i.preAndSuff] : []
            if (i.oatt) {
              this.attributeList = i.oatt
            }
            return false
          }
        })
      }
    },
    ...mapMutations(['setObjectAttribute'])
  },
  computed: {
    showDecimal () {
      return this.AttributeSetupFrom.attt && this.AttributeSetupFrom.attt.indexOf('word') !== -1
    },
    showReadTime () {
      return this.AttributeSetupFrom.attr && this.AttributeSetupFrom.attr !== 'W'
    },
    canSubmit () {
      return this.attributeList.length && this.attributeList.every(i => i.aadd.length)
    },
    ...mapState({
      objectData: state => state.SetUpData.objectData
    })
  },
  watch: {
    'AttributeSetupFrom.attt' (val) {
      this.AttributeSetupFrom.deci = 0
    }
  },
  beforeMount () {
    this.init()
  },
  beforeRouteEnter (to, from, next) {
    if (to.params.data) {
      next()
    } else {
      next({ name: 'index' })
    }
  },
  components: {
    AttrbuteTable
  }
}
</script>

<style scoped lang='scss'>
/deep/.el-input-number {
  width: 100%;
  &.is-without-controls .el-input__inner {
    text-align: left;
  }
}
.addrs {
  border-bottom: 1px solid #ebeef5;
  padding: 5px;
  &:last-child {
    border: none;
  }
}
</style>
