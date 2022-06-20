<!--suppress ALL -->
<template>

  <div style="margin-top: 40px;margin-bottom: 40px;margin-left: 400px;margin-right: 400px;">
    <div class="demo-fit" style="margin-left: 46%;position: relative;">
      <el-avatar shape="square" :size="100" :fit="cover" :src="loginInfo.avatar"></el-avatar>
    </div>
    <el-descriptions title="" direction="vertical" :column="4" border>
      <el-descriptions-item label="用户名">{{ loginInfo.nickname }}</el-descriptions-item>
      <el-descriptions-item label="手机号">{{ loginInfo.mobile }}</el-descriptions-item>
      <el-descriptions-item label="性别" :span="2">
        {{ loginInfo.sex===1?'女生':'男生' }}
      </el-descriptions-item>
      <el-descriptions-item label="年龄">{{ loginInfo.age }}</el-descriptions-item>
      <el-descriptions-item label="账号状态">
        <el-tag v-if="loginInfo.isDisabled=='0'" size="small">正常</el-tag>
        <el-tag v-else size="small">禁用</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="签名">{{ loginInfo.sign }}</el-descriptions-item>
    </el-descriptions>
  </div>

</template>

<script>
  import 'assets/css/sign.css'
  import 'assets/css/iconfont.css'
  import cookie from "js-cookie";

  export default {
    layout: 'default',
    data() {
      return {
        loginInfo:{
          id: '',
          openid: '',
          mobile: '',
          nickname: '',
          sex: '',
          age: '',
          avatar: '',
          sign: '',
          isDisabled: '',
          isDeleted: '',
          gmtCreate: '',
          gmtModified: ''
        }
      }
    },
    created() {
      this.showInfo()
    },
    methods: {
      //创建方法，从cookie中获取用户信息
      showInfo() {
        //从cookie中获取用户信息
        var userStr = cookie.get('guli_ucenter')
        //将字符串转换为json对象
        if(userStr) {
          this.loginInfo = JSON.parse(userStr)
          console.log(this.loginInfo)
        }
      }

    }
  }
</script>
<style>
  .my-label-top {
    background: #f3e96e;
  }

  .my-label-buttom {
    background: #e087ee;
  }

  .my-content-top {
    background: #77b6f5;
  }

  .my-content-buttom {
    background: #76e8b4;
  }
  /* el-descriptions-item 文字居中 */
  .el-descriptions__body .el-descriptions__table .el-descriptions-item__cell {
    text-align: center;
  }

</style>
