import { Component, Vue, Emit, Prop } from 'vue-property-decorator'
import './index.less'

@Component
export default class Start extends Vue {
  @Prop({ default: () => { } }) private userProblemInfo!: any
  @Prop({ default: () => { } }) private salesInfoMap!: any

  @Emit('handleSatrt')
  private handleSatrt(event: Event, start: boolean = true) {
    return start
  }

  public render() {
    return (
      <div class="start">
        <div class="start-content">
          <h4 class="start-content-name">
            <span>{this.userProblemInfo.name && this.userProblemInfo.name.slice(0, 1)}</span>{this.userProblemInfo.name && this.userProblemInfo.name.slice(1)}
          </h4>
          <h4 class="start-content-text">专属保险方案 </h4>
          <van-button round color="#F05945" style={{ 'font-size': '20px' }} block onClick={this.handleSatrt}>邀您亲启</van-button>
          <div class="start-img">
            <van-image
              round
              width="70"
              height="70"
              style={{ 'background': 'linear-gradient(#bbbcc0, #a9aeaf)' }}
              src={this.salesInfoMap.imageUrl}
            />
            <div class="start-img-title">
              <h5>{this.salesInfoMap.name}</h5>
              <p>您的专属规划师</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
