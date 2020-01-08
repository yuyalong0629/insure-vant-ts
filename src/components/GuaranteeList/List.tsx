import { Component, Vue, Prop } from 'vue-property-decorator'
import './index.less'

interface Data {
  [key: string]: string | number
}

@Component
export default class List extends Vue {
  @Prop({ default: () => { } }) private data!: Data

  public render() {
    return (
      <van-row class="list">
        <van-col span="24">
          <div class="list-top">
            <h4>{this.data.insuranceName}</h4>
            <p>{this.data.insuranceFee}元</p>
          </div>
          <p class="list-name">被保人：{this.data.insuredName} </p>
          <span class="list-bottom">
            <p>保单生效时间：{this.data.effectiveTime} </p>
            <p>保单期满时间：{this.data.maturityTime}</p>
          </span>
        </van-col>
      </van-row>
    )
  }
}
