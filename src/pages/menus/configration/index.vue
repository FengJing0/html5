<template>
  <Container type="card-full"
             :scorll='false'>
    <span class="dd-title">CONFIGURATION SETUP</span>
    <el-button @click="$router.push('edit')">new</el-button>
    <el-table :data="tableData"
              border
              style="width: 100%">
      <el-table-column prop="date"
                       label="No"
                       width="180" />
      <el-table-column prop="name"
                       label="Name"
                       width="180" />
      <el-table-column prop="address"
                       label="Size" />
      <el-table-column prop="address"
                       label="Update time" />
      <el-table-column prop="address"
                       label="Logging time" />
      <el-table-column prop="address"
                       label="Display" />
      <el-table-column prop="address"
                       label="Logging" />
    </el-table>
  </Container>
</template>

<script>
export default {
  data () {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  }
}
</script>

<style>
</style>
