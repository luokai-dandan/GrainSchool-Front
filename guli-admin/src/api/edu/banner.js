import request from '@/utils/request'

export default {

  // 1 获取全部banner
  getAllBanner() {
    return request({
      url: '/educms/banneradmin/getAllBanner',
      method: 'get'
    })
  },
  // 2 修改
  updateBanner(banner) {
    return request({
      url: '/educms/banneradmin/update',
      method: 'post',
      data: banner
    })
  },
  // 3 添加
  addBanner(banner) {
    return request({
      url: '/educms/banneradmin/addBanner',
      method: 'post',
      data: banner
    })
  },
  // 4 删除
  removeBanner(id) {
    return request({
      url: `/educms/banneradmin/remove/${id}`,
      method: 'delete'
    })
  },
  // 5 删除
  getPageBanner(page, limit) {
    return request({
      url: `/educms/banneradmin/pageBanner/${page}/${limit}`,
      method: 'get'
    })
  }
}
