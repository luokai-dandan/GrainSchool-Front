import request from '@/utils/request'

export default {

  // 1 生成统计数据
  createRegisterCount(day) {
    return request({
      url: `/edustatistics/daily/registerCount/${day}`,
      method: 'get'
    })
  },
  // 2 获取图表数据
  getShowData(searchObj) {
    return request({
      url: `/edustatistics/daily/showData/${searchObj.type}/${searchObj.begin}/${searchObj.end}`,
      method: 'get'
    })
  }
}
