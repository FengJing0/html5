<template>
  <el-table :data='objectList'
            border
            style="width: 100%">
    <el-table-column type="expand"
                     v-if="showAttr">
      <template slot-scope="props">
        <AttrbuteTable :attributeList='props.row.oatt'
                       :objectName='props.row.objn' />
      </template>
    </el-table-column>
    <el-table-column type='index'
                     min-width="50"
                     label="No" />
    <el-table-column prop="objn"
                     label="Name"
                     min-width="150" />
    <el-table-column prop="obsz"
                     :min-width="minWidth"
                     label="Size" />
    <el-table-column prop="updt"
                     :min-width="minWidth"
                     label="Update time" />
    <el-table-column prop="logt"
                     :min-width="minWidth"
                     label="Logging time" />
    <el-table-column prop="tstd"
                     :min-width="minWidth"
                     label="Timestamp display">
      <template slot-scope='scope'>
        {{scope.row.tstd?'YES':'NO'}}
      </template>
    </el-table-column>
    <el-table-column prop="disp"
                     :min-width="minWidth"
                     label="Display">
      <template slot-scope='scope'>
        {{scope.row.disp?'YES':'NO'}}
      </template>
    </el-table-column>
    <el-table-column prop="logs"
                     :min-width="minWidth"
                     label="Logging">
      <template slot-scope='scope'>
        {{scope.row.disp?'YES':'NO'}}
      </template>
    </el-table-column>
    <el-table-column label="Attribute"
                     :min-width="minWidth"
                     v-if="showBtn">
      <template slot-scope="scope">
        <el-button type="text"
                   @click="go(scope.row)">Attribute</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import AttrbuteTable from './attrbuteTable'
export default {
  props: {
    showBtn: {
      type: Boolean,
      default: false
    },
    objectList: {
      type: Array,
      required: true
    },
    showAttr: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      minWidth: '120'
    }
  },
  methods: {
    go (row) {
      this.$emit('go', row)
    }
  },
  components: {
    AttrbuteTable
  }
}
</script>

<style scoped lang="scss">
</style>
