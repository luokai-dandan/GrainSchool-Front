
import request from '@/utils/request'

export default {

  //查询热门课程和名师
  getIndex() {
    return request({
      url: `/eduservice/indexfront/index`,
      method: 'get'
    })
  },

  //展示个人信息
  showUserInfo(userId) {
    return request({
      url: `//educenter/member/showUserInfo/${userId}`,
      method: 'get'
    })
  }
}
