<template>
  <div>
    <el-button type="primary"
               size="small"
               @click="handleStart">Start</el-button>
    <el-button type="primary"
               size="small"
               @click="handleRestartNew">NewStart</el-button>
    <el-button type="primary"
               size="small"
               @click="handleStop">Stop</el-button>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      status: state => state.Status.status
    })
  },
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
