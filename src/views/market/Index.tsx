import { Component, Vue } from 'vue-property-decorator'
import { getSalesInfo } from '@/api/index'
import './index.less'

@Component
export default class Market extends Vue {
  private mounted() {
    const userId = this.$ls.get('userId')
    const phone = this.$route.query.phone + ''
    this.getSalesInfo({ userId: userId, phone: phone })
  }

  // 用户销售查询
  private getSalesInfo(params: { userId?: number, phone: string }) {
    return getSalesInfo(params).then((res: any) => {
      if (res.resultCode === '0') {
        console.log(res)
        return
      }
      this.$toast.fail(res.resultMsg)
    }).catch(() => {
      this.$toast.fail('请求超时')
    })
  }

  public render() {
    return (
      <div>Market</div>
    )
  }
}
