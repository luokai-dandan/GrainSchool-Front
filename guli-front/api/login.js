import request from '@/utils/request'
export default {
  //登录
  loginByPwd(pwdLoginVo) {
    return request({
      url: '/educenter/member/loginByPwd',
      method: 'post',
      data: pwdLoginVo
    })
  },
  //验证码登录
  loginVerCode(verCodeLoginVo) {
    return request({
      url: '/educenter/member/loginByCode',
      method: 'post',
      data: verCodeLoginVo
    })
  },
  //根据手机号码发送短信
  sendCode(phone) {
    return request({
      url: `/edumsm/msm/send/${phone}`,
      method: 'get'
    })
  },
  //根据token获取用户信息(通过request请求对象传参)
  getLoginInfo() {
    return request({
      url: '/educenter/member/getMemberInfo',
      method: 'get',
      // headers: {'token': cookie.get('guli_token')}
    })
    //headers: {'token': cookie.get('guli_token')}
  }
}
