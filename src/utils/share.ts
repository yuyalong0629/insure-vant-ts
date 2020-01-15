/**
 * @description: 自定义“分享给朋友”及“分享到QQ”按钮的分享内容
 * @param {type} *
 * @return:
 */
export default function wxShare(appId: string, timestamp: string, nonceStr: string, signature: string, title: string, desc: string, link: string, imgUrl: string) {
  wx.config({
    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appId: appId, // 必填，公众号的唯一标识
    timestamp: timestamp + '', // 必填，生成签名的时间戳
    nonceStr: nonceStr, // 必填，生成签名的随机串
    signature: signature, // 必填，签名，见附录1
    jsApiList: ['updateAppMessageShareData', 'onMenuShareWeibo'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
  })

  wx.ready(function () {
    wx.updateAppMessageShareData({
      title: title, // 分享标题
      desc: desc, // 分享描述
      link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: imgUrl, // 分享图标
      success: function () {
        // 设置成功
      }
    })

    wx.onMenuShareWeibo({
      title: title, // 分享标题
      desc: desc, // 分享描述
      link: link, // 分享链接
      imgUrl: imgUrl, // 分享图标
      success: function () {
        // 用户确认分享后执行的回调函数
      },
      cancel: function () {
        // 用户取消分享后执行的回调函数
      }
    })

    wx.error(function (res: any) {
      // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
    })
  })
}
