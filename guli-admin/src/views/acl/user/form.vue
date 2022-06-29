<template>
  <div class="app-container">
    <el-form ref="user" :model="user" :rules="validateRules" label-width="120px">

      <el-form-item label="用户名" prop="username">
        <el-input v-model="user.username"/>
      </el-form-item>

      <el-form-item label="用户昵称">
        <el-input v-model="user.nickName"/>
      </el-form-item>

      <el-form-item v-if="!user.id" label="用户密码" prop="password">
        <el-input v-model="user.password"/>
      </el-form-item>

      <el-form-item v-else label="新密码">
        <el-input placeholder="不填写默认不修改" v-model="newPwd"/>
      </el-form-item>
      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存</el-button>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>

import userApi from '@/api/acl/user'

const defaultForm = {
  username: '',
  nickName: '',
  password: ''
}

const validatePass = (rule, value, callback) => {
  if (value.length < 6) {
    callback(new Error('密码不能小于6位'))
    this.init()
  } else {
    callback()
  }
}

export default {
  data() {
    return {
      newPwd: '',
      user: defaultForm,
      saveBtnDisabled: false, // 保存按钮是否禁用,
      validateRules: {
        username: [{ required: true, trigger: 'blur', message: '用户名必须输入' }],
        password: [{ required: true, trigger: 'blur', validator: validatePass }]
      }
    }
  },

  // 监听器
  watch: {
    $route(to, from) {
      console.log('路由变化......')
      console.log(to)
      console.log(from)
      this.init()
    }
  },

  // 生命周期方法（在路由切换，组件不变的情况下不会被调用）
  created() {
    console.log('form created ......')
    this.init()
  },

  methods: {

    // 表单初始化
    init() {
      //debugger
      if (this.$route.params && this.$route.params.id) {
        const id = this.$route.params.id
        this.fetchDataById(id)
      } else {
        // 对象拓展运算符：拷贝对象，而不是赋值对象的引用
        this.user = { ...defaultForm }
      }
    },

    //新增或者修改用户
    saveOrUpdate() {
      this.$refs.user.validate(valid => {
        if (valid) {
          this.saveBtnDisabled = true // 防止表单重复提交
          if (!this.user.id) {
            //无id为新增
            this.saveData()
          } else {
            //有id为修改
            this.updateData()
          }
        }
      })
    },

    //新增用户
    saveData() {
      userApi.save(this.user).then(response => {
        // debugger
        if (response.success) {
          this.$message({
            type: 'success',
            message: response.message
          })
          this.$router.push({ path: '/acl/user/list' })
        }
      })
    },

    //修改用户
    updateData() {
      if(this.newPwd!=='') {
        this.user.password = this.newPwd
      }

      // teacher数据的获取
      userApi.updateById(this.user).then(response => {
        if (response.success) {
          this.$message({
            type: 'success',
            message: response.message
          })
          this.$router.push({ path: '/acl/user/list' })
        }
      })
    },

    // 根据id查询记录
    fetchDataById(id) {
      userApi.getById(id)
        .then(response => {
          console.log("============修改用户信息===========")
          console.log(response.data)
          this.user = response.data.user
      })
    }

  }
}
</script>
