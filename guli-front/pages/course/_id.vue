<!--suppress JSUnresolvedVariable -->
<template>
  <div id="aCoursesList" class="bg-fa of">
    <!-- 课程详情 开始 -->
    <section class="container">

      <!-- 课程所属分类 开始 -->
      <section class="path-wrap txtOf hLh30">
        <a href="#" title class="c-999 fsize14">首页</a>
        \
        <a href="/course" title class="c-999 fsize14">课程列表</a>
        \
        <span class="c-333 fsize14">{{ course.subjectLevelOne }}</span>
        \
        <span class="c-333 fsize14">{{ course.subjectLevelTwo }}</span>
      </section>
      <!-- /课程所属分类 结束 -->

      <!-- 课程基本信息 开始 -->
      <div>
        <article class="c-v-pic-wrap" style="height: 357px;">
          <section id="videoPlay" class="p-h-video-box">
            <img
              :src="course.cover"
              :alt="course.title"
              class="dis c-v-pic"
              style="width: 650px;height: 357px"
            >
          </section>
        </article>
        <aside class="c-attr-wrap">
          <section class="ml20 mr15">
            <h2 class="hLh30 txtOf mt15">
              <span class="c-fff fsize24">{{ course.title }}</span>
            </h2>
            <section class="c-attr-jg">
              <span class="c-fff">价格：</span>
              <b class="c-yellow" style="font-size:24px;">
                {{ Number(course.price) === 0 ? '免费' : '￥ ' + course.price }}
              </b>
            </section>
            <section class="c-attr-mt c-attr-undis">
              <span class="c-fff fsize14">主讲： {{ course.teacherName }}&nbsp;&nbsp;&nbsp;</span>
            </section>
            <section class="c-attr-mt of">
                <span class="ml10 vam">
                    <em class="icon18 scIcon"/>
                    <a class="c-fff vam" title="收藏" href="#">收藏</a>
                </span>
            </section>
            <section class="c-attr-mt">
              <a href="#" title="立即观看" class="comm-btn c-btn-3" v-if="course.price===0">立即观看</a>
              <a @click="createOrder()" href="#" title="立即购买" class="comm-btn c-btn-3" v-else>立即购买</a>
            </section>
          </section>
        </aside>
        <aside class="thr-attr-box">
          <ol class="thr-attr-ol">
            <li>
              <p>&nbsp;</p>
              <aside>
                <span class="c-fff f-fM">购买数</span>
                <br>
                <h6 class="c-fff f-fM mt10">{{ course.buyCount }}</h6>
              </aside>
            </li>
            <li>
              <p>&nbsp;</p>
              <aside>
                <span class="c-fff f-fM">课时数</span>
                <br>
                <h6 class="c-fff f-fM mt10">{{ course.lessonNum }}</h6>
              </aside>
            </li>
            <li>
              <p>&nbsp;</p>
              <aside>
                <span class="c-fff f-fM">浏览数</span>
                <br>
                <h6 class="c-fff f-fM mt10">{{ course.viewCount }}</h6>
              </aside>
            </li>
          </ol>
        </aside>
        <div class="clear"/>
      </div>
      <!-- /课程基本信息 结束 -->

      <div class="mt20 c-infor-box">
        <article class="fl col-7">
          <section class="mr30">
            <div class="i-box">
              <div>
                <section id="c-i-tabTitle" class="c-infor-tabTitle c-tab-title">
                  <a name="c-i" class="current" title="课程详情">课程详情</a>
                </section>
              </div>
              <article class="ml10 mr10 pt20">

                <!-- 课程详情介绍 开始 -->
                <div>
                  <h6 class="c-i-content c-infor-title">
                    <span>课程介绍</span>
                  </h6>
                  <div class="course-txt-body-wrap">
                    <section class="course-txt-body">
                      <!-- 将内容中的html翻译过来 -->
                      <p v-html="course.description">{{ course.description }}</p>
                    </section>
                  </div>
                </div>
                <!-- /课程详情介绍 结束 -->

                <!-- 课程大纲 开始-->
                <div class="mt50">
                  <h6 class="c-g-content c-infor-title">
                    <span>课程大纲</span>
                  </h6>
                  <section class="mt20">
                    <div class="lh-menu-wrap">
                      <menu id="lh-menu" class="lh-menu mt10 mr10">
                        <ul>
                          <!-- 课程章节目录 -->
                          <li v-for="chapter in chapterList" :key="chapter.id" class="lh-menu-stair">
                            <a :title="chapter.title" class="current-1">
                              <em class="lh-menu-i-1 icon18 mr10"/>{{ chapter.title }}
                            </a>
                            <ol class="lh-menu-ol" style="display: block;">
                              <li v-for="video in chapter.children" :key="video.id" class="lh-menu-second ml30">
                                <a :href="video.videoUrl" :title="video.videoUrl" target="_blank">
                                    <span class="fr">
                                        <i class="free-icon vam mr10">免费试听</i>
                                    </span>
                                  <em class="lh-menu-i-2 icon16 mr5">&nbsp;</em>{{ video.title }}
                                </a>
                              </li>
                            </ol>
                          </li>
                        </ul>
                      </menu>
                    </div>
                  </section>
                </div>
                <!-- /课程大纲 结束 -->
              </article>
            </div>
          </section>
        </article>
        <aside class="fl col-3">
          <div class="i-box">
            <!-- 主讲讲师 开始-->
            <div>
              <section class="c-infor-tabTitle c-tab-title">
                <a title :href="'/teacher/'+course.teacherId" target="_blank">主讲讲师</a>
              </section>
              <section class="stud-act-list">
                <ul style="height: auto;">
                  <li>
                    <div class="u-face">
                      <a :href="'/teacher/'+course.teacherId" target="_blank">
                        <img :src="course.avatar" width="50" height="50" alt>
                      </a>
                    </div>
                    <section class="hLh30 txtOf">
                      <a :href="'/teacher/'+course.teacherId" class="c-333 fsize16 fl"
                         target="_blank">{{ course.teacherName }}</a>
                    </section>
                    <section class="hLh20 txtOf">
                      <span class="c-999">{{ course.intro }}</span>
                    </section>
                  </li>
                </ul>
              </section>
            </div>
            <!-- /主讲讲师 结束 -->
          </div>
        </aside>
        <div class="clear"/>
      </div>
    </section>
    <!-- /课程详情 结束 -->
    <div class="mt50 commentHtml">
      <div>
        <h6 class="c-c-content c-infor-title" id="i-art-comment">
          <span class="commentTitle">课程评论 | &nbsp; {{ userInfo.name }}</span>
        </h6>
        <span style="margin-left: 20px"></span>
        <section class="lh-bj-list pr mt20 replyhtml">
          <ul>
            <li class="unBr">
              <aside class="noter-pic">
                <a href="/user/userInfo" target="_blank">
                  <img width="50" height="50" class="picImg" :src="userInfo.avatar" title="点击查看个人信息">
                </a>
              </aside>
              <div class="of">
                <section class="n-reply-wrap">
                  <fieldset>
                    <textarea name="" v-model="comment.content" placeholder="输入您要评论的文字" id="commentContent"></textarea>
                  </fieldset>
                  <p class="of mt5 tar pl10 pr10">
                    <span class="fl "><tt class="c-red commentContentmeg" style="display: none;"></tt></span>
                    <input
                      type="button"
                      @click="addComment()"
                      value="发布"
                      class="lh-reply-btn"
                      style="width: 100px;height: 40px;margin-right: 10px"
                    >
                  </p>
                </section>
              </div>
            </li>
          </ul>
        </section>
        <section class="">
          <section class="question-list lh-bj-list pr">
            <ul class="pr10">
              <li v-for="(comment,index) in data.items" v-bind:key="index">
                <aside class="noter-pic">
                  <img width="50" height="50" class="picImg" :src="comment.avatar">
                </aside>
                <div class="of">
                    <span class="fl">
                    <font class="fsize12 c-blue">
                      {{ comment.nickname }}</font>
                    <font class="fsize12 c-999 ml5">评论：</font></span>
                </div>
                <div class="noter-txt mt5">
                  <p>{{ comment.content }}</p>
                </div>
                <div class="of mt5">
                  <span class="fr"><font class="fsize12 c-999 ml5">{{ comment.gmtCreate }}</font></span>
                </div>
              </li>

            </ul>
          </section>
        </section>

        <!-- 公共分页 开始 -->
        <div class="paging" v-if="pages>1">
          <!-- undisable这个class是否存在，取决于数据属性hasPrevious -->
          <a
            :class="{undisable: !data.hasPrevious}"
            href="#"
            title="首页"
            @click.prevent="gotoPage(1)">首</a>
          <a
            :class="{undisable: !data.hasPrevious}"
            href="#"
            title="前一页"
            @click.prevent="gotoPage(data.current-1)">&lt;</a>
          <a
            v-for="page in data.pages"
            :key="page"
            :class="{current: data.current === page, undisable: data.current === page}"
            :title="'第'+page+'页'"
            href="#"
            @click.prevent="gotoPage(page)">{{ page }}</a>
          <a
            :class="{undisable: !data.hasNext}"
            href="#"
            title="后一页"
            @click.prevent="gotoPage(data.current+1)">&gt;</a>
          <a
            :class="{undisable: !data.hasNext}"
            href="#"
            title="末页"
            @click.prevent="gotoPage(data.pages)">末</a>
          <div class="clear"/>
        </div>
        <!-- 公共分页 结束 -->
      </div>
    </div>
  </div>
</template>

<script>
import courseApi from "@/api/course"
import commentApi from "@/api/commentedu"
import orderApi from '@/api/order'

export default {

  asyncData({params, error}) {
    return courseApi.getCourseDetailInfoById(params.id).then(response => {

      console.log("===========课程详情============");
      console.log(response.data.data.course);
      console.log("===========章节列表============");
      console.log(response.data.data.chapterVoList);
      console.log("===========课程视频============");
      console.log(response.data.data.chapterVoList[1]);
      return {
        course: response.data.data.course,
        chapterList: response.data.data.chapterVoList,
        courseId: params.id
      }
    })
  },

  //和页面异步开始的
  data() {
    return {
      data: {},
      userInfo: {},
      page: 1,
      limit: 6,
      total: 10,
      pages: 0,
      comment: {
        content: '',
        courseId: ''
      },
      courseInfo: {},
      chapterVideoList: [],
      isbuyCourse: false
    }
  },
  created() {
    this.initCourseInfo()
    this.initComment()
    this.initUserInfo()
  },
  methods: {

    //根据课程id和用户id创建订单
    createOrder() {
      orderApi.createOrder(this.courseId)
        .then(response => {
          //返回订单号
          console.log("==========生成订单号========")
          console.log(response.data.data.orderNo)
          //生成订单后跳转订单显示页面
          this.$router.push({path:'/order/'+response.data.data.orderNo})
        })
    },

    //获取课程详情
    initCourseInfo() {
      courseApi.getCourseDetailInfoById(this.courseId)
        .then(response => {
          console.log("===========课程详情==========")
          console.log(response.data.data)
          this.courseInfo = response.data.data.course
          this.chapterVideoList = response.data.data.chapterVoList
          this.isbuyCourse = response.data.data.isbuyCourse
        })
    },

    //获取用户信息用来显示头像等信息
    initUserInfo() {
      commentApi.getUserInfo()
        .then(response => {
          console.log("==========用户信息============")
          console.log(response.data.data.userInfo)
          if (response.data.data.userInfo===""){
            this.$message({
              type:'warning',
              message: "当前未登陆账号，登陆账号后才可评论"
            })
            return
          }
          this.userInfo = response.data.data.userInfo
        })
    },

    //初始化获取课程评论
    initComment() {
      commentApi.getPageList(this.page, this.limit, this.courseId)
        .then(response => {
          console.log("===========初始化评论===========")
          console.log(response.data.data)
          this.pages = response.data.data.pages
          this.data = response.data.data
        })
    },

    //添加评论
    addComment() {
      console.log("===========添加评论===========")
      console.log(this.courseId)
      console.log(this.courseInfo.teacherId)
      console.log(this.comment)
      this.comment.courseId = this.courseId
      this.comment.teacherId = this.courseInfo.teacherId
      commentApi.addComment(this.comment)
        .then(response => {
          if (response.data.success) {
            this.comment.content = ''
            this.initComment()
          }
        })
    },

    //跳转分页
    gotoPage(page) {
      commentApi.getPageList(page, this.limit, this.courseId)
        .then(response => {
          this.data = response.data.data
        })
    },
  }
}
</script>
