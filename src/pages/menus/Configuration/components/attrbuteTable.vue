<template>
  <el-table :data='attributeList'
            border
            :height='showBtn?tableHeight:null'
            @selection-change="handleSelectionChange"
            style='width:100%;'>
    <el-table-column type="selection"
                     v-if='showBtn'
                     width="55">
    </el-table-column>
    <el-table-column prop="attn"
                     :min-width="minWidth"
                     label="Name" />
    <el-table-column prop="attt"
                     :min-width="minWidth"
                     label="Type" />
    <el-table-column prop="deci"
                     :min-width="minWidth"
                     label="Decimal" />
    <el-table-column label="Key: Address"
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
        </div>
        <!-- <span>{{scope.row.aadd}}</span> -->
      </template>
    </el-table-column>
    <el-table-column prop="adis"
                     :min-width="minWidth"
                     label="Visible">
      <template slot-scope='scope'>
        {{scope.row.adis?'YES':'NO'}}
      </template>
    </el-table-column>
    <el-table-column prop="achg"
                     :min-width="minWidth"
                     label="Change">
      <template slot-scope='scope'>
        {{scope.row.achg?'YES':'NO'}}
      </template>
    </el-table-column>
    <el-table-column prop="attr"
                     :min-width="minWidth"
                     label="RW" />
    <el-table-column prop="rtim"
                     :min-width="minWidth"
                     label="Rtime" />
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
import Mixins from '@/mixins'
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
      minWidth: '40',
      multipleSelection: []
    }
  },
  methods: {
    addAddress (row) {
      this.$emit('add', row)
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
      this.$emit('input', this.multipleSelection)
    },
    getFullName (pref, suff) {
      pref = pref ? pref + '_' : ''
      suff = suff ? '_' + suff : ''
      return pref + this.objectName + suff
    }
  },
  watch: {
    value (val) {
      this.multipleSelection = val
    }
  },
  computed: {
    tableHeight () {
      return window.innerHeight - 60 - 50 - 40 - 50
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
