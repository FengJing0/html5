<template>
  <el-table :data='attributeList'
            border
            style='width:100%;'>
    <el-table-column prop="attn"
                     :min-width="minWidth"
                     label="Name" />
    <el-table-column prop="attt"
                     :min-width="minWidth"
                     label="Type" />
    <el-table-column prop="deci"
                     :min-width="minWidth"
                     label="Decimal" />
    <el-table-column label="Address"
                     min-width="250">
      <template slot-scope="scope">
        <div>
          <div v-for="item in scope.row.aadd"
               class="addrs"
               :key='getFullName(item.pref,item.suff)'>
            {{getFullName(item.pref,item.suff)}}:
            &nbsp;
            {{item.addr}}
          </div>
          <span v-if="!scope.row.aadd.length">-</span>
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="adis"
                     :min-width="minWidth"
                     label="Display" />
    <el-table-column prop="achg"
                     :min-width="minWidth"
                     label="Change" />
    <el-table-column prop="attr"
                     :min-width="minWidth"
                     label="Direction" />
    <el-table-column prop="rtim"
                     :min-width="minWidth"
                     label="Time" />
    <el-table-column label="Address"
                     :min-width="minWidth"
                     v-if="showBtn">
      <template slot-scope="scope">
        <el-button type='text'
                   @click="addAddress(scope.row)">Address</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  props: {
    showBtn: {
      type: Boolean,
      default: false
    },
    attributeList: {
      type: Array,
      required: true
    },
    objectName: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      minWidth: '130'
    }
  },
  methods: {
    addAddress (row) {
      this.$emit('add', row)
    },
    getFullName (pref, suff) {
      return `${pref}_${this.objectName}_${suff}`
    }
  }
}
</script>

<style scoped lang="scss">
.addrs {
  border-bottom: 1px solid #ebeef5;
  padding: 5px;
  &:last-child {
    border: none;
  }
}
</style>
