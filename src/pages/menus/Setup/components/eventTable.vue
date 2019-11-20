<template>
  <el-table :data='eventList'
            border
            style="width: 100%">
    <el-table-column :min-width="minWidth"
                     prop="sobj"
                     label="Object1" />
    <el-table-column prop="satt"
                     label="Attribute1"
                     :min-width="minWidth" />
    <el-table-column prop="msgt"
                     :min-width="minWidth"
                     label="Type" />
    <el-table-column prop="cobj"
                     :min-width="minWidth"
                     label="Object2" />
    <el-table-column prop="catt"
                     :min-width="minWidth"
                     label="Attribute2" />
    <el-table-column prop="acat"
                     :min-width="minWidth"
                     label="Category" />
    <el-table-column prop="subr"
                     :min-width="minWidth"
                     label="Sub" />
  </el-table>
</template>

<script>
export default {
  props: {
    eventList: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      minWidth: '120'
    }
  }
}
</script>

<style scoped lang="scss">
</style>
