<!--suppress ALL -->
<template>
  <div class="in-wrap">
    <!-- 公共头引入 -->
    <header id="header">
      <section class="container">
        <h1 id="logo">
          <a href="/" title="谷粒学院">
            <img src="~/assets/img/logo.png" width="100%" alt="谷粒学院">
          </a>
        </h1>
        <div class="h-r-nsl">
          <ul class="nav">
            <router-link to="/" tag="li" active-class="current" exact>
              <a>首页</a>
            </router-link>
            <router-link to="/course" tag="li" active-class="current">
              <a>课程</a>
            </router-link>
            <router-link to="/teacher" tag="li" active-class="current">
              <a>名师</a>
            </router-link>
            <router-link to="/article" tag="li" active-class="current">
              <a>文章</a>
            </router-link>
            <router-link to="/qa" tag="li" active-class="current">
              <a>问答</a>
            </router-link>
          </ul>
          <!-- / nav -->
          <!-- / nav -->
          <ul class="h-r-login">
            <li v-if="!loginInfo.id" id="no-login">
              <a href="/login" title="登录">
                <em class="icon18 login-icon">&nbsp;</em>
                <span class="vam ml5">登录</span>
              </a>
              |
              <a href="/register" title="注册">
                <span class="vam ml5">注册</span>
              </a>
            </li>
            <li v-if="loginInfo.id" id="is-login-one" class="mr10">
              <!--TODO-->
              <a id="headerMsgCountId" href="javascript:void(0);" title="消息">
                <em class="icon18 news-icon">&nbsp;</em>
              </a>
              <q class="red-point" style="display: none">&nbsp;</q>
            </li>
            <li v-if="loginInfo.id" id="is-login-two" class="h-r-user">
              <!--TODO-->
              <a href="javascript:void(0);" :title="loginInfo.nickname" @click="showUserInfo()">
                <img
                  :src="loginInfo.avatar"
                  width="30"
                  height="30"
                  class="vam picImg"
                  alt
                >
                <span id="userName" class="vam disIb">{{ loginInfo.nickname }}</span>
              </a>
              <a href="javascript:void(0);" title="退出" @click="logout()" class="ml5">退出</a>
            </li>
            <!-- /未登录显示第1 li；登录后显示第2，3 li -->
          </ul>

          <aside class="h-r-search">
            <label class="h-r-s-box">
              <input type="text" placeholder="输入你想学的课程" v-model="courseName" value="java">
              <button @click="searchCourse()" class="s-btn">
                <em class="icon18">&nbsp;</em>
              </button>
            </label>
          </aside>
        </div>
        <aside class="mw-nav-btn">
          <div class="mw-nav-icon"></div>
        </aside>
        <div class="clear"></div>
      </section>
    </header>
    <!-- /公共头引入 -->

    <nuxt/>

    <!-- 公共底引入 -->
    <footer id="footer">
      <section class="container">
        <div class>
          <h4 class="hLh30">
            <span class="fsize18 f-fM c-999">友情链接</span>
          </h4>
          <ul class="of flink-list">
            <li>
              <a href="http://dandanit.cloud/" title="蛋蛋编程" target="_blank">蛋蛋编程</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
              <a href="http://www.mobanwang.com/" title="帮助中心" target="_blank">网页模板</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
              <a href="https://tenapi.cn" title="资源下载" target="_blank">公共接口</a>
            </li>
          </ul>
          <div class="clear"></div>
        </div>
        <div class="b-foot">
          <section class="fl col-7">
            <section class="mr20">
              <section class="b-f-link">
                <a
                  href="http://dandanit.cloud/"
                  title="关于我们"
                  target="_blank">关于我们</a>|
                <a
                  href="https://lk-1303842271.cos.ap-beijing.myqcloud.com/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20220623195434.jpg"
                  title="联系我们"
                  target="_blank">联系我们</a>|
                <span>联系方式：+86-18322280259(中国陕西西安)</span>
                <span>Email：464132475@qq.com</span>
              </section>
              <section class="b-f-link mt10">
                <a
                  href="https://lk-1303842271.cos.ap-beijing.myqcloud.com/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20220623195434.jpg"
                  target="_blank"
                >
                  <span>©版权均归蛋蛋编程所有</span>
                </a>
                <a href="https://beian.miit.gov.cn/" target="_blank">
                  <img src="~/assets/img/备案图标.png" alt="备案" title="备案">
                  <span>陕ICP备2022007452号</span>
                </a>
              </section>
            </section>
          </section>
          <aside class="fl col-3 tac mt15">
            <section class="gf-tx">
              <span>
                <a
                  href="https://lk-1303842271.cos.ap-beijing.myqcloud.com/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20220623195434.jpg">
                  <img src="~/assets/img/wx-icon.png" alt="联系微信" title="联系微信">
                </a>
              </span>
            </section>
            <section class="gf-tx">
              <span>
                <a href="javascript: void(0)" @click="undeveloped()">
                  <img src="~/assets/img/wb-icon.png" alt="联系微信" title="联系微信">
                </a>
              </span>
            </section>
          </aside>
          <div class="clear"></div>
        </div>
      </section>
    </footer>
    <!-- /公共底引入 -->
    <div id="app">
      <img src="assets/img/logo.png" alt="">
      <el-dialog
        title="搜索结果"
        :visible.sync="dialogVisible"
        width="30%"
        height="60%">
        <span style="white-space: pre-line;">{{ this.allCourse }}</span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import "~/assets/css/reset.css";
import "~/assets/css/theme.css";
import "~/assets/css/global.css";
import "~/assets/css/web.css";
import '~/assets/css/base.css'
import '~/assets/css/activity_tab.css'
import '~/assets/css/bottom_rec.css'
import '~/assets/css/nice_select.css'
import '~/assets/css/order.css'
import '~/assets/css/swiper-3.3.1.min.css'
import "~/assets/css/pages-weixinpay.css"

import loginApi from "@/api/login";
import cookie from "js-cookie";
import teacherApi from "@/api/teacher";
import courseApi from "@/api/course";

export default {

  data() {
    return {
      courseName: 'java',
      token: '',
      dialogVisible: false,
      allCourse:'',
      loginInfo: {
        id: '',
        age: '',
        avatar: '',
        mobile: '',
        nickname: '',
        sex: ''
      }
    }
  },
  created() {
    this.token = this.$route.query.token
    //console.log("token=" + this.token)
    //存在值传递
    if (this.token) {
      this.wxLogin()
    }
    this.showInfo()
  },
  methods: {

    //未开发
    undeveloped() {
      this.$message({
        type: 'success',
        message: "功能尚未开发！敬请期待"
      })
    },

    //通过取得路径中的token登录微信
    wxLogin() {
      //把token放入cookie
      cookie.set('guli_token', this.token, {domain: 'localhost'})
      //将用户信息记录cookie
      cookie.set('guli_ucenter', '', {domain: 'localhost'})
      //调用接口
      loginApi.getLoginInfo()
        .then(response => {
          this.loginInfo = response.data.data.userInfo
          cookie.set('guli_ucenter', this.loginInfo, {domain: 'localhost'})
        })
    },

    //创建方法，从cookie中获取用户信息
    showInfo() {
      //从cookie中获取用户信息
      let userStr = cookie.get('guli_ucenter')
      //将字符串转换为json对象
      if (userStr) {
        this.loginInfo = JSON.parse(userStr)
      }
    },

    //展示用户信息
    showUserInfo() {
      this.$router.push({path: '/user/userInfo'})
    },

    //退出登录
    logout() {
      cookie.set('guli_token', '', {domain: 'localhost'})
      cookie.set('guli_ucenter', '', {domain: 'localhost'})
      //跳转页面
      window.location.href = "/"
    },

    //搜索课程
    searchCourse() {
      courseApi.searchCourseByName(this.courseName)
        .then(response => {
          //console.log(response.data.data)
          //console.log(response.data.data.courseList)
          let courseTile = ""

          //提示是否登录
          if (!response.data.data.isLogin) {
            courseTile += '您未登录只能搜索到免费课程\r\n\r\n'
          }
          for (let i = 0; i < response.data.data.courseList.length; i++) {
            courseTile += response.data.data.courseList[i].title + '\r\n'
          }
          this.allCourse = courseTile
          this.dialogVisible = true
        })
    },
  }
};

</script>
<style>
#app {
  font-family: Helvetica, sans-serif;
  text-align: center;
}
</style>
