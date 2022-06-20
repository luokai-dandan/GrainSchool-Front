<template>
  <div class="main">
    <div class="title">
      <a class="active" href="/verCodeLogin">免注册登录</a>
    </div>

    <div class="sign-up-container">
      <el-form ref="userForm" :model="user">

        <el-form-item class="input-prepend restyle" prop="mobile" :rules="[{ required: true, message: '请输入手机号码', trigger: 'blur' },{validator: checkPhone, trigger: 'blur'}]">
          <div >
            <el-input type="text" placeholder="手机号" v-model="user.mobile"/>
            <i class="iconfont icon-phone" />
          </div>
        </el-form-item>

        <el-form-item class="input-prepend restyle no-radius" prop="code" :rules="[{ required: true, message: '请输入验证码', trigger: 'blur' }]">
          <div style="width: 100%;display: block;float: left;position: relative">
            <el-input type="text" placeholder="验证码" v-model="user.code"/>
            <i class="iconfont icon-phone"/>
          </div>
          <div class="btn" style="position:absolute;right: 0;top: 6px;width: 40%;">
            <a href="javascript:" type="button" @click="getCodeFun()" :value="codeTest" style="color: #3FACEA">{{codeTest}}</a>
          </div>
        </el-form-item>

        <div class="btn">
          <input type="button" class="sign-in-button" value="注册登录" @click="login()">
        </div>

      </el-form>

    </div>

  </div>
</template>

<script>
import '~/assets/css/sign.css'
import '~/assets/css/iconfont.css'

import cookie from 'js-cookie'
import loginApi from "@/api/login";

export default {
  layout: 'sign',

  data () {
    return {
      user:{
        mobile:'',
        code:''
      },
      loginInfo:{},
      sending: true,      //是否发送验证码
      second: 60,        //倒计时间
      codeTest: '获取验证码'
    }
  },

  methods: {

    login() {
      loginApi.loginVerCode(this.user)
        .then(response=>{

          if(response.data.success){

            //把token存在cookie中、也可以放在localStorage中
            cookie.set('guli_token', response.data.data.token, { domain: 'localhost' })
            //登录成功根据token获取用户信息
            loginApi.getLoginInfo()
              .then(response => {

                this.loginInfo = response.data.data.userInfo
                //将用户信息记录cookie
                cookie.set('guli_ucenter', JSON.stringify(this.loginInfo), { domain: 'localhost' })

                this.$message({
                  type: 'success',
                  message: "登录成功"
                })
                //跳转页面
                window.location.href = "/";
              })
          }
        })
    },

    getCodeFun() {
      //sending = false
      //his.sending原为true,请求成功，!this.sending == true，主要是防止有人把disabled属性去掉，多次点击；
      if (!this.sending)
        return;
      //debugger
      // prop 换成你想监听的prop字段
      this.$refs.userForm.validateField('mobile', (errMsg) => {
        if (errMsg === '') {
          loginApi.sendCode(this.user.mobile).then(res => {
            this.sending = false;
            this.timeDown();
          });
        }
      })
    },

    //验证码显示倒计时
    timeDown() {
      let result = setInterval(() => {
        this.codeTest = this.second+"s可重新获取"
        --this.second;
        if (this.second < 0) {
          clearInterval(result);
          this.sending = true;
          //this.disabled = false;
          this.second = 60;
          this.codeTest = "重新获取验证码"
        }
      }, 1000);

    },

    checkPhone (rule, value, callback) {
      //debugger
      if (!(/^1[34578]\d{9}$/.test(value))) {
        return callback(new Error('手机号码格式不正确'))
      }
      return callback()
    }
  }
}
</script>
<style>
.el-form-item__error{
  z-index: 9999999;
}
</style>
