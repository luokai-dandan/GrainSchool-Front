<template>
  <div class="app-container">
    <el-form label-width="120px">
      <el-form-item label="讲师名称">
        <el-input v-model="teacher.name"/>
      </el-form-item>
      <el-form-item label="讲师排序">
        <el-input-number v-model="teacher.sort" :min="0" controls-position="right"/>
      </el-form-item>
      <el-form-item label="讲师头衔">
        <el-select v-model="teacher.level" clearable placeholder="请选择">
          <!--
            数据类型一定要和取出的json中的一致，否则没法回填
            因此，这里value使用动态绑定的值，保证其数据类型是number
          -->
          <el-option :value="1" label="高级讲师"/>
          <el-option :value="2" label="首席讲师"/>
        </el-select>
      </el-form-item>
      <el-form-item label="讲师资历">
        <el-input v-model="teacher.career"/>
      </el-form-item>
      <el-form-item label="讲师简介">
        <el-input v-model="teacher.intro" :rows="10" type="textarea"/>
      </el-form-item>

      <!-- 讲师头像：TODO -->
      <!-- 讲师头像 -->
      <el-form-item label="讲师头像">

        <!-- 头衔缩略图 -->
        <pan-thumb :image="teacher.avatar"/>
        <!-- 文件上传按钮 -->
        <el-button type="primary" icon="el-icon-upload" @click="imagecropperShow=true">更换头像</el-button>

        <!--v-show：是否显示上传组件
              :key：类似于id，如果一个页面多个图片上传控件，可以做区分
              :url：后台上传的url地址
              @close：关闭上传组件
              @crop-upload-success：上传成功后的回调
              field="file" 类似type=file文件上传 -->
        <image-cropper
          v-show="imagecropperShow"
          :width="300"
          :height="300"
          :key="imagecropperKey"
          :url="BASE_API+'/educos/filecos'"
          field="file"
          @close="close"
          @crop-upload-success="cropSuccess"/>

      </el-form-item>

      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// 引入调用teacher.js文件
import teacherApi from '@/api/edu/teacher'
import ImageCropper from '@/components/ImageCropper'
import PanThumb from '@/components/PanThumb'

export default {
  components: { ImageCropper, PanThumb },
  data() {
    return {
      teacher: {
        name: '',
        sort: 0,
        level: 1,
        career: '',
        intro: '',
        avatar: ''
      },
      saveBtnDisabled: false, // 保存按钮是否禁用,
      imagecropperShow: false, // 默认上传的组件是否显示
      imagecropperKey: 0, // 上传组件key值
      BASE_API: process.env.BASE_API// 获取dev.env.js端口号
    }
  },

  // vue监听页面路由变化，路由发生变化，方法执行
  // 解决从修改界面转到新增，表单不清空问题
  watch: {
    $route(to, from) {
      console.log('watch $route')
      this.init()
    }
  },

  created() {
    this.init()
  },

  methods: {

    // 关闭上传弹窗
    close() {
      this.imagecropperShow = false
      // 解决上传完图片重新上传需要点两次，将id+1
      this.imagecropperKey += 1
    },

    // 上传成功方法
    cropSuccess(data) {
      // 关闭弹窗
      this.imagecropperShow = false
      // 上传之后接口返回图片地址
      this.teacher.avatar = data.url
      // 解决上传完图片重新上传需要点两次，将id+1
      this.imagecropperKey += 1
    },

    init() {
      // 判断路径的save后面是否有id值，有则是修改，需要回显
      if (this.$route.params && this.$route.params.id) {
        const id = this.$route.params.id
        this.getInfo(id)
      } else {
        // 路径没有id值，是添加功能
        // 清空表单
        this.teacher = {}
      }
    },

    // 根据讲师id查询的方法
    getInfo(id) {
      teacherApi.getTeacherInfo(id)
        .then(response => {
        // eduTeacher为后端返回的值的key名
          this.teacher = response.data.eduTeacher
        })
    },

    saveOrUpdate() {
      // 判断是修改还是添加，修改teacher里面包含id，添加无id
      if (this.teacher.id) {
        // 修改
        this.updateTeacher()
      } else {
        // 添加
        this.saveTeacher()
      }
    },

    // 修改讲师的方法
    updateTeacher() {
      teacherApi.updateTeacherInfo(this.teacher)
        .then(response => { // 修改成功
          // 提示信息
          this.$message({
            type: 'success',
            message: '修改成功!'
          })
          // 回到列表页面 路由跳转
          this.$router.push({ path: '/teacher/list' })
        })
    },

    // 添加讲师的方法
    saveTeacher() {
      teacherApi.addTeacher(this.teacher)
        .then(response => { // 添加成功
          // 提示信息
          this.$message({
            type: 'success',
            message: '添加成功!'
          })
          // 回到列表页面 路由跳转
          this.$router.push({ path: '/teacher/list' })
        })
    }
  }
}
</script>
