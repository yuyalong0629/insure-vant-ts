import { Component, Vue } from 'vue-property-decorator'
import { schemePriceInfoList, confirmPay } from '@/api/index'
import { randomNum } from '@/utils/util'
import { payment } from '@/utils/pay'
import './index.less'

interface PriceInfo {
  [key: string]: string | number
}

@Component
export default class Payment extends Vue {
  private schemePriceInfoMap!: PriceInfo[]
  private randomColor!: PriceInfo[]
  private isBuy!: boolean
  private goWhere!: number

  private data() {
    return {
      schemePriceInfoMap: [],
      randomColor: [
        { to: '#f5a919', from: '#f25914' },
        { to: '#F9D423', from: '#FF4E50' },
        { to: '#fda17c', from: '#f93a27' },
        { to: '#F2C94C', from: '#F2994A' },
        { to: '#fd7038', from: '#fd4e46' }
      ],
      isBuy: false,
      goWhere: 0
    }
  }

  private mounted() {
    const csId = this.$route.query.csId
    const userId = this.$ls.get('userId')

    this.$ls.set('csId', csId)

    schemePriceInfoList({ csId: csId, userId: userId }).then((res: any) => {
      if (res.resultCode === '0') {
        // 判断是否支付
        this.isBuy = res.isBuy
        this.goWhere = res.goWhere || 0

        this.schemePriceInfoMap = res.schemePriceInfoMap.map((item: any) => {
          const randomColor = this.randomColor[randomNum(0, 4)]
          return {
            ...item,
            to: randomColor.to,
            from: randomColor.from
          }
        })
        return
      }
      this.$toast.fail(res.resultMsg)
    }).catch(() => {
      this.$toast.fail('请求超时')
    })
  }

  // 购买
  private handlePay(id: string) {
    if (this.isBuy) {
      if (this.goWhere === 0) {
        // 问卷
        this.$router.push({
          path: '/surveys',
          query: {
            csId: this.$route.query.csId
          }
        })
      } else {
        // 方案
        this.$router.push({
          path: '/scheme'
        })
      }
    } else {
      // 支付
      const params = {
        userId: this.$ls.get('userId') || 1,
        oType: 1,
        csId: this.$route.query.csId,
        spId: id,
        token: this.$ls.get('token')
      }

      confirmPay(params).then((res: any) => {
        if (res.resultCode === '0') {
          payment.call(this, res.payResult.appid, res.payResult.timestamp, res.payResult.nonce_str, res.payResult.packages, res.payResult.sign, res.payResult.orderNo)
        }
      })
    }
  }

  public render() {
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
              <van-button plain hairline round block color={item.from} size="small" onClick={this.handlePay.bind(this, item.id)}>立即购买</van-button>
            </div>
          </div>
        })}
      </div>
    )
  }
}
