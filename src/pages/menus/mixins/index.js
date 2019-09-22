export default {
  mounted () {
    document.title = this.$route.name.split('-')[0]
    // console.log(this.$router.name)
  }
}
