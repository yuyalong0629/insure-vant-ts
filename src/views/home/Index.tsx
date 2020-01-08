import { Component, Vue } from 'vue-property-decorator'
import { customizeSchemeInfo } from '@/api/index'
import './index.less'

interface Params {
  csId: string
  userId: number | string
}

@Component
export default class Home extends Vue {
  private mainPic?: string
  private isAuthorize!: boolean
  private userId!: number | string
  public isPay?: boolean

  private data() {
    return {
      mainPic: '',
      isPay: true
    }
  }

  private mounted() {
    this.getCustomizeSchemeInfo({ csId: (this.$route.query as any).csId, userId: this.userId || 0 })
  }

  // 初始化
  private async getCustomizeSchemeInfo(params?: Params) {
    return customizeSchemeInfo(params).then((res: any) => {
      if (res.resultCode === '0') {
        this.mainPic = res.customizeSchemeInfoMap.coverImage
          ; (this as any).$ls.set('authorize', res.customizeSchemeInfoMap.isAuthorize)

        // 判断是否存在购买列表
        this.isPay = res.customizeSchemeInfoMap.isPay
      }
    })
  }

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
