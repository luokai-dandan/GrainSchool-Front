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
  getOrderInfoByNo(orderNo) {
    return request({
      url: `/orderservice/order/getOrderInfo/${orderNo}`,
      method: 'get'
    })
  },
  //3、生成微信支付二维码
  createNative(orderNo) {
    return request({
      url: `/orderservice/paylog/createNative/${orderNo}`,
      method: 'get'
    })
  },
  //4、根据订单号获取订单支付状态
  queryPayStatus(orderNo) {
    return request({
      url: `/orderservice/paylog/queryPayStatus/${orderNo}`,
      method: 'get'
    })
  },
  //5、跳过支付
  skipPay(orderNo) {
    return request({
      url: `/orderservice/paylog/skipPay/${orderNo}`,
      method: 'get'
    })
  }
}
