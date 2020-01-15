import { Component, Vue, Prop } from 'vue-property-decorator'
import Pie from '../Chart/Pie'
import './index.less'

@Component({
  components: {
    Pie
  }
})
export default class Family extends Vue {
  @Prop({ default: () => { } }) private sumInsured!: any
  @Prop({ default: () => { } }) private insuranceFee!: any
  @Prop({ default: () => { } }) private pieData!: any
  @Prop({ default: () => { } }) private schemeData!: any

  public render() {
    return (
      <van-row class="family">
        <van-col span="24" class="family-table">
          <div class="family-table-left">
            <h4>家庭保障分布</h4>
            <ul class="family-table-list">
              {
                this.sumInsured.illness !== 0 ? <li class="family-table-item">
                  <p>重疾保额</p>
                  <p>{`${this.sumInsured.illness}万元`}</p>
                </li> : ''
              }
              {
                this.sumInsured.life !== 0 ? <li class="family-table-item">
                  <p>寿险保额</p>
                  <p>{`${this.sumInsured.life}万元`}</p>
                </li> : ''
              }
              {
                this.sumInsured.medical !== 0 ? <li class="family-table-item">
                  <p>医疗保额</p>
                  <p>{`${this.sumInsured.medical}万元`}</p>
                </li> : ''
              }
              {
                this.sumInsured.accident !== 0 ? <li class="family-table-item">
                  <p>意外保障</p>
                  <p>{`${this.sumInsured.accident}万元`}</p>
                </li> : ''
              }
            </ul>
          </div>

          <div class="family-table-right">
            <h4>家庭总保费</h4>
            <p>{`${this.insuranceFee.life + this.insuranceFee.illness + this.insuranceFee.medical + this.insuranceFee.accident}元`}</p>
          </div>
        </van-col>

        <van-col span="24" class="family-chart">
          <div class="family-chart-top">
            <Pie props={{ datasource: this.pieData.coverage, setColor: this.pieData.color }} />
            <Pie props={{ datasource: this.pieData.premium, setColor: this.pieData.color }} />
          </div>
          <div class="family-chart-bottom">
            {this.pieData.label.map((item: any) => {
              return <van-tag color={item.color} plain>{item.name}</van-tag>
            })}
          </div>
        </van-col>

        <van-col span="24" class="family-exclusive">
          {this.schemeData.map((item: any) => {
            return <div class="family-exclusive-list-wrapper">
              <h4>{`${item.name}专属方案`}</h4>
              <van-row class="family-exclusive-list family-exclusive-list-header">
                <van-col span="3">险种</van-col>
                <van-col span="6">产品</van-col>
                <van-col span="3">保额</van-col>
                <van-col span="4">保障期限</van-col>
                <van-col span="4">缴费期</van-col>
                <van-col span="4">年交保费</van-col>
              </van-row>

              {item.list.map((d: any) => {
                return <van-row class="family-exclusive-list family-exclusive-list-content">
                  <van-col span="3">{d.typeStr}</van-col>
                  <van-col span="6">{d.name}</van-col>
                  <van-col span="3">{d.insuranceAmount}万</van-col>
                  <van-col span="4">{d.insuranceYear === 0 ? '终身' : `${d.insuranceYear}年`}</van-col>
                  <van-col span="4">{d.payDuration}年</van-col>
                  <van-col span="4">{d.periodFee}元</van-col>
                </van-row>
              })}
            </div>
          })}
        </van-col>
      </van-row>
    )
  }
}
