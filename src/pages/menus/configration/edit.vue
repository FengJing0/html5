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
               label-width="100px">
        <el-form-item label="Attribute name">
          <el-input v-model="AttributeSetupFrom.attn"></el-input>
        </el-form-item>
        <el-form-item label="Attribute type">
          <el-input v-model="AttributeSetupFrom.attt"></el-input>
        </el-form-item>
        <el-form-item label="Decimal">
          <el-input v-model="AttributeSetupFrom.deci"></el-input>
        </el-form-item>
        <el-form-item label="Display">
          <el-radio-group v-model="AttributeSetupFrom.adis">
            <el-radio :label="1">Yes</el-radio>
            <el-radio :label="0">No</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="Change">
          <el-radio-group v-model="AttributeSetupFrom.achg">
            <el-radio :label="1">Yes</el-radio>
            <el-radio :label="0">No</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="Direction">
          <el-radio-group v-model="AttributeSetupFrom.attr">
            <el-radio label="R">R</el-radio>
            <el-radio label="W">W</el-radio>
            <el-radio label="R/W">R/W</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="Read time">
          <el-radio-group v-model="AttributeSetupFrom.rtim">
            <el-radio :label="1">Yes</el-radio>
            <el-radio :label="0">No</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <el-button @click='submitAttributeSetupFrom'>submit</el-button>
    </el-dialog>
    <el-dialog title="Data Address Setup"
               :visible.sync="addressVisible">
      <el-table :data='preAndSuff'
                border>
        <el-table-column prop="obix"
                         label="Index">
        </el-table-column>
        <el-table-column prop="pref"
                         label="Prefix" />
        <el-table-column label="Suffix"
                         prop="suff" />
        <el-table-column label="Address">
          <template slot-scope="scope">
            <el-input v-model="scope.row.attr"></el-input>
          </template>
        </el-table-column>
      </el-table>
      <el-button @click='addressSubmit'>submit</el-button>
    </el-dialog>
  </Container>
</template>

<script>
import clone from '@/utils/clone'
export default {
  data () {
    return {

      objn: '',
      preAndSuff: [],
      dialogTableVisible: false,
      attributeList: [],
      AttributeSetupFrom: {},
      addressVisible: false,
      activeAttributeRow: {}
    }
  },
  methods: {
    close () {

    },
    submitAttributeSetupFrom () {
      this.attributeList.push(clone(this.AttributeSetupFrom))
      this.dialogTableVisible = false
      this.AttributeSetupFrom = {}
    },
    handleSubmit () {
      this.$router.push({ name: 'configration-index',
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
      console.log(this.attributeList)
    },
    resetPreAndSuff () {
      this.preAndSuff = this.preAndSuff.map(i => {
        i.addr = ''
        return i
      })
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

  },
  watch: {
    attributeList: {
      handler (val) {
        sessionStorage.setItem('attribute', JSON.stringify(val))
      },
      deep: true
    }
  },
  mounted () {
    this.init()
  },
  components: {

  }
}
</script>

<style scoped lang='scss'>
/deep/.row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.EthernetFormItem {
  display: flex;
}
</style>
