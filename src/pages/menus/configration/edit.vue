<template>
  <Container type="card-full"
             :scorll='false'>
    <div class="row">
      <span class="dd-title">edit</span>
      <el-button @click='$router.go(-1)'>Back</el-button>
      <el-button @click='handleSubmit'>submit</el-button>
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
        <el-table-column label="Address">
          <template slot-scope="scope">
            {{scope.row.aadd?'*':'-'}}
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
        <el-table-column label="Add Address">
          <template slot-scope="scope">
            <el-button type='text'
                       @click="addAddress(scope.row)">add address</el-button>
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
export default {
  data () {
    return {
      objn: '',
      preAndSuff: [],
      dialogTableVisible: false,
      attributeList: [],
      AttributeSetupFrom: {},
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
    submitAttributeSetupFrom () {
      this.$refs.AttributeSetupFrom.validate((valid) => {
        if (valid) {
          this.attributeList.push(clone(this.AttributeSetupFrom))
          this.dialogTableVisible = false
          this.AttributeSetupFrom = {}
          this.saveAttributeList()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleSubmit () {
      this.$router.push({
        name: 'configration-index',
        params: { data: JSON.stringify(this.attributeList), name: this.objn }
      })
    },
    addAddress (row) {
      this.activeAttributeRow = row
      this.addressVisible = true
    },
    addressSubmit () {
      this.addressVisible = false
      this.activeAttributeRow.aadd = clone(this.preAndSuff)
      this.resetPreAndSuff()
      this.saveAttributeList()
      console.log(this.attributeList)
    },
    resetPreAndSuff () {
      this.preAndSuff = this.preAndSuff.map(i => {
        i.addr = ''
        return i
      })
    },
    saveAttributeList () {
      sessionStorage.setItem('attribute', JSON.stringify(this.attributeList))
    },
    init () {
      let data = this.$route.params.data
      if (data) {
        data = JSON.parse(data)
        this.objn = data.objn
        this.preAndSuff = [...data.preAndSuff]
      }
      let attribute = sessionStorage.getItem('attribute')
      if (attribute) {
        this.attributeList = JSON.parse(attribute)
      }
    }
  },
  computed: {
    showDecimal () {
      // const list = []
      return this.AttributeSetupFrom.attt && this.AttributeSetupFrom.attt.indexOf('word') !== -1
    },
    showReadTime () {
      return this.AttributeSetupFrom.attr && this.AttributeSetupFrom.attr !== 'W'
    }
  },
  watch: {

  },
  mounted () {
    this.init()
  },
  components: {

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
</style>
