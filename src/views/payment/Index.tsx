import { Component, Vue } from 'vue-property-decorator'
import { schemePriceInfoList } from '@/api/index'
import { randomNum } from '@/utils/util'
import './index.less'

interface PriceInfo {
  [key: string]: string | number
}

@Component
export default class Payment extends Vue {
  private schemePriceInfoMap!: PriceInfo[]
  private randomColor!: PriceInfo[]

  private data() {
    return {
      schemePriceInfoMap: [],
      randomColor: [
        { to: '#f5a919', from: '#f25914' },
        { to: '#F9D423', from: '#FF4E50' },
        { to: '#fda17c', from: '#f93a27' },
        { to: '#F2C94C', from: '#F2994A' },
        { to: '#fd7038', from: '#fd4e46' }
      ]
    }
  }

  private mounted() {
    const csId = this.$route.query.csId
    const userId = this.$ls.get('userId')

    schemePriceInfoList({ csId: csId, userId: userId }).then((res: any) => {
      if (res.resultCode === '0') {
        this.schemePriceInfoMap = res.schemePriceInfoMap.map((item: any) => {
          const randomColor = this.randomColor[randomNum(0, 4)]
          return {
            ...item,
            to: randomColor.to,
            from: randomColor.from
          }
        })

        console.log(this.schemePriceInfoMap)
        return
      }
      this.$toast.fail(res.resultMsg)
    }).catch(() => {
      this.$toast.fail('请求超时')
    })
  }

  public render() {
    // const randomColor = this.randomColor[randomNum(0, 5)]

    return (
      <div class="payment">
        <h4 class="payment-title">点击立即选择专属方案</h4>
        {this.schemePriceInfoMap.map((item: any) => {
          return <div class="paymen-list" style={{ background: `linear-gradient(90deg,${item.to} 0%,${item.from} 100%)` }}>
            <div class="paymen-list-left">
              <p class="paymen-list-left-price">
                <span>{`￥${item.price}`}</span>
                <span>{item.name}</span>
              </p>
              <p class="paymen-list-left-text">{item.summary}</p>
            </div>
            <div class="paymen-list-right">
              <van-button plain hairline round block color={item.from} size="small">立即购买</van-button>
            </div>
          </div>
        })}
      </div>
    )
  }
}
