import { Component, Vue, Prop } from 'vue-property-decorator'
import './index.less'

@Component
export default class UserScheme extends Vue {
  @Prop({ default: () => { } }) private userInfo!: any

  public render() {
    return (
      <van-row class="userScheme">
        <van-col span="24" class="userScheme-introduction">
          <h4>个人情况</h4>
          <p>{`${this.userInfo.healthRisk}${this.userInfo.accidentRisk}${this.userInfo.healthGuarantee}${this.userInfo.accidentGuarantee}`}</p>
        </van-col>
        <van-col span="24" class="userScheme-list">
          <div class="userScheme-list-user">
            <div class="userScheme-list-user-top">
              <van-image
                round
                width="42px"
                height="42px"
                src="https://img.yzcdn.cn/vant/cat.jpeg"
              />
              <div class="userScheme-list-user-top-name">
                <h4>{this.userInfo.dataName}</h4>
                <p>总保费: {this.userInfo.insuranceFee}元/年</p>
              </div>
            </div>
            <ul class="userScheme-list-user-bottom">
              {this.userInfo.productMapList.map((item: any) => {
                return <li>
                  <h4>{item.insuranceAmount}万元</h4>
                  <p>{item.typeStr}</p>
                </li>
              })}
            </ul>
          </div>

          <div class="userScheme-list-wrapper">
            {this.userInfo.productMapList.map((item: any) => {
              return <div class="userScheme-list-content">
                <div class="userScheme-list-title">
                  <div class="userScheme-list-title-icon">
                    <van-image
                      width="24px"
                      height="24px"
                      src={item.type === 1 ? require('@/assets/image/zhongji.png') : item.type === 2 ? require('@/assets/image/shouxian.png') : item.type === 3 ? require('@/assets/image/yiliao.png') : require('@/assets/image/yiwai.png')}
                    />
                    <h5>{item.typeStr}</h5>
                  </div>
                  <p class="userScheme-list-title-fee">
                    保额{item.insuranceAmount}万元丨￥{item.periodFee}/年
                </p>
                </div>
                <div class="userScheme-list-name">
                  <h4>{item.name}</h4>
                  <van-image
                    round
                    width="42px"
                    height="42px"
                    src={item.logoImage}
                  />
                </div>
                <div class="userScheme-list-label">
                  <van-tag color="#F27857">保额: {item.insuranceAmount}万元</van-tag>
                  <van-tag color="#F27857">保障期限: {item.insuranceYear}年</van-tag>
                  <van-tag color="#F27857">缴费类型: {item.payType === 1 ? '年交' : item.payType === 2 ? '月交' : '趸交'}</van-tag>
                </div>
                <div class="userScheme-list-href">
                  <p>{item.insuranceSummary}</p>
                  <a href={item.buyUrl}>点击查看详情<van-icon name="arrow" /></a>
                </div>
              </div>
            })}
          </div>
        </van-col>
      </van-row>
    )
  }
}
