<template>

  <div class="app-container">

    <h2 style="text-align: center;">发布新课程</h2>

    <el-steps :active="3" process-status="wait" align-center style="margin-bottom: 40px;">
      <el-step title="填写课程基本信息"/>
      <el-step title="创建课程大纲"/>
      <el-step title="发布课程"/>
    </el-steps>

    <div class="ccInfo">
      <img :src="coursePublish.cover">
      <div class="main">
        <h2>{{ coursePublish.title }}</h2>
        <p class="gray"><span>共{{ coursePublish.lessonNum }}课时</span></p>
        <p><span>所属分类：{{ coursePublish.subjectLevelOne }} -> {{ coursePublish.subjectLevelTwo }}</span></p>
        <p>课程讲师：{{ coursePublish.teacherName }}</p>
        <h3 class="red">￥{{ coursePublish.price }}</h3>
      </div>
    </div>

    <div>
      <el-button @click="previous">返回修改</el-button>
      <el-button :disabled="saveBtnDisabled" type="primary" @click="publish">发布课程</el-button>
    </div>
  </div>
</template>

<script>
import course from '@/api/edu/course'

export default {
  
    data() {
        return {
            saveBtnDisabled:false, //保存按钮是否禁用
            courseId:'',  //通过路由获取的课程id
            coursePublish: {} //最终前端的得到的显示信息类
        }
    },
    created() {

        //获取路由中的id
        if(this.$route.params && this.$route.params.id) {
            this.courseId = this.$route.params.id
            this.getPublishCourseInfo()
        } 
    },
    methods: {

      //根据课程id查新最终课程信息
      getPublishCourseInfo() {
        course.getPublishCourseInfo(this.courseId)
        .then(response=>{
          this.coursePublish = response.data.publishVo
          console.log(this.coursePublish)
        })
      },

      //返回章节小节页
      previous() {
          //跳转到上一步
          this.$router.push({path:'/course/chapter/'+this.courseId})
      },
      //正式发布课程
      publish() {
            this.$confirm('确定发布课程？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
              //最终发布
              course.officialPublishCourse(this.courseId)
              .then(response => {
                //提示信息
                this.$message({
                    type: 'success',
                    message: '课程发布成功!'
                });
                //跳转到课程列表页
                this.$router.push({path:'/course/list'})
              })
          })         
      }
    },
}
</script>

<style scoped>
.ccInfo {
    background: #f5f5f5;
    padding: 20px;
    overflow: hidden;
    border: 1px dashed #DDD;
    margin-bottom: 40px;
    position: relative;
}
.ccInfo img {
    background: #d6d6d6;
    width: 500px;
    height: 278px;
    display: block;
    float: left;
    border: none;
}
.ccInfo .main {
    margin-left: 520px;
}

.ccInfo .main h2 {
    font-size: 28px;
    margin-bottom: 30px;
    line-height: 1;
    font-weight: normal;
}
.ccInfo .main p {
    margin-bottom: 10px;
    word-wrap: break-word;
    line-height: 24px;
    max-height: 48px;
    overflow: hidden;
}

.ccInfo .main p {
    margin-bottom: 10px;
    word-wrap: break-word;
    line-height: 24px;
    max-height: 48px;
    overflow: hidden;
}
.ccInfo .main h3 {
    left: 540px;
    bottom: 20px;
    line-height: 1;
    font-size: 28px;
    color: #d32f24;
    font-weight: normal;
    position: absolute;
}
</style>