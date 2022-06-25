<template>
  <div class="app-container">
    <!--表单-->
    <el-form :inline="true" class="demo-form-inline">

      <el-form-item label="日期">
        <el-date-picker
          v-model="day"
          type="date"
          placeholder="选择要统计的日期"
          value-format="yyyy-MM-dd" />
      </el-form-item>

      <el-button
        :loading="isLoad"
        type="primary"
        @click="createData()">生成</el-button>
    </el-form>

  </div>
</template>

<script>
import staApi from '@/api/sta'

export default {
  data() {
    return {
      day: '',
      isLoad: false
    }
  },

  created() {
  },

  methods: {
    createData() {
      if(this.day===''){
        this.$notify({
          title: '提示',
          message: '必须选择一个日期',
          type: 'warning'
        });
        return
      }
      this.isLoad = true
      this.btnDisabled = true
      staApi.createRegisterCount(this.day)
        .then(response => {
          this.isLoad = false
          this.$message({
            type: 'success',
            message: '生成成功,请查看图表数据'
          })
          this.$router.push({path:'/sta/show'})
      })
    }
  }
}
</script>
