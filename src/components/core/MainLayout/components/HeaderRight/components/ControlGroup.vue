<template>
  <div>
    <el-button type="primary"
               size="small"
               @click="handleStart">重启</el-button>
    <el-button type="primary"
               size="small"
               @click="handleRestartNew">新重启</el-button>
    <el-button type="primary"
               size="small"
               @click="handleStop">停止</el-button>
  </div>
</template>

<script>
export default {
  methods: {
    handleStart () {
      this.$ws().set().send({
        func: 71,
        'stat': 'active'
      })
    },
    handleStop () {
      this.$ws().set().send({
        func: 71,
        'stat': 'standby'
      })
    },
    handleRestartNew () {
      this.$ws().set().send({
        func: 70,
        'acts': 'restartnew'
      })
    }
  }
}
</script>

<style scoped lang="scss">
</style>
