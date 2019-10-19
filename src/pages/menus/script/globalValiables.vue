<template>
  <Container type="card-full"
             :scorll='false'>
    <div class="dd-title">Global Valiables</div>
    <el-button @click='handleSubmit'>submit</el-button>
    <el-table class="scriptTable"
              :data='varData'
              border>
      <el-table-column label="Variable G."
                       min-width="120">
        <template slot-scope="scope">
          <el-input placeholder=""
                    v-model="scope.row.glov">
          </el-input>
        </template>
      </el-table-column>
      <el-table-column label="Nos"
                       min-width="100">
        <template slot-scope="scope">
          <el-input placeholder=""
                    v-model="scope.row.leng" />
          <!-- <el-input-number placeholder=""
                           class="input-number"
                           style='width:100%;'
                           v-model="scope.row.leng"
                           :min='0'
                           :precision='0'
                           :controls='false' /> -->
        </template>
      </el-table-column>
      <el-table-column label="Description"
                       min-width="300">
        <template slot-scope="scope">
          <el-input placeholder=""
                    v-model="scope.row.comt">
          </el-input>
        </template>
      </el-table-column>
    </el-table>
  </Container>
</template>

<script>
export default {
  data () {
    return {
      varData: [],
      func: 30
    }
  },
  beforeMount () {
    this.init()
  },
  methods: {
    init () {
      this.$ws().set({ success: this.readGlobalVariable }).send({ func: this.func })
    },
    readGlobalVariable (data) {
      if (data.func === this.func) {
        this.$ws().remove(this.readGlobalVariable)
        console.log(data)
        this.varData = data.rows
        let i = 10
        while (i--) {
          this.varData.push({
            'glov': '',
            'leng': '',
            'comt': ''
          })
        }
      }
    },
    handleSubmit () {
      const res = this.varData.filter(i => i.glov && i.leng)
      this.$ws().set().send({
        func: 31,
        nrow: res.length,
        rows: res
      })
    }
  }
}
</script>

<style scoped lang="scss">
.input-number {
  /deep/input {
    text-align: left;
  }
}
</style>
