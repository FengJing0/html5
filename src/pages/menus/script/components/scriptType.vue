<template>
  <div>
    <el-select v-model="scriptType"
               @change="handleSelect"
               placeholder="">
      <el-option v-for="item in scriptTypeList"
                 :key="item.val"
                 :label="item.label"
                 :value="item.val">
      </el-option>
    </el-select>
    <el-button @click='handleDelete'>delete</el-button>
    <el-button @click='handleCreate'>create</el-button>
  </div>
</template>

<script>
export default {
  props: ['value'],
  data () {
    return {
      scriptType: null,
      scriptTypeList: [
        { label: 'Main', val: -10 },
        { label: 'Auto', val: -20 },
        { label: 'Manual', val: -30 }
      ]
    }
  },
  methods: {
    handleCreate () {

    },
    handleDelete () {

    },
    handleSelect (e) {
      if (e) {
        this.$emit('input', e)
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
