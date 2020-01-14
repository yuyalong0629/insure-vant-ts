import { callbackPay } from '@/api/index'

/**
 * @description: 用户支付
 * @param {type} *
 * @return: payment
 */

export function payment(this: any, appId: string, timeStamp: string, nonceStr: string, packages: string, paySign: string, orderNo: string) {
  WeixinJSBridge.invoke('getBrandWCPayRequest', {
    'appId': appId,
    'timeStamp': timeStamp + '',
    'nonceStr': nonceStr,
    'package': packages,
    'signType': 'MD5',
    'paySign': paySign
  }, (res: any) => {
    const data = {
      orderNo: orderNo,
      payResult: JSON.stringify(res),
      userId: this.userId
    }
    if (res.err_msg === 'get_brand_wcpay_request:ok') {
      this.$toast('购买成功!')
      callbackPay(data).then((res: any) => {
        // 跳转问卷
        this.$router.push({
          path: '/surveys',
          query: {
            csId: this.$route.query.csId
          }
        })
      })
    } else if (res.err_msg === 'get_brand_wcpay_request:cancel') {
      this.$toast('用户取消支付!')
      callbackPay(data).then((res: any) => {
        // window.location.reload()
      })
    } else {
      this.$toast('支付失败!')
      // window.location.reload()
    }
  })
}
