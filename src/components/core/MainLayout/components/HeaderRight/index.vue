<template>
  <div class="btn-group">
    <FullScreen></FullScreen>
    &nbsp;&nbsp;
    <UserDropdown></UserDropdown>
  </div>
</template>

<script>
export default {
  components: {
    FullScreen: () => import('./components/FullScreen'),
    UserDropdown: () => import('./components/UserDropdown')
  }
}
</script>

<style scoped>

</style>
