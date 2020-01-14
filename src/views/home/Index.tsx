import { Component, Vue } from 'vue-property-decorator'
import { customizeSchemeInfo, wxShareSign, login } from '@/api/index'
import { wxAuth } from '@/utils/auth'
import wxShare from '@/utils/share'
import './index.less'

interface Params {
  csId: string
  userId: number | string
}

interface Share {
  userId: number
  url: string
}

@Component
export default class Home extends Vue {
  private mainPic?: string
  public isPay?: boolean

  private data() {
    return {
      mainPic: '',
      isPay: true
    }
  }

  private mounted() {
    this.$ls.set('token', this.$route.query.token)

    const userId = this.$ls.get('userId')
    const isAuthorize = this.$route.query.isAuthorize === 'true' ? true : false

    if (!isAuthorize) {
      this.getCustomizeSchemeInfo({ csId: (this.$route.query as any).csId, userId: 0 })
    } else {
      if (userId) {
        this.getCustomizeSchemeInfo({ csId: (this.$route.query as any).csId, userId: userId })
      } else {
        const state = (this.$route.query as any).csId || (this.$route.query as any).state
        const href = window.location.href.split('&code')[0]

        wxAuth.call(this, href, state).then(() => {
          const params = {
            type: 1,
            code: this.$route.query.code,
            state: state
          }

          login(params).then((res: any) => {
            if (res.resultCode === '0') {
              this.$ls.set('userId', res.userId)
              this.getCustomizeSchemeInfo({ csId: state, userId: res.userId })
            }
          })
        })
      }
    }
  }

  // 初始化
  private async getCustomizeSchemeInfo(params?: Params) {
    return customizeSchemeInfo(params).then((res: any) => {
      if (res.resultCode === '0') {
        this.mainPic = res.customizeSchemeInfoMap.coverImage

        // 判断是否存在购买列表
        this.isPay = res.customizeSchemeInfoMap.isPay

        const customizeSchemeInfoMap = res.customizeSchemeInfoMap

        // WX Share
        const params: Share = {
          userId: this.$ls.get('userId'),
          url: encodeURIComponent(window.location.href)
        }

        wxShareSign(params).then((res: any) => {
          if (res.resultCode === '0') {
            wxShare(res.appid, res.timestamp, res.noncestr, res.signature, customizeSchemeInfoMap.summary, `${window.location.href.split('&code')[0]}&state=${(this.$route.query as any).csId || (this.$route.query as any).state}`, 'http://ldsx.dameicm.cn/img/fximg.png')
          }
        })
      }
    })
  }

  // 预约咨询
  private handleTo(): void {
    const csId = this.$route.query.csId

    this.$router.push({
      path: !this.isPay ? '/surveys' : '/payment',
      query: {
        csId: csId
      }
    })
  }

  public render() {
    return (
      <div class="home" >
        <van-image
          width="100%"
          height="100%"
          lazy-load
          src={this.mainPic} />
        <van-button color="linear-gradient(to right, #fb3849, #fb5949)" class="home-subscribe" onClick={this.handleTo}>预约咨询</van-button>
      </div>
    )
  }
}
