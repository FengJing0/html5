<template>
  <Container type="card-full"
             :scorll='false'>
    <div class="row">
      <span class="dd-title">edit</span>
      <el-button @click='$router.go(-1)'>Back</el-button>
    </div>
    <div>
      <div class="row">
        <el-radio-group v-model="driverType">
          <el-radio label="Ethernet">Ethernet drivers</el-radio>
          <el-radio label="Serial">Serial drivers</el-radio>
        </el-radio-group>
      </div>
      <div class="row">
        <el-select v-model="driverName">
          <el-option v-for="item in driverList"
                     :key="item.val"
                     :label="item.label"
                     :value="item.val">
          </el-option>
        </el-select>
      </div>
      <div class="row">
        <template v-if="driverType==='Ethernet'">
          <h3>Ethernet driver setup</h3>
          <el-button @click="addEthernetFormItem">add</el-button>
          <el-form ref="driverSetupForm"
                   label-width="100px">
            <div v-for="(item,index) in EthernetForm"
                 :key="index"
                 class="EthernetFormItem">
              <el-form-item :label="`Host name ${index+1}`">
                <el-input v-model="EthernetForm[index].host"></el-input>
              </el-form-item>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <el-form-item :label="`Port no ${index+1}`">
                <el-input v-model="EthernetForm[index].port"></el-input>
              </el-form-item>
            </div>
          </el-form>
        </template>
        <template v-else-if="driverType==='Serial'">
          <h3>Serial driver setup</h3>
          <el-form ref="driverSetupForm"
                   label-width="100px"
                   :model="SerialForm">
            <el-form-item label="Device name">
              <el-input v-model="SerialForm.name"></el-input>
            </el-form-item>
            <el-form-item label="Baud rate">
              <el-input v-model="SerialForm.rate"></el-input>
            </el-form-item>
            <el-form-item label="Data bit">
              <el-input v-model="SerialForm.data"></el-input>
            </el-form-item>
            <el-form-item label="Stop bit">
              <el-input v-model="SerialForm.stop"></el-input>
            </el-form-item>
            <el-form-item label="Parity bit">
              <el-input v-model="SerialForm.parity"></el-input>
            </el-form-item>
          </el-form>
        </template>
      </div>
      <div class="row">
        <h3 class="dd-title">Object setup</h3>
        <el-form ref='objectSetupFrom'
                 :model="objectSetupFrom"
                 label-width="100px">
          <el-form-item label="Object name">
            <el-input v-model="objectSetupFrom.name"></el-input>
          </el-form-item>
          <el-form-item label="Object size">
            <el-input v-model="objectSetupFrom.size"></el-input>
          </el-form-item>
          <el-form-item label="Update time">
            <el-input v-model="objectSetupFrom.name"></el-input>
          </el-form-item>
          <el-form-item label="Logging time">
            <el-input v-model="objectSetupFrom.name"></el-input>
          </el-form-item>
          <el-form-item label="Display">
            <el-radio-group v-model="objectSetupFrom.display">
              <el-radio label="1">Yes</el-radio>
              <el-radio label="0">No</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="Logging">
            <el-radio-group v-model="objectSetupFrom.logging">
              <el-radio label="1">Yes</el-radio>
              <el-radio label="0">No</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </div>
      <div class="row"
           v-if="objectIndexSetupList.length">
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
      </div>
    </div>
  </Container>
</template>

<script>
import { Ethernet, Serial } from '@/config/driverList'
export default {
  data () {
    return {
      isNew: true,
      driverType: '',
      driverName: '',
      EthernetForm: [{}],
      SerialForm: {},
      objectSetupFrom: {},
      objectIndexSetupList: []
    }
  },
  computed: {
    driverList () {
      switch (this.driverType) {
        case 'Ethernet':
          return Ethernet
        case 'Serial':
          return Serial
        default:
          return []
      }
    }
  },
  watch: {
    driverType () {
      this.driverName = ''
    },
    'objectSetupFrom.size' (val) {
      let res = []
      for (let i = 0; i < val; i++) {
        res.push({
          obix: i,
          pref: '213',
          suff: ''
        })
      }
      this.objectIndexSetupList = res
    }
  },
  methods: {
    addEthernetFormItem () {
      if (this.EthernetForm.length && this.EthernetForm.length < 9) {
        this.EthernetForm.push({})
      }
    }
  }
}
</script>

<style scoped lang='scss'>
.row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.EthernetFormItem {
  display: flex;
}
</style>
