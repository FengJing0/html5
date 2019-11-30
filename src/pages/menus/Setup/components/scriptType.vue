<template>
  <div style="display:inline-block;">
    <el-select v-model="scriptType.subr"
               @change="handleSelect"
               placeholder="">
      <el-option v-for="item in scriptTypeList"
                 :key="item.subr"
                 :label="item.name"
                 :value="item.subr">
      </el-option>
    </el-select>
    &nbsp;&nbsp;
    <el-button @click='handleDelete'
               type='danger'>delete</el-button>
    <el-button @click='handleCreate'
               type="primary">create</el-button>

    <el-dialog title="提示"
               @closed='handleClose'
               :visible.sync="dialogVisible">
      <el-form :model="subroutineForm"
               :rules="subroutineFormRules"
               label-width="100px"
               ref='subroutineForm'>
        <el-form-item prop="name"
                      label="name">
          <el-input v-model="subroutineForm.name"></el-input>
        </el-form-item>
        <el-form-item prop="subr"
                      label="subr">
          <el-input v-model="subroutineForm.subr"></el-input>
        </el-form-item>
      </el-form>
      <template slot="footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="handleSubmit">确 定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ['value'],
  data () {
    return {
      scriptType: null,
      scriptTypeList: [
        { name: 'Main', subr: -10 },
        { name: 'Auto', subr: -20 },
        { name: 'Manual', subr: -30 }
      ],
      dialogVisible: false,
      subroutineForm: {
        name: '',
        subr: ''
      },
      subroutineFormRules: {
        name: [
          { required: true, message: '', trigger: 'blur' }
        ],
        subr: [
          { required: true, message: '', trigger: 'blur' }
        ]
      }
    }
  },
  beforeMount () {
    this.init()
  },
  methods: {
    init () {
      this.$ws().set({ success: this.setSubroutineList }).send({ func: 32 })
    },
    setSubroutineList (data) {
      if (data.func === 32) {
        this.$ws().remove(this.setSubroutineList)
        this.scriptTypeList.unshift(...data.rows)
      }
    },
    handleCreate () {
      this.dialogVisible = true
    },
    handleDelete () {
      const list = [-10, -20, -30]
      if (this.scriptType.subr && !list.includes(this.scriptType.subr)) {
        this.$ws().send({ func: 35, subr: this.scriptType.subr })
        const res = this.scriptTypeList.filter(i => list.includes(i.subr) || (i.subr !== this.scriptType.subr))
        if (res.length !== this.scriptTypeList.length) {
          this.scriptTypeList = res
          this.scriptType = {
            name: '',
            subr: ''
          }
        }
        this.$emit('delete')
      }
    },
    handleClose () {
      this.$refs.subroutineForm.resetFields()
      this.subroutineForm = {
        name: '',
        subr: ''
      }
    },
    handleSubmit () {
      this.$refs.subroutineForm.validate((valid) => {
        if (valid) {
          const { name, subr } = this.subroutineForm
          if (!this.scriptTypeList.some(i => i.subr === subr)) {
            this.scriptTypeList.push({
              name,
              subr
            })
            this.dialogVisible = false
          }
        } else {
          return false
        }
      })
    },
    handleSelect (e) {
      if (e) {
        const res = this.scriptTypeList.filter(i => i.subr === e)
        // debugger
        this.scriptType = {
          name: res[0].name,
          subr: res[0].subr
        }
        this.$emit('input', this.scriptType)
      }
    }
  },
  watch: {
    value: {
      handler (val) {
        this.scriptType = val
      },
      immediate: true
    }
  }
}
</script>

<style scoped lang="scss">
</style>
