<template>

  <div class="app-container">

    <h2 style="text-align: center;">发布新课程</h2>

    <el-steps :active="1" process-status="wait" align-center style="margin-bottom: 40px;">
      <el-step title="填写课程基本信息"/>
      <el-step title="创建课程大纲"/>
      <el-step title="最终发布"/>
    </el-steps>

    <el-form label-width="120px">

        <el-form-item label="课程标题">
            <el-input v-model="courseInfo.title" placeholder=" 示例：机器学习项目课：从基础到搭建项目视频课程。专业名称注意大小写"/>
        </el-form-item>

        <!-- 所属分类 TODO -->
        <!-- 课程分类 -->
        <el-form-item label="课程分类">
            <!-- 一级分类 -->
            <el-select v-model="courseInfo.subjectParentId" 
                    placeholder="请选择" 
                    @change="subjectLevelOneChanged">
                <el-option
                    v-for="subject in subjectOneList"
                    :key="subject.id"
                    :label="subject.title"
                    :value="subject.id"/>
            </el-select>

            <!-- 二级分类 -->
            <el-select v-model="courseInfo.subjectId" 
                    placeholder="请选择">
                <el-option
                    v-for="subject in subjectTwoList"
                    :key="subject.id"
                    :label="subject.title"
                    :value="subject.id"/>
            </el-select>
        </el-form-item>

        <!-- 课程讲师 TODO -->
        <!-- 课程讲师 -->
        <el-form-item label="课程讲师">
            <el-select v-model="courseInfo.teacherId" 
                    placeholder="请选择">
                <el-option
                    v-for="teacher in teacherList"
                    :key="teacher.id"
                    :label="teacher.name"
                    :value="teacher.id"/>
            </el-select>
        </el-form-item>

        <el-form-item label="总课时">
            <el-input-number :min="0" size="medium" v-model="courseInfo.lessonNum" placeholder="请填写课程的总课时数" label="描述文字"/>
            <el-label style="margin-left: 8px;">小时</el-label>
        </el-form-item>

        <el-form-item label="课程价格">
            <el-input-number :min="0" size="medium" v-model="courseInfo.price" placeholder="免费课程请设置为0元"/>
            <el-label style="margin-left: 8px;">元</el-label>
        </el-form-item>

        <!-- 课程封面 TODO -->
        <!-- 课程封面-->
        <el-form-item label="课程封面">
            <el-upload
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
                :action="BASE_API+'/educos/filecos'"
                class="avatar-uploader">
                <img :src="courseInfo.cover" width="300px" height="300px">
            </el-upload>
        </el-form-item>

        <!-- 课程简介 TODO -->
        <!-- 课程简介-->
        <el-form-item label="课程简介">
            <tinymce :height="300" v-model="courseInfo.description"/>
        </el-form-item>
        

        <el-form-item>
            <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate" style="margin-top: 10px;">保存并下一步</el-button>
        </el-form-item>
    </el-form>

  </div>
</template>

<script>
import course from '@/api/edu/course'
import subject from '@/api/edu/subject'
import Tinymce from '@/components/Tinymce' //引入富文本组件

export default {
    //声明富文本组件
    components: { Tinymce },
    data() {
        return {
            saveBtnDisabled:false,
            courseInfo:{
                title: '',
                subjectId: '', //二级分类id
                subjectParentId:'', //一级分类id
                teacherId: '',
                lessonNum: 0,
                description: '',
                cover: '/static/tutu.jpg',
                price: 0
            },
            courseId: '',
            BASE_API: process.env.BASE_API, // 接口API地址
            teacherList:[], //封装所有讲师
            subjectOneList:[], //一级分类
            subjectTwoList:[] //二级分类

        }
    },
    watch:{ 
        $route(to,from){
            //Tinymce.activeEditor.setContent('')
            //Tinymce.setContent('')
            this.courseInfo={
                title: '',
                subjectId: '', //二级分类id
                subjectParentId:'', //一级分类id
                teacherId: '',
                lessonNum: 0,
                description: '',
                cover: '/static/tutu.jpg',
                price: 0
            }
            //初始化所有讲师
            this.getListTeacher()
            //初始化一级分类
            this.getOneSubject()
        }
    },
    created() {
        //获取路由中的id值
        //获取路由中的id
        if(this.$route.params && this.$route.params.id) {
            this.courseId = this.$route.params.id
            //调用根据id查询方法
            this.getInfo()

        } else {
            //初始化所有讲师
            this.getListTeacher()
            //初始化一级分类
            this.getOneSubject()
        }
        
    },
    methods: {
        //根据课程id查询信息
        getInfo() {
            course.getCourseInfoById(this.courseId)
            .then(response => {
                //在courseInfoVo课程基本信息中包含一级分类id和二级分类id
                this.courseInfo = response.data.courseInfoVo
                //1 查询所有分类，包含一级和二级（解决数据回显二级分类显示id问题，因为二级分类对照时为空）
                subject.getSubjectList()
                .then(response => {
                    //2 获取所有一级分类
                    this.subjectOneList = response.data.list
                    //3 把所有一级分类数组进行遍历，比较当前courseId里面的一级分类id和所有的一级分类id
                    for (var i=0; i<this.subjectOneList.length; i++) {
                        //获取每个一级分类
                        var oneSubject = this.subjectOneList[i]
                        //比较当前courseInfo里面的一级分类id和所有的一级分类id
                        if (this.courseInfo.subjectParentId == oneSubject.id) {
                            //获取对应一级分类下的所有二级分类
                            this.subjectTwoList = oneSubject.children
                        }
                    }
                })
                //初始化所有讲师
                this.getListTeacher()
            })
        },

        //上传封面成功的方法
        handleAvatarSuccess(res, file) {
            console.log(res)// 上传响应
            console.log(URL.createObjectURL(file.raw))// base64编码
            this.courseInfo.cover = res.data.url
        },

        //上传之前调用的方法
        beforeAvatarUpload(file) {
            //const isJPG = file.type === 'image/jpeg'
            var testmsg = /^image\/(jpeg|png|jpg)$/.test(file.type)
            var size = 2
            const isLt2M = file.size / 1024 / 1024 < size

            if (!testmsg) {
                this.$message.error('上传图片格式不对!')
                return
            }

            //if (!isJPG) {
            //    this.$message.error('上传头像图片只能是 JPG 格式!')
            //}

            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 '+ size +'MB!')
            }
            return testmsg && isLt2M
        },

        //点击某个一级分类，触发change，显示对应二级分类
        subjectLevelOneChanged(value) {
            //value就是一级分类id值
            //遍历所有分类，包含一级和二级
            for (let i = 0; i < this.subjectOneList.length; i++) {
                //每个一级分类
                let oneSubject = this.subjectOneList[i]
                //判断所有一级分类id和点击的一级分类id是否相同
                if (oneSubject.id === value) {
                    //从一级分类中取出对应二级分类
                    this.subjectTwoList = oneSubject.children
                    //更改一级分类将二级分类清空
                    this.courseInfo.subjectId = ''
                    //this.courseInfo.subjectParentId = value
                }
            }
        },

        //查询所有的一级分类
        getOneSubject() {
            subject.getSubjectList()
            .then(response => {
                this.subjectOneList = response.data.list
            })
        },

        //查询所有的讲师
        getListTeacher() {
            course.getListTeacher()
            .then(response => {
                this.teacherList = response.data.list
            })
        },

        //添加课程
        addCourse() {
            console.log(this.courseInfo)
            course.addCourseInfo(this.courseInfo)
            .then(response => {
                //提示
                this.$message({
                    type: 'success',
                    message: '添加课程信息成功！'
                });
                //console.log(response)
                //跳转到下一步
                this.$router.push({path:'/course/chapter/'+response.data.courseId})
            })
        },
        //修改课程
        updateCourse() {
            course.updateCourseInfo(this.courseInfo)
            .then(response => {
                //提示
                this.$message({
                    type: 'success',
                    message: '修改课程信息成功！'
                });
                //console.log(response)
                //跳转到下一步
                this.$router.push({path:'/course/chapter/'+this.courseId})
            })
        },
        saveOrUpdate() {
            //判断添加还是修改
            if(!this.courseInfo.id) {
                //没有id，表示是添加
                this.addCourse()
            } else {
                //修改
                this.updateCourse()
            }
        }
    },
}
</script>

<style scoped>
    .tinymce-container {
        line-height: 29px;
    }
</style>