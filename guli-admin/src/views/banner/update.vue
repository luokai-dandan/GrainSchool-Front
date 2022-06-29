<!--suppress JSVoidFunctionReturnValueUsed -->
<template>
  <div class="app-container">
    <el-button type="primary" @click="addBanner()" style="margin-bottom: 10px">添加Banner</el-button>
    <!-- 表格 -->
    <el-table
      v-loading="listLoading"
      :data="list"
      :default-sort = "{prop: 'gmtModified', order: 'descending'}"
      element-loading-text="数据加载中"
      border
      fit
      highlight-current-row>

      <el-table-column
        label="序号"
        width="60"
        align="center">
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column prop="title" label="名称" width="130" align="center"/>
      <el-table-column prop="linkUrl" label="链接" width="130" align="center"/>

      <el-table-column label="图片" width="520" align="center">

        <template slot-scope="scope">
<!--          <el-image :src="scope.row.imageUrl"  :fit="fit" style="width: 500px; height: 300px" title="点击更换">-->
<!--            <div slot="placeholder" class="image-slot">-->
<!--              加载中<span class="dot">...</span>-->
<!--            </div>-->
<!--          </el-image>-->
          <el-upload
            class="avatar-uploader"
            :action="BASE_API+'/educos/filecos'"
            :show-file-list="false"
            :on-success="handleAvatarSuccess.bind(this,scope.row.id)"
            :before-upload="beforeAvatarUpload">
            <img :alt="scope.row.title" v-if="scope.row.imageUrl" :src="scope.row.imageUrl" class="avatar" style="width: 500px; height: 300px" title="点击更换">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </template>

      </el-table-column>

      <el-table-column prop="gmtCreate" label="添加时间" sortable width="160" align="center"/>

      <el-table-column prop="gmtModified" label="修改时间" sortable width="160" align="center"/>


      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="danger" icon="el-icon-delete" @click="removeDataById(scope.row.id)">删除</el-button>
        </template>

      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      :current-page="page"
      :page-size="limit"
      :total="total"
      style="padding: 30px 0; text-align: center;"
      layout="total, prev, pager, next, jumper"
      @current-change="getList"
    />
  </div>

</template>

<script>
import banner from '@/api/edu/banner'

export default {

  // 写核心代码位置
  data() { // 定义变量和初始值
    return {
      list: null, // 查询之后接口返回集合
      page: 1, // 当前页
      limit: 8, // 每页记录数
      total: 0,
      BASE_API: process.env.BASE_API// 获取dev.env.js端口号
    }
  },

  created() { // 页面渲染之前执行，调用methods定义的方法

    this.getList()
  },

  methods: { // 创建具体的方法，调用teacher.js定义的方法

    //添加Banner
    addBanner() {
      this.$router.push({ path: '/banner/add' })
    },

    handleAvatarSuccess(idx, res, file, name) {
      console.log("============上传文件=============")
      console.log("idx = ", idx)
      console.log("res = ",res)
      console.log("file = ",file)
      console.log("name = ",name)
      console.log("res = ",res.data.url)
      console.log("list = ",this.list)
      let index = -1
      for (let i = 0; i <this.list.length; i++) {
        if(idx===this.list[i].id) {
          this.list[i].imageUrl = res.data.url
          index = i
        }
      }
      console.log("list = ",this.list)

      banner.updateBanner(this.list[index])
        .then(response => {
          this.$message({
            message: "Banner上传成功",
            type: "success"
          })
        })
    },

    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },


    // 课程列表的方法
    // page=1
    getList(page = 1) {
      this.page = page // 分页修改参数
      console.log(this.page)
      console.log(this.limit)
      banner.getPageBanner(this.page, this.limit)
        .then(response => {

          this.list = response.data.items
          this.total = response.data.total

          console.log("============获取列表============")
          console.log(this.list)
          console.log(this.total)
        })
    },

    // 删除Banner
    removeDataById(bannerId) {
      this.$confirm('此操作将永久删除该Banner, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 删除成功
        banner.removeBanner(bannerId)
          .then(response => {
            // 提示信息
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            // 刷新并回到当前页
            this.getList()
          })
      })
    }
  }
}
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
