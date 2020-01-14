import { login } from '@/api/index'

/**
 * @description: 微信网页授权
 * @param {String} appid [公众号的唯一标识]
 * @param {String} href [授权后重定向的回调链接地址， 请使用 urlEncode 对链接进行处理]
 * @param {String} state [重定向后会带上state参数]
 * @return: wxAuth
 */

export async function wxAuth(this: any, href: string, state: string | number) {
  const appId = 'wx5725ff8014059e2d'

  if (!this.$route.query.code) {
    window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${encodeURIComponent(href)}&response_type=code&scope=snsapi_userinfo&state=${state}&connect_redirect=1#wechat_redirect`
  }
}
