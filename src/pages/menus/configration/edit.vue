<template>
  <Container type="card-full"
             :scorll='false'>
    <div class="row">
      <span class="dd-title">edit</span>
      <el-button @click='$router.go(-1)'>Back</el-button>
      <el-button @click='handleSubmit'
                 :disabled="!canSubmit">submit</el-button>
      <el-button @click='dialogTableVisible=true'>New Attribute</el-button>
    </div>
    <div>
      <el-table :data='attributeList'
                border
                style='width:100%;'>
        <el-table-column prop="attn"
                         label="Name" />
        <el-table-column prop="attt"
                         label="Type" />
        <el-table-column prop="deci"
                         label="Decimal" />
        <el-table-column label="Address"
                         min-width="200">
          <template slot-scope="scope">
            <div>
              <div v-for="item in scope.row.aadd"
                   class="addrs"
                   :key='getFullName(item.pref,item.suff)'>
                {{getFullName(item.pref,item.suff)}}:
                &nbsp;
                {{item.addr}}
              </div>
              <span v-if="!scope.row.aadd.length">-</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="adis"
                         label="Display" />
        <el-table-column prop="achg"
                         label="Change" />
        <el-table-column prop="attr"
                         label="Direction" />
        <el-table-column prop="rtim"
                         label="Time" />
        <el-table-column label="Address">
          <template slot-scope="scope">
            <el-button type='text'
                       @click="addAddress(scope.row)">Address</el-button>
          </template>
        </el-table-column>
      </el-table>
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
                border>
        <el-table-column label="Index">
          <template slot-scope="scope">
            {{scope.row.obix+1}}
          </template>
        </el-table-column>
        <el-table-column prop="pref"
                         label="Prefix" />
        <el-table-column label="Suffix"
                         prop="suff" />
        <el-table-column label="Address">
          <template slot-scope="scope">
            <el-input v-model="scope.row.addr"></el-input>
          </template>
        </el-table-column>
      </el-table>
      <el-button @click='addressSubmit'>submit</el-button>
    </el-dialog>
  </Container>
</template>

<script>
import clone from '@/utils/clone'
import { AttributeTypeList } from '@/config/index'
import { mapState, mapMutations } from 'vuex'
export default {
  data () {
    return {
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
      activeAttributeRow: {}
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
        name: 'configration-object'
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
    init () {
      let name = this.$route.params.data
      if (name) {
        this.objn = name
        this.objectData.some(i => {
          if (i.objn === name) {
            this.preAndSuff = [...i.preAndSuff]
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
  // watch: {
  //   'AttributeSetupFrom.attt' (val) {
  //     this.AttributeSetupFrom.deci = 0
  //   }
  // },
  beforeMount () {
    this.init()
  },
  beforeRouteEnter (to, from, next) {
    if (to.params.data) {
      next()
    } else {
      next({ name: 'index' })
    }
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
