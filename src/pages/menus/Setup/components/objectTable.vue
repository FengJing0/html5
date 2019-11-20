<template>
  <el-table :data='objectList'
            border
            style="width: 100%">
    <el-table-column type="expand"
                     v-if="showAttr">
      <template slot-scope="props">
        <!-- <el-button @click="go(props.row)">new</el-button>
        <el-button>delete</el-button> -->
        <AttrbuteTable :attributeList='props.row.oatt'
                       :objectName='props.row.objn' />
      </template>
    </el-table-column>
    <el-table-column type='index'
                     min-width="50"
                     label="No" />
    <el-table-column prop="objn"
                     label="Name"
                     min-width="200" />
    <el-table-column prop="obsz"
                     :min-width="50"
                     label="Size" />
    <el-table-column prop="updt"
                     :width="100"
                     label="Time" />
    <el-table-column prop="logt"
                     :width="100"
                     label="Logs" />
    <el-table-column prop="tstd"
                     :width="minWidth"
                     label="T">
      <template slot-scope='scope'>
        {{scope.row.tstd?'YES':'NO'}}
      </template>
    </el-table-column>
    <el-table-column prop="disp"
                     :width="minWidth"
                     label="D">
      <template slot-scope='scope'>
        {{scope.row.disp?'YES':'NO'}}
      </template>
    </el-table-column>
    <el-table-column prop="logs"
                     :width="minWidth"
                     label="L">
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
import { mapState } from 'vuex'
import AttrbuteTable from './attrbuteTable'
export default {
  props: {
    showBtn: {
      type: Boolean,
      default: false
    },
    showAttr: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapState({
      objectList: state => state.SetUpData.objectData
    })
  },
  data () {
    return {
      minWidth: '80px'
    }
  },
  methods: {
    go (row) {
      this.$router.push({ name: 'configration-edit', params: { data: row.objn } })
    }
  },
  components: {
    AttrbuteTable
  }
}
</script>

<style scoped lang="scss">
</style>
