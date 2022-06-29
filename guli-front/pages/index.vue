<!--suppress JSUnresolvedVariable -->
<template>

  <div>
    <!-- 幻灯片 开始 -->
    <div  v-if="bannerList!==[]" style="margin-top: 50px; margin-bottom: 50px">
      <el-carousel :interval="4000" type="card" >
        <el-carousel-item v-for="banner in bannerList" :key="banner.id">
          <div class="demo-image__placeholder">
            <div class="block">
              <a target="_blank" :href="banner.linkUrl">
                <el-image
                  :src="banner.imageUrl"
                  :href="banner.linkUrl"
                  fit="fit"
                  style="position:absolute;top:0;bottom:0;left:0;right:0;width:100%;height:100%;margin:auto;">
                  <div slot="placeholder" class="image-slot">
                    加载中<span class="dot">...</span>
                  </div>
                </el-image>
              </a>
            </div>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
    <!-- 幻灯片 结束 -->

    <div id="aCoursesList">
      <!-- 网校课程 开始 -->
      <div>
        <section class="container">
          <header class="comm-title">
            <h2 class="tac">
              <span class="c-333">热门课程</span>
            </h2>
          </header>
          <div>
            <article class="comm-course-list">
              <ul class="of" id="bna">

                <li v-for="course in courseList" :key="course.id">
                  <div class="cc-l-wrap">
                    <section class="course-img">
                      <img
                        :src="course.cover"
                        class="img-responsive"
                        alt="course.title"
                        style="width:300px;height:200px;display:block;margin:0 auto;"
                      >
                      <div class="cc-mask">
                        <a :href="'/course/'+course.id" title="开始学习" class="comm-btn c-btn-1">开始学习</a>
                      </div>
                    </section>
                    <h3 class="hLh30 txtOf mt10">
                      <a :href="'/course/'+course.id" title="course.title" class="course-title fsize18 c-333">{{ course.title }}</a>
                    </h3>
                    <section class="mt10 hLh20 of">
                      <span class="fr jgTag bg-green">
                        <i class="c-fff fsize12 f-fA" v-if="Number(course.price)===0">免费</i>
                        <i class="c-fff fsize12 f-fA" v-else>￥{{ course.price }}</i>
                      </span>
                      <span class="fl jgAttr c-ccc f-fA">
                        <i class="c-999 f-fA">{{ course.buyCount }}人购买</i>
                        |
                        <i class="c-999 f-fA">{{ course.viewCount }}人观看</i>
                      </span>
                    </section>
                  </div>
                </li>

              </ul>
              <div class="clear"></div>
            </article>
            <section class="tac pt20">
              <a href="/course" title="全部课程" class="comm-btn c-btn-2">全部课程</a>
            </section>
          </div>
        </section>
      </div>
      <!-- /网校课程 结束 -->
      <!-- 网校名师 开始 -->
      <div>
        <section class="container">
          <header class="comm-title">
            <h2 class="tac">
              <span class="c-333">名师大咖</span>
            </h2>
          </header>
          <div>
            <article class="i-teacher-list">
              <ul class="of">
                <li v-for="teacher in teacherList" :key="teacher.id">
                  <section class="i-teach-wrap">
                    <div class="i-teach-pic">
                      <a :href="'/teacher/'+teacher.id" title="teacher.name">
                        <img
                          :alt="teacher.name"
                          :src="teacher.avatar">
                      </a>
                    </div>
                    <div class="mt10 hLh30 txtOf tac">
                      <a :href="'/teacher/'+teacher.id" :title="teacher.name" class="fsize18 c-666">{{ teacher.name }}</a>
                    </div>
                    <div class="hLh30 txtOf tac">
                      <span class="fsize14 c-999">{{ teacher.career }}</span>
                    </div>
                    <div class="mt15 i-q-txt">
                      <p
                        class="c-999 f-fA"
                      >{{ teacher.intro }}</p>
                    </div>
                  </section>
                </li>
              </ul>
              <div class="clear"></div>
            </article>
            <section class="tac pt20">
              <a href="/teacher" title="全部讲师" class="comm-btn c-btn-2">全部讲师</a>
            </section>
          </div>
        </section>
      </div>
      <!-- /网校名师 结束 -->
    </div>
  </div>
</template>

<script>
import banner from '@/api/banner'
import index from '@/api/index'

import Vue from 'vue'
import {
  Notification,
  Message
} from 'element-ui'
Vue.prototype.$notify = Notification
Vue.prototype.$message = Message

export default {
  data () {
    return {
      swiperOption: {
        //配置分页
        pagination: {
          el: '.swiper-pagination'//分页的dom节点
        },
        //配置导航
        navigation: {
          nextEl: '.swiper-button-next',//下一页dom节点
          prevEl: '.swiper-button-prev'//前一页dom节点
        },
      },
      //banner数组
      bannerList: [],
      //热门课程
      courseList: [],
      //名师数组
      teacherList: []
    }
  },

  created() {
    //调用查询bannerList
    this.getIndexInfo()
  },

  methods: {
    getBannerList() {
      banner.getBannerList()
        .then(response => {
          // console.log("==============查询幻灯片==============")
          // console.log(response)
          this.bannerList = response.data.data.list
        })
    },
    getIndexInfo() {
      //获取幻灯片
      this.getBannerList()
      //获取名师和课程
      index.getIndex()
        .then(response => {
          console.log("==============查询热门课程和名师==============")
          console.log(response.data.data)
          this.courseList = response.data.data.courseList
          this.teacherList = response.data.data.teacherList

          //提示是否登录
          if (!response.data.data.isLogin) {
            this.$message({
              type: 'warning',
              message: '您未登录只可以查看免费课程'
            })
          }

        })
    }
  }

}
</script>
