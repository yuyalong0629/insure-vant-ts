import { Component, Vue } from 'vue-property-decorator'
import { getSalesInfo } from '@/api/index'
import './index.less'

interface SalesInfo {
  [key: string]: string
}

@Component
export default class Market extends Vue {
  private show!: boolean
  private salesInfoMap!: SalesInfo

  private data() {
    return {
      show: false,
      salesInfoMap: {}
    }
  }

  // 解决微信长按二维码识别无效
  beforeRouteEnter(to: any, from: any, next: any) {
    const location = window.location
    const u = navigator.userAgent
    let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // ios终端
    if (isiOS && to.path !== location.pathname) {
      // 此处不能使用location.replace
      location.assign(to.fullPath)
    } else {
      next()
    }
  }

  private mounted() {
    const userId = this.$ls.get('userId')
    const phone = this.$route.query.phone + ''
    this.getSalesInfo({ userId: userId, phone: phone })
  }

  // 用户销售查询
  private getSalesInfo(params: { userId?: number, phone: string }) {
    return getSalesInfo(params).then((res: any) => {
      if (res.resultCode === '0') {
        this.salesInfoMap = res.salesInfoMap
        return
      }
      this.$toast.fail(res.resultMsg)
    }).catch(() => {
      this.$toast.fail('请求超时')
    })
  }

  // 添加微信
  private handleWechart() {
    this.show = true
  }

  public render() {
    return (
      <div class="market">
        <van-row class="market-top">
          <van-col span="24" class="market-card">
            <div class="market-card-left">
              <h4 class="market-card-title">{this.salesInfoMap.name}</h4>
              <p class="market-card-text">{this.salesInfoMap.jobTitle}</p>
            </div>
            <span class="market-card-right">
              <van-image
                width="140px"
                height="140px"
                fit="contain"
                src={this.salesInfoMap.imageUrl}
              />
            </span>
            <span class="market-card-btn">
              <van-button
                block
                round
                onClick={this.handleWechart}
                color="linear-gradient(to right, #E5C29E, #F3DBC3)"
              >
                点我添加微信
                  </van-button>
            </span>
          </van-col>
          <van-col span="24" class="market-intro">
            <h4 class="market-intro-title">个人简介</h4>
            <p class="market-intro-text">{this.salesInfoMap.summary}</p>
          </van-col>
        </van-row>

        <van-row class="market-bottom">
          <van-col span="24" class="market-service">
            <van-image
              width="100%"
              height="100%"
              fit="contain"
              src={require('@/assets/image/card2.png')}
            />
          </van-col>
        </van-row>
        <van-dialog
          v-model={this.show}
          title="规划师名片"
          show-cancel-button
          style={{ 'text-align': 'center' }}
        >
          <img width="300" height="300" src={this.salesInfoMap.wxImage} alt="" />
        </van-dialog>
      </div>
    )
  }
}
