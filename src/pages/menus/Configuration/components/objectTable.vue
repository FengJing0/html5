<template>
  <el-table :data='objectList'
            border
            :height='showBtn?tableHeight:null'
            @selection-change="handleSelectionChange"
            style="width: 100%">
    <el-table-column type="selection"
                     v-if='showBtn'
                     width="55" />
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
                     :width="60"
                     label="Size" />
    <el-table-column prop="updt"
                     :width="140"
                     label="Update Time" />
    <el-table-column prop="logt"
                     :width="120"
                     label="Log Time" />
    <el-table-column prop="tstd"
                     :width="120"
                     label="Timestamp">
      <template slot-scope='scope'>
        {{scope.row.tstd?'YES':'NO'}}
      </template>
    </el-table-column>
    <el-table-column prop="disp"
                     :width="minWidth"
                     label="Visible">
      <template slot-scope='scope'>
        {{scope.row.disp?'YES':'NO'}}
      </template>
    </el-table-column>
    <el-table-column prop="logs"
                     :width="minWidth"
                     label="Logging">
      <template slot-scope='scope'>
        {{scope.row.logs?'YES':'NO'}}
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
import Mixins from '@/mixins'
import { mapState } from 'vuex'
import AttrbuteTable from './attrbuteTable'
export default {
  mixins: [Mixins],
  props: {
    value: {
      type: Array
    },
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
    }),
    tableHeight () {
      return window.innerHeight - 60 - 50 - 40 - 80
    }
  },
  data () {
    return {
      minWidth: '100px',
      multipleSelection: []
    }
  },
  methods: {
    handleSelectionChange (val) {
      this.multipleSelection = val
      this.$emit('input', this.multipleSelection)
    },
    go (row) {
      this.$router.push({ name: 'Configuration-edit', params: { data: row.objn } })
    }
  },
  watch: {
    value (val) {
      this.multipleSelection = val
    }
  },
  components: {
    AttrbuteTable
  }
}
</script>

<style scoped lang="scss">
</style>
