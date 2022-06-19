<template>

  <div class="app-container">

    <h2 style="text-align: center;">发布新课程</h2>

    <el-steps :active="2" process-status="wait" align-center style="margin-bottom: 40px;">
      <el-step title="填写课程基本信息"/>
      <el-step title="创建课程大纲"/>
      <el-step title="最终发布"/>
    </el-steps>

    <el-button size="medium" type="primary" plain @click="openChapterDialog">添加章节</el-button>

    <!-- 章节 -->
    <ul class="chanpterList">
        <li
            v-for="chapter in chapterVideoList"
            :key="chapter.id">
            <p>
                {{ chapter.title }}

                <span class="acts">
                    <el-button size="medium" type="primary" plain @click="openVideo(chapter.id)">添加小节</el-button>
                    <el-button size="medium" type="success" plain @click="openEditChapter(chapter.id)">编辑</el-button>
                    <el-button size="medium" type="danger" plain  @click="removeChapter(chapter.id)">删除</el-button>
                </span>
            </p>

            <!-- 小节视频 -->
            <ul class="chanpterList videoList">
                <li
                    v-for="video in chapter.children"
                    :key="video.id">
                    <p>{{ video.title }}
                        <span class="acts">
                            <el-button type="primary" size="mini" plain @click="openEditVideo(video.id)">编辑</el-button>
                            <el-button type="success" size="mini" plain @click="openVideoDisplay(video.videoUrl)" v-if="video.videoUrl">视频</el-button>
                            <el-button type="danger" size="mini" plain @click="removeVideo(video.id)">删除</el-button>
                        </span>
                    </p>
                </li>
            </ul>
        </li>
    </ul>
    <div style="margin-top: 30px;">
        <el-button @click="previous">上一步</el-button>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="next">下一步</el-button>
    </div>

    <!-- 添加和修改章节表单 -->
    <el-dialog :visible.sync="dialogChapterFormVisible" title="添加/编辑章节">
        <el-form :model="chapter" label-width="120px">
            <el-form-item label="章节标题">
                <el-input v-model="chapter.title"/>
            </el-form-item>
            <el-form-item label="章节排序">
                <el-input-number v-model="chapter.sort" :min="0" controls-position="right"/>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogChapterFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="saveOrUpdate">确 定</el-button>
        </div>
    </el-dialog>

    <!-- 添加和修改小节表单 -->
    <el-dialog :visible.sync="dialogVideoFormVisible" title="添加/编辑小节">
    <el-form :model="video" label-width="120px">
        <el-form-item label="小节标题">
        <el-input v-model="video.title"/>
        </el-form-item>
        <el-form-item label="小节排序">
        <el-input-number v-model="video.sort" :min="0" controls-position="right"/>
        </el-form-item>
        <el-form-item label="是否免费">
        <el-radio-group v-model="video.isFree">
            <el-radio :label="1">免费</el-radio>
            <el-radio :label="0">收费</el-radio>
        </el-radio-group>
        </el-form-item>
        <el-form-item label="视频">
            <div v-if="video.videoUrl">
                <el-label >{{video.videoOriginalName}}<i class="el-icon-view el-icon--right"></i>  </el-label>
                <el-button type="success" size="mini" plain @click="openVideoDisplay(video.videoUrl)" v-if="video.videoUrl">查看</el-button>
            </div>
            <div v-else>
                <el-label style="color: red;">暂无视频,请先上传<i class="el-icon-view el-icon--right"></i>  </el-label>
            </div>
        </el-form-item>
        
        
        
        <el-form-item label="上传视频">
            <template>
            <div class="container">
                <div class="upload_video" id="upload_video">
                <el-upload
                    class="upload-demo"
                    ref="upload"
                    action="#"
                    :http-request="uploadVideo"
                    :limit="1"
                    :on-exceed="handleExceed"
                    :on-remove="handleRemove"
                    :on-change="handleChange"
                    :before-remove="beforeRemove"
                    :auto-upload="false">
                    <el-button slot="trigger" size="small" type="primary">选取视频</el-button>
                    <el-button style="margin-left: 40px;" size="small" type="success" @click="submitUpload">点击上传</el-button>
                    <el-progress class="progress" :text-inside="true" :stroke-width="18" :percentage="progress"
                                status="success"></el-progress>
                    <div slot="tip" class="el-upload__tip">建议上传mp4文件, 且不超过500M</div>
                </el-upload>
                </div>
            </div>
            </template>
        <!-- TODO -->
        </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVideoFormVisible = false">取 消</el-button>
        <el-button :disabled="saveVideoBtnDisabled" type="primary" @click="saveOrUpdateVideo">确 定</el-button>
    </div>
    </el-dialog>
  </div>
</template>

<script>
import chapter from '@/api/edu/chapter'
import video from '@/api/edu/video'
import TcVod from 'vod-js-sdk-v6'
import {getSignature} from "@/api/edu/video"
import axios from 'axios'
import VueAxios from 'vue-axios'
VueAxios.prototype.$http = axios

export default {
    data() {
        return {
            saveBtnDisabled:false,
            courseId:'',
            chapterVideoList:[],
            dialogChapterFormVisible:false, //章节弹框
            chapter:{
                //封装章节数据
                title: '',
                sort: 0
            },
            saveVideoBtnDisabled: false, // 小节按钮是否禁用
            dialogVideoFormVisible: false, // 小节弹框
            chapterId: '', // 课时所在的章节id
            video: {// 课时对象
                title: '',
                sort: 0,
                isFree: 1,
                videoSourceId: '',
                videoOriginalName: '',
                videoUrl:''
            },

            fileList: [],  // 文件列表
            file: '', //上传的文件
            videoURL: '',  // 上传成功后的地址
            progress: 0,  // 进度条百分比
            fileId: '',  // 上传视频获取成功后拿到的fileID【备用】
            msg: "",  //云点播签名
            verifyContent: "" //验证内容
        }
    },
    created() {

        //获取路由中的id
        if(this.$route.params && this.$route.params.id) {
            this.courseId = this.$route.params.id
            //根据课程id查询章节和小节
            this.getChapterVideo()
        }
    },
    mounted() {
        let that = this;
        // 获取签名 这里的签名请求是由后端提供的，只需要拿到后端给的签名请求即可
        video.getSign()
        .then((res)=>{
            //console.log("==========获取签名=========")
            //console.log(res)
            that.msg = res.data.signature
            
        })
    },
    methods: {
        
        //待上传列表
        handleChange(file, fileList) {
            this.file = file
            this.fileList = fileList
            // console.log("=======待上传列表=======")
            // console.log(file)
            // console.log(fileList)
            // console.log(fileList.length)
        },

        handleExceed(files, fileList) {
            this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
        },
        // 点击上传时
        submitUpload() {
            if (this.fileList.length < 1) return this.$alert('请先选取视频，再进行上传', '提示')
            this.uploadVideo()
        },
        // 自定义上传
        uploadVideo(e) {
            let that = this;
            //console.log(this.fileList[0].raw)
            if (this.fileList.length < 1) {
                window.alert('您还没有选取文件')
            } else {
            //必须以函数的形式返回 sdk参数限制
            const getSignature = async () => {
                const data = that.msg;
                //console.log(this.msg)
                return data
            }
            //console.log(this.msg)
            const tcVod = new TcVod({
                getSignature: getSignature // 获取上传签名的函数
            })
            // 获取通过elementui上传到本地的文件 因为参数类型必须为file 不能直接以对象的形式传输
            const mediaFile = this.fileList[0].raw
            const uploader = tcVod.upload({
                mediaFile: mediaFile
            })
            // 监听上传进度
            uploader.on('media_progress', info => {
                this.progress = parseInt(info.percent * 100)
            })
            // 上传结束时，将url存到本地
            uploader.done().then(doneResult => {

                this.fileId = doneResult.fileId
                this.videoURL = doneResult.video.url
                this.verifyContent = doneResult.video.verify_content

                //console.log("=======返回结果=======")
                //console.log(doneResult)
                //console.log(this.fileId)
                //console.log(this.videoURL)
                //console.log(this.verifyContent)

                //上传成功，将video对象参数填充
                //console.log(this.file.name)
                this.video.videoSourceId = this.fileId
                this.video.videoOriginalName = this.file.name
                this.video.videoUrl = this.videoURL

            })
            }
        },

        //点击删除上传视频列表
        handleRemove(file, fileList) {

            //console.log("=======删除列表=======")
            //console.log(file)
            //console.log(fileList)
            //console.log(fileList.length)
            //清空表单
            this.file = ""
            this.fileList = [],
            this.video.videoSourceId = "",
            this.video.videoOriginalName = "",
            this.video.videoUrl = ""
           
        },

        //移除文件提示
        beforeRemove(file, fileList) {

            return this.$confirm(`确定移除 ${ file.name }? `);
        },

        //打开弹窗
        openVideo(chapterId) {
            //打开弹窗
            this.dialogVideoFormVisible=true
            //设置章节id
            this.video.chapterId = chapterId
            //清空表单
            this.video.title = ''
            this.video.sort = 0
            this.video.isFree = 1
            this.video.videoSourceId = ''

        },

        //添加小节
        addVideo() {
            //设置课程ID（因为章节的定位字段同时需要有课程id和章节id）
            this.video.courseId = this.courseId
            //console.log(this.video)
            video.addVideo(this.video)
            .then(response => {
                //添加成功
                //关闭弹框
                this.dialogVideoFormVisible = false
                //提示
                this.$message({
                    type: 'success',
                    message: '添加小节成功！'
                });
                //刷新页面
                this.getChapterVideo()    
            })
        },

        //修改小节
        openEditVideo(videoId) {
            //弹框
            this.dialogVideoFormVisible = true
            //查询回显数据
            video.getVideo(videoId)
            .then(response => {
                this.video = response.data.eduVideo
                // console.log(this.video)
                // this.file = response.data.eduVideo.videoOriginalName
                // this.fileList[0] = this.file
                // console.log( this.file)
                // console.log(this.fileList)

            })
        },

        //修改小节的方法
        updateVideo() {
            video.updateVideo(this.video)
            .then(response => {
                //修改成功
                //关闭弹框
                this.dialogVideoFormVisible = false
                //修改成功后清空小节对象
                this.video.title = ''
                this.video.sort = 0
                this.video.id = ''
                this.video.isFree = 1
                this.video.videoSourceId = ''
                //提示
                this.$message({
                    type: 'success',
                    message: '修改小节成功！'
                });
                //刷新页面
                this.getChapterVideo()
            })
        },
        
        //打开播放小节视频
        openVideoDisplay(videoUrl) {
            this.$confirm('将重新打开新标签页播放此视频, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                window.open(videoUrl, '_blank')
            })
        },

        //删除小节
        removeVideo(videoId){
            this.$confirm('此操作将永久删除小节, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                //删除成功
                video.deleteVideo(videoId)
                .then(response => {
                    //提示信息
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    //刷新页面
                    this.getChapterVideo()
                })
            })
        },

        //修改和修改小节
        saveOrUpdateVideo() {
            //如果小节里面无id，则是添加操作
            if (!this.video.id){
                this.addVideo()
            } else {
                //修改操作
                this.updateVideo(this.video.id)
            }
        },

        //=====================================章节操作======================================
        //删除章节
        removeChapter(chapterId) {
            this.$confirm('此操作将永久删除章节, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            //删除成功
            chapter.deleteChapter(chapterId)
            .then(response => {
                //提示信息
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
                //刷新页面
                this.getChapterVideo()
            })
          })
        },

        //回显修改章节弹窗数据
        openEditChapter(chapterId) {
            //弹框
            this.dialogChapterFormVisible = true
            //查询回显数据
            chapter.getChapter(chapterId)
            .then(response => {
                this.chapter = response.data.chapter
            })
        },

        //添加章节弹窗
        openChapterDialog() {
            //打开弹窗
            this.dialogChapterFormVisible=true
            //清空表单
            this.chapter.title = ''
            this.chapter.sort = ''
        },
        
        //添加章节
        addChapter() {
            //设置courseId到chapter中
            this.chapter.courseId = this.courseId
            chapter.addChapter(this.chapter)
            .then(response => {
                //添加成功
                //关闭弹框
                this.dialogChapterFormVisible = false
                //提示
                this.$message({
                    type: 'success',
                    message: '添加章节成功！'
                });
                //刷新页面
                this.getChapterVideo()    
            })
        },

        //修改章节的方法
        updateChapter() {
            chapter.updateChapter(this.chapter)
            .then(response => {
                //修改成功
                //关闭弹框
                this.dialogChapterFormVisible = false
                //修改成功后清空章节对象
                this.chapter.title = ''
                this.chapter.sort = ''
                this.chapter.id = ''
                //提示
                this.$message({
                    type: 'success',
                    message: '修改章节成功！'
                });
                //刷新页面
                this.getChapterVideo()
            })
        },

        //添加和修改章节
        saveOrUpdate() {
            //如果章节里面无id，则是添加操作
            if (!this.chapter.id){
                this.addChapter()
            } else {
                //修改操作
                this.updateChapter(this.chapter.id)
            }     
        },
        
        //根据课程id查询章节和小节
        getChapterVideo() {
            chapter.getAllChapterVideo(this.courseId)
            .then(response => {
                this.chapterVideoList = response.data.allChapterVideo
                //console.log(this.chapterVideoList)
            })
        },
        previous() {
            //跳转到上一步
            this.$router.push({path:'/course/info/'+this.courseId})
        },
        next() {
            //跳转到下一步
            this.$router.push({path:'/course/publish/'+this.courseId})
        }
    },
}
</script>

<style scoped>
.chanpterList{
    position: relative;
    list-style: none;
    margin: 0;
    padding: 0;
}
.chanpterList li{
    position: relative;
}
.chanpterList p{
    float: left;
    font-size: 20px;
    margin: 10px 0;
    padding: 10px;
    height: 70px;
    line-height: 50px;
    width: 100%;
    border: 1px solid #DDD;
}
.chanpterList .acts {
    float: right;
    font-size: 14px;
}

.videoList{
    padding-left: 50px;
}
.videoList p{
    float: left;
    font-size: 14px;
    margin: 10px 0;
    padding: 10px;
    height: 50px;
    line-height: 30px;
    width: 100%;
    border: 1px dotted #DDD;
}

</style>