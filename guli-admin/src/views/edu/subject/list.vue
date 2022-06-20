<template>
  <div class="app-container">
    <el-input v-model="filterText" placeholder="Filter keyword" style="margin-bottom:30px;" />

    <el-tree
      ref="tree"
      :data="data"
      :props="defaultProps"
      :filter-node-method="filterNode"
      class="filter-tree"
      default-expand-all
    />

  </div>
</template>

<script>
import subject from '@/api/edu/subject'
export default {

  data() {
    return {
      filterText: '',
      data: [], // 返回所有分类
      // [
      //     {
      //         id: 1,
      //         label: '一级分类1',
      //         children:
      //         [
      //             {
      //                 id: 4,
      //                 label: '二级分类1-1',
      //             },
      //             {
      //                 id: 5,
      //                 label: '二级分类1-2',
      //             }
      //         ]
      //     },
      //     {
      //         id: 2,
      //         label: '一级分类2',
      //         children:
      //         [
      //             {
      //                 id: 6,
      //                 label: '二级分类2-1'
      //             },
      //             {
      //                 id: 7,
      //                 label: '二级分类2-2'
      //             }
      //         ]
      //     }
      // ],

      defaultProps: {
        children: 'children',
        label: 'title'
      }
    }
  },

  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    }
  },

  created() {
    this.getAllSubjectList()
  },

  methods: {

    getAllSubjectList() {
      subject.getSubjectList()
        .then((response) => {
          this.data = response.data.list
        })
    },

    filterNode(value, data) {
      if (!value) return true
      return data.title.toLowerCase().indexOf(value.toLowerCase()) !== -1
    }
  }
}
</script>

