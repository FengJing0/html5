<template>
  <Container type="card-full"
             :scorll='false'>
    <div class="row">
      <span class="dd-title">Event Setup</span>
      <el-button @click='handleSubmit'>submit</el-button>
      <el-button @click='addEvent'>New Event</el-button>
    </div>
    <el-table :data='msgd'
              border
              style="width: 100%">
      <el-table-column type='Object1'
                       prop="objn"
                       label="No" />
      <el-table-column prop="objn"
                       label="Attribute1"
                       min-width="150" />
      <el-table-column prop="teds"
                       min-width="100"
                       label="Type" />
      <el-table-column prop="updt"
                       min-width="120"
                       label="Object2" />
      <el-table-column prop="logt"
                       min-width="120"
                       label="Attribute2" />
      <el-table-column prop="disp"
                       min-width="100"
                       label="Category" />
      <el-table-column prop="logs"
                       min-width="100"
                       label="Sub" />
    </el-table>
    <el-dialog title="Event Setup"
               @closed='close'
               :visible.sync="dialogTableVisible">
      <el-form :model="eventForm"
               ref="eventForm"
               :rules="eventFormRules"
               label-width="120px">
        <el-form-item label='Object1'
                      prop="sobj">
          <el-select v-model="eventForm.sobj">
            <el-option v-for="item in objectList"
                       :key="item.name"
                       :label="item.name"
                       :value="item.name">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label='Attribute1'
                      prop="satt">
          <el-select v-model="eventForm.satt">
            <el-option v-for="item in filterAttrList(eventForm.sobj)"
                       :key="item+'satt'"
                       :label="item"
                       :value="item" />
          </el-select>
        </el-form-item>
        <el-form-item label='Type'
                      prop="msgt">
          <el-select v-model="eventForm.msgt">
            <el-option v-for="item in Operator"
                       :key="item.val"
                       :label="item.val"
                       :value="item.val">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label='Object2'
                      prop="cobj">
          <el-select v-model="eventForm.cobj">
            <el-option v-for="item in objectList"
                       :key="item.name"
                       :label="item.name"
                       :value="item.name">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label='Attribute2'
                      prop="catt">
          <el-select v-model="eventForm.catt">
            <el-option v-for="item in filterAttrList(eventForm.cobj)"
                       :key="item+'catt'"
                       :label="item"
                       :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label='Category'
                      prop="catt">
          <el-select v-model="eventForm.catt">
            <el-option v-for="item in EventCategory"
                       :key="item.val"
                       :label="item.val"
                       :value="item.val">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label='Subroutine'
                      prop="subr">
          <el-input-number v-model="eventForm.subr"
                           :controls='false'
                           :precision='0' />
        </el-form-item>
        <el-form-item>
          <el-button @click='submitNewEvent'>submit</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </Container>
</template>

<script>
import { Operator, EventCategory } from '@/config/index'
import clone from '@/utils/clone'
export default {
  data () {
    return {
      resultData: {},
      dialogTableVisible: false,
      msgd: [],
      eventForm: {},
      eventFormRules: {},
      objectList: [],
      Operator,
      EventCategory
    }
  },
  mounted () {
    this.init()
  },
  computed: {
  },
  methods: {
    init () {
      this.resultData = Object.freeze(JSON.parse(this.$route.params.data))
      this.buildObjectList()
      let eventList = sessionStorage.getItem('event')
      if (eventList) {
        this.msgd = JSON.parse(eventList)
      }
    },
    handleSubmit () {
      console.log(this.resultData)
      console.log(this.objectNameList)
    },
    addEvent () {
      this.dialogTableVisible = true
    },
    submitNewEvent () {
      this.$refs.eventForm.validate((valid) => {
        if (valid) {
          this.msgd.push(clone(this.eventForm))
          this.dialogTableVisible = false
          this.saveEventList()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    close () {
      this.eventForm = {}
      this.$refs.eventForm.clearValidate()
    },
    saveEventList () {
      sessionStorage.setItem('event', JSON.stringify(this.msgd))
    },
    buildObjectList () {
      let list = []
      for (let i = 0, objd = this.resultData.objd, len = objd.length; i < len; i++) {
        const { objn, preAndSuff, oatt } = objd[i]
        const attr = oatt.map(i => i.attn)
        for (let j = 0, psLen = preAndSuff.length; j < psLen; j++) {
          list.push({
            name: `${preAndSuff[j]['pref']}_${objn}_${preAndSuff[j]['suff']}`,
            attr
          })
        }
      }
      this.objectList = Object.freeze(list)
    },
    filterAttrList (val) {
      if (!val) return []
      let res = this.objectList.filter(i => i.name === val)
      if (res) {
        return res[0]['attr']
      } else {
        return []
      }
    }
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

<style scoped lang="scss">
</style>
