import { Component, Vue, Prop } from 'vue-property-decorator'
import './index.less'

interface Data {
  [key: string]: string | number
}

@Component
export default class List extends Vue {
  @Prop({ default: () => { } }) private data!: Data

  private handleDetail(id: string) {
    this.$router.push({
      path: '/editPolicy',
      query: { id }
    })
  }

  public render() {
    return (
      <van-row class="list" onClick={this.handleDetail.bind(this, (this as any).data.id)}>
        <van-col span="24">
          <div class="list-top">
            <h4>{this.data.insuranceName}</h4>
          </div>
          <span class="list-bottom">
            <p>被保人：{this.data.insuredName} </p>
            <p>性别：{this.data.gender === 1 ? '男' : '女'} </p>
            <p>出生日期：{this.data.birthday}</p>
          </span>
        </van-col>
      </van-row>
    )
  }
}
