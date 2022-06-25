<!--suppress JSUnresolvedVariable -->
<template>
  <div class="cart py-container">
    <!--主内容-->
    <div class="checkout py-container  pay">
      <div class="checkout-tit">
        <h4 class="fl tit-txt">
          <span class="success-icon"></span>
          <span class="success-info" style="margin-left: 140px">订单提交成功，请您及时付款！订单号：{{payObj.out_trade_no}}</span>
        </h4>
        <div class="clearfix"></div>
      </div>
      <div class="checkout-steps">
        <div class="fl weixin" style="margin-top: 210px">微信支付</div>
        <div class="fl sao">
          <p class="red" style="margin-left: 120px">使用微信扫一扫</p>
          <p>
            <em style="margin-left: 110px;margin-top: 20px">应付金额：</em>
            <em class="orange money">￥{{payObj.total_fee}}</em>
          </p>
          <el-button type="success" :loading="false" style="margin-left: 80px;margin-top: 150px" @click="alreadyPay()">我已支付</el-button>
          <el-button type="success" style="margin-left: 50px;margin-top: 150px" @click="skipPay()">跳过支付</el-button>
          <div class="fl code">
            <qriously :value="payObj.code_url" :size="338"/>
          </div>
        </div>
        <div class="clearfix"></div>
      </div>
    </div>
  </div>
</template>

<script>

import orderApi from '@/api/order'

export default {

  //根据订单id生成微信支付二维码
  asyncData({params, error}) {
    //页面为pid，params后面必须跟pid
    return orderApi.createNative(params.pid)
      .then(response => {
        return {
          payObj: response.data.data
        }
    })
  },

  data() {
    return {
      timer: null,  // 定时器名称
      timer1:''
    }
  },

  mounted() {
    //在页面渲染之后执行
    //每隔三秒，去查询一次支付状态
    this.timer1 = setInterval(() => {
      this.queryPayStatus(this.payObj.out_trade_no)
    }, 3000);
  },

  methods: {
    //手动验证已经支付
    alreadyPay() {
      this.queryPayStatus(this.payObj.out_trade_no)
    },
    //跳过支付
    skipPay() {
      orderApi.skipPay(this.payObj.out_trade_no)
        .then(response => {
          if (response.data.success) {
            this.$message({
              type: 'success',
              message: '支付成功!'
            })
          //如果支付成功，清除定时器
          clearInterval(this.timer1)
          //跳转到课程详情页面观看视频
          this.$router.push({path: '/course/' + this.payObj.course_id})
          } else {
            this.$message({
              type: 'warning',
              message: '系统繁忙!'
            })
          }
        })
    },
    //查询支付状态的方法
    queryPayStatus(orderNo) {
      orderApi.queryPayStatus(orderNo).then(response => {
        if(response===undefined){
          return
        }
        if (response.data.success) {

          this.$message({
            type: 'success',
            message: '支付成功!'
          })
          //如果支付成功，清除定时器
          clearInterval(this.timer1)
          //跳转到课程详情页面观看视频
          this.$router.push({path: '/course/' + this.payObj.course_id})
        }
      })
    }
  }
}
</script>
