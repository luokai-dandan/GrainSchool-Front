<template>
  <div class="app-container">
    <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline" @keyup.enter.native="getList()">
      <el-form-item>
        <el-input v-model="courseQuery.title" placeholder="课程名称" style="width:290px"/>
      </el-form-item>

      <el-form-item>
        <el-select v-model="courseQuery.status" placeholder="课程状态" style="width:218px;margin-right:60px">
          <el-option value= "Normal" label="已发布"/>
          <el-option value= "Draft" label="未发布"/>
        </el-select>
      </el-form-item>

      <el-button type="primary" icon="el-icon-search" style="margin-left:10px" @click="getList()">查询</el-button>
      <el-button type="default" @click="resetData()">清空</el-button>
      <br>
      <el-form-item label="添加时间">
        <el-date-picker
          v-model="courseQuery.beginCreate"
          type="datetime"
          placeholder="选择开始时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="courseQuery.endCreate"
          type="datetime"
          placeholder="选择截止时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>

      <el-form-item label="修改时间">
        <el-date-picker
          v-model="courseQuery.beginModified"
          type="datetime"
          placeholder="选择开始时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="courseQuery.endModified"
          type="datetime"
          placeholder="选择截止时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>

    </el-form>

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

      <el-table-column prop="title" label="名称" width="300" align="center"/>

      <el-table-column label="状态" width="120" align="center">
        <template slot-scope="scope">
          {{ scope.row.status==='Normal'?'已发布':'未发布' }}
          <br>
          <el-switch
            v-model="scope.row.status"
            style="margin-top:15px"
            active-value="Normal"
            inactive-value="Draft"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="changeStatus(scope.row.id)"/>

        </template>
      </el-table-column>

      <el-table-column prop="lessonNum" label="课时" sortable width="80" align="center"/>

      <el-table-column prop="gmtCreate" label="添加时间" sortable width="160" align="center"/>

      <el-table-column prop="gmtModified" label="修改时间" sortable width="160" align="center"/>

      <el-table-column label="浏览数" sortable width="155" align="center" >
        <template slot-scope="scope">
          <el-input-number
            v-model="scope.row.viewCount"
            controls-position="right"
            size="mini"
            @change="changeViewCount(scope.row.id, scope.row.viewCount)" />
        </template>
      </el-table-column>

      <!--
      <el-table-column prop="viewCount" label="浏览数" sortable width="100" align="center"/>
         -->

      <el-table-column label="购买数" sortable width="155" align="center">
        <template slot-scope="scope">
          <el-input-number
            v-model="scope.row.buyCount"
            controls-position="right"
            size="mini"
            @change="changeBuyCount(scope.row.id, scope.row.buyCount)" />
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center">
        <template slot-scope="scope">

          <router-link :to="'/course/info/'+scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit" style="margin-bottom:5px">编辑课程</el-button>
          </router-link>

          <router-link :to="'/course/chapter/'+scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit" style="margin-bottom:5px">编辑大纲</el-button>
          </router-link>

          <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeDataById(scope.row.id)">删除课程</el-button>
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

// 引入调用teacher.js文件
import course from '@/api/edu/course'

export default {
  // 写核心代码位置
  data() { // 定义变量和初始值
    return {
      list: null, // 查询之后接口返回集合
      page: 1, // 当前页
      limit: 8, // 每页记录数
      total: 0, // 总记录数
      courseQuery: { // 条件封装对象
        title: '',
        status: '',
        beginCreate: '',
        enendCreated: '',
        beginModified: '',
        endModified: ''
      }
    }
  },
  created() { // 页面渲染之前执行，调用methods定义的方法
    this.getList()
  },
  methods: { // 创建具体的方法，调用teacher.js定义的方法

    // 修改浏览数
    changeViewCount(id, viewCount) {
      course.changeViewCount(id, viewCount)
    },

    // 修改购买数
    changeBuyCount(id, buyCount) {
      course.changeBuyCount(id, buyCount)
    },

    // 修改状态
    changeStatus(courseId) {
      // 删除成功
      course.changeStatus(courseId)
        .then(response => {
          // 提示信息
          this.$message({
            type: 'success',
            message: '更改成功!'
          })
          // 刷新并回到当前页
          this.getList()
        })
    },

    // 课程列表的方法
    // page=1
    getList(page = 1) {
      this.page = page // 分页修改参数
      console.log(this.page)
      console.log(this.limit)
      console.log(this.courseQuery)
      course.getCourseList(this.page, this.limit, this.courseQuery)
        .then(response => {
          this.list = response.data.rows
          this.total = response.data.total
          // console.log(this.list)
          // console.log(this.total)
        })
    },

    // 清空表单
    resetData() {
      // 表单输入项数据清空
      this.courseQuery = {
        title: '',
        status: '',
        begin: '',
        end: ''
      }
      // 查询所有课程的数据
      this.getList()
    },

    // 删除课程
    removeDataById(courseId) {
      this.$confirm('此操作将永久删除该课程, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 删除成功
        course.deleteCourse(courseId)
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
