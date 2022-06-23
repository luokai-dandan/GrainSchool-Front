import request from '@/utils/request'

export default {

  getUserInfo() {
    return request({
      url: '/eduservice/comment/getUserInfo',
      method: 'get'
    })
  },

  getPageList(page, limit, courseId) {
    return request({
      url: `/eduservice/comment/${page}/${limit}`,
      method: 'get',
      params: {courseId}
    })
  },

  addComment(comment) {
    return request({
      url: `/eduservice/comment/auth/save`,
      method: 'post',
      data: comment
    })
  }
}
