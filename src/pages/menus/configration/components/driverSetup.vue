<template>
  <div>
    <el-button @click="dialogTableVisible=true">New Driver</el-button>
    <el-dialog title="Driver Setup"
               @closed='close'
               :visible.sync="dialogTableVisible">
      <div class="row">
        <el-radio-group v-model="driverType">
          <el-radio label="Ethernet">Ethernet drivers</el-radio>
          <el-radio label="Serial">Serial drivers</el-radio>
        </el-radio-group>
      </div>
      <div class="row">
        <el-select v-model="chdv"
                   :disabled="!driverList.length">
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
            <div v-for="(item,index) in chnl"
                 :key="index"
                 class="EthernetFormItem">
              <el-form-item :label="`Host name ${index+1}`">
                <el-input v-model="chnl[index].tcph"></el-input>
              </el-form-item>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <el-form-item :label="`Port no ${index+1}`">
                <el-input v-model="chnl[index].tcpp"></el-input>
              </el-form-item>
            </div>
          </el-form>
        </template>
        <template v-else-if="driverType==='Serial'">
          <h3>Serial driver setup</h3>
          <el-form ref="driverSetupForm"
                   label-width="100px"
                   :model="chnl[0]">
            <el-form-item label="Device name">
              <el-input v-model="chnl[0].ttyc"></el-input>
            </el-form-item>
            <el-form-item label="Baud rate">
              <el-input v-model="chnl[0].ttyb"></el-input>
            </el-form-item>
            <el-form-item label="Data bit">
              <el-input v-model="chnl[0].ttyd"></el-input>
            </el-form-item>
            <el-form-item label="Stop bit">
              <el-input v-model="chnl[0].ttys"></el-input>
            </el-form-item>
            <el-form-item label="Parity bit">
              <el-input v-model="chnl[0].ttyp"></el-input>
            </el-form-item>
          </el-form>
        </template>
      </div>
      <el-button @click="submit">submit</el-button>
    </el-dialog>
  </div>
</template>

<script>
import { Ethernet, Serial } from '@/config/driverList'
export default {
  props: {
    value: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      dialogTableVisible: false,
      driverType: sessionStorage.getItem('driverType') || '',
      chdv: '', // Channel driver name
      chnl: [{}] // Channel Details
    }
  },
  methods: {
    addEthernetFormItem () {
      if (this.chnl.length && this.chnl.length < 9) {
        this.chnl.push({
          tcph: '',
          tcpp: ''
        })
      }
    },
    submit () {
      sessionStorage.setItem('driverType', this.driverType)
      this.dialogTableVisible = false
      this.$emit('input', { chdv: this.chdv, chnl: this.chnl })
    },
    close () {
      this.$nextTick(this.init)
    },
    init () {
      this.driverType = sessionStorage.getItem('driverType') || ''
      this.chdv = this.value.chdv || ''
      this.chnl = this.value.chnl || [{}]
    }
  },
  mounted () {
    this.$nextTick(this.init)
  },
  watch: {
    driverType () {
      if (this.dialogTableVisible) {
        this.chnl = [{}]
        this.chdv = ''
      }
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
  }
}
</script>

<style scoped lang="scss">
.EthernetFormItem {
  display: flex;
}
</style>
