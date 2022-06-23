import request from '@/utils/request'

export default {

  //1、创建订单
  createOrder(courseId) {
    return request({
      url: `/orderservice/order/createOrder/${courseId}`,
      method: 'get'
    })
  },
  //2、根据id获取订单
  getById(orderNo) {
    return request({
      url: `/orderservice/order/getOrderInfo/${orderNo}`,
      method: 'get'
    })
  },
  //3、生成微信支付二维码
  createNative(cid) {
    return request({
      url: '/orderservice/log/createNative/'+cid,
      method: 'get'
    })
  },
  //4、根据id获取订单支付状态
  queryPayStatus(cid) {
    return request({
      url: '/orderservice/log/queryPayStatus/'+cid,
      method: 'get'
    })
  }
}
