
import request from '@/utils/request'

export default {

  //查询幻灯片
  getBannerList() {
    return request({
      url: `/educms/bannerfront/getAllBanner`,
      method: 'get'
    })
  }
}
