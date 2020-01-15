import { Component, Vue } from 'vue-property-decorator'
import Permisson from '../permisson/Index'
import Family from '@/components/Family/Index'
import UserScheme from '@/components/UserScheme/Index'
import Service from '@/components/Service/Index'
import Start from '@/components/Start/Index'

import { mySchemeInfo, wxShareSign, login } from '@/api/index'
import { wxAuth } from '@/utils/auth'
import wxShare from '@/utils/share'
import './index.less'

interface TabImg {
  name: string
  img: string
}

interface SumInsured {
  [key: string]: number
}

interface SalesInfoMap {
  [key: string]: string
}

interface Params {
  userId: number
  id: string | number
}

interface Share {
  userId: number
  url: string
}

@Component({
  components: {
    Permisson,
    Family,
    UserScheme,
    Service,
    Start
  }
})
export default class Scheme extends Vue {
  private userId!: number
  private permisson!: string
  private tabList!: any[]
  private tabListImg!: TabImg[]
  private sumInsured!: SumInsured
  private insuranceFee!: SumInsured
  private pieData!: any
  private chartColor!: string[]
  private schemeData!: any
  private componentId!: string
  private userSchemeInfos!: any[]
  private salesInfoMap!: SalesInfoMap
  private start!: boolean
  private userProblemInfo!: any

  private data() {
    return {
      userId: 0,
      permisson: '',
      tabList: [],
      tabListImg: [
        { name: '本人', img: require('@/assets/image/benren@2x.png') },
        { name: '妻子', img: require('@/assets/image/mama@2x.png') },
        { name: '父亲', img: require('@/assets/image/baba@2x.png') },
        { name: '母亲', img: require('@/assets/image/mama@2x.png') },
        { name: '岳父', img: require('@/assets/image/gonggong@2x.png') },
        { name: '岳母', img: require('@/assets/image/popo@2x.png') },
        { name: '女儿', img: require('@/assets/image/nver@2x.png') },
        { name: '儿子', img: require('@/assets/image/erzi@2x.png') },
        { name: '丈夫', img: require('@/assets/image/baba@2x.png') },
        { name: '公公', img: require('@/assets/image/yeye@2x.png') },
        { name: '婆婆', img: require('@/assets/image/nainai@2x.png') }
      ],
      chartColor: ['#ff7f50', '#87cefa', '#da70d6', '#32cd32', '#6495ed', '#ff69b4', '#ba55d3', '#cd5c5c', '#ffa500', '#40e0d0', '#1e90ff', '#ff6347', '#7b68ee', '#00fa9a', '#ffd700', '#6699FF', '#ff6666', '#3cb371', '#b8860b', '#30e0e0'],
      // 保额分布
      sumInsured: {
        illness: 0, // 重疾
        life: 0, // 寿险
        medical: 0, // 医疗
        accident: 0 // 意外
      },
      // 保费分布
      insuranceFee: {
        illness: 0, // 重疾
        life: 0, // 寿险
        medical: 0, // 医疗
        accident: 0 // 意外
      },
      // 分布
      pieData: {
        color: [],
        label: [],
        coverage: {
          text: '保额分布',
          chartData: {
            columns: ['保额', '分布'],
            rows: []
          }
        },
        premium: {
          text: '保费分布',
          chartData: {
            columns: ['保费', '分布'],
            rows: [
              { '保费': '本人', '分布': 1393 },
              { '保费': '配偶', '分布': 3530 },
              { '保费': '儿子', '分布': 2923 }
            ]
          }
        }
      },
      // 方案
      schemeData: [],
      componentId: '家庭状况',
      userSchemeInfos: [],
      salesInfoMap: {},
      start: false,
      userProblemInfo: {}
    }
  }

  private mounted() {
    this.userId = this.$ls.get('userId')

    const id = (this.$route.query as any).id

    if (id) {
      this.getMySchemeInfo({ userId: this.userId, id: (this.$route.query as any).id })
    } else {
      if (this.userId) {
        this.getMySchemeInfo({ userId: this.userId, id: (this.$route.query as any).id })
      } else {
        const state = (this.$route.query as any).id || (this.$route.query as any).state
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
              this.getMySchemeInfo({ userId: res.userId, id: state })
            }
          })
        })
      }
    }
  }

  private getMySchemeInfo(params?: Params) {
    return mySchemeInfo(params).then((res: any) => {
      if (res.resultCode === '0') {
        // WX Share
        const params: Share = {
          userId: this.$ls.get('userId') || 0,
          url: encodeURIComponent(window.location.href)
        }

        this.userProblemInfo = res.userProblemInfo

        const userProblemInfo = `${res.userProblemInfo.name}${res.userProblemInfo.gender === 0 ? '女士' : '先生'}专属保险方案`

        wxShareSign(params).then((res: any) => {
          if (res.resultCode === '0') {
            wxShare(res.appid, res.timestamp, res.noncestr, res.signature, userProblemInfo, `老端说险，买保险不花冤枉钱！`, `${window.location.href.split('&code')[0]}&state=${(this.$route.query as any).id || (this.$route.query as any).state}`, `http://upload.dameicm.cn/bximages/share.png`)
          }
        })

        this.userSchemeInfos = res.userSchemeInfos || []
        this.salesInfoMap = res.salesInfoMap

        // 遍历Tab列表
        const tabListMiddle = res.userSchemeInfos.map((item: any, index: number) => {
          return {
            name: item.dataName,
            img: this.tabListImg.filter((i: TabImg) => item.dataName === i.name)[0].img
          }
        })

        const tabListStart = { name: '家庭状况', img: require('@/assets/image/house@2x.png') }
        const tabListEnd = { name: '贴心服务', img: require('@/assets/image/server@2x.png') }
        this.tabList = [tabListStart, ...tabListMiddle, tabListEnd].map((d: any, index: number) => {
          return {
            ...d,
            check: index === 0 ? true : false
          }
        })

        // 处理家庭保障分布数据
        res.userSchemeInfos.forEach((item: any) => {
          // 保额
          if (item.insuranceAmountByTypeMap.type1) {
            this.sumInsured.illness += +item.insuranceAmountByTypeMap.type1
          }

          if (item.insuranceAmountByTypeMap.type2) {
            this.sumInsured.life += +item.insuranceAmountByTypeMap.type2
          }

          if (item.insuranceAmountByTypeMap.type3) {
            this.sumInsured.medical += +item.insuranceAmountByTypeMap.type3
          }

          if (item.insuranceAmountByTypeMap.type4) {
            this.sumInsured.accident += +item.insuranceAmountByTypeMap.type4
          }
          // 保费
          if (item.insuranceFeeByTypeMap.type1) {
            this.insuranceFee.illness += +item.insuranceFeeByTypeMap.type1
          }

          if (item.insuranceFeeByTypeMap.type2) {
            this.insuranceFee.life += +item.insuranceFeeByTypeMap.type2
          }

          if (item.insuranceFeeByTypeMap.type3) {
            this.insuranceFee.medical += +item.insuranceFeeByTypeMap.type3
          }

          if (item.insuranceFeeByTypeMap.type4) {
            this.insuranceFee.accident += +item.insuranceFeeByTypeMap.type4
          }
        })

        // 处理饼状图数据
        this.pieData.color = this.chartColor.slice(0, res.userSchemeInfos.length)

        this.pieData.coverage.chartData.rows = res.userSchemeInfos.map((item: any, index: number) => {
          let insuranceAmountByTypeMap: number = 0

          if (item.insuranceAmountByTypeMap.type1) {
            insuranceAmountByTypeMap += +item.insuranceAmountByTypeMap.type1
          }
          if (item.insuranceAmountByTypeMap.type2) {
            insuranceAmountByTypeMap += +item.insuranceAmountByTypeMap.type2
          }
          if (item.insuranceAmountByTypeMap.type3) {
            insuranceAmountByTypeMap += +item.insuranceAmountByTypeMap.type3
          }
          if (item.insuranceAmountByTypeMap.type4) {
            insuranceAmountByTypeMap += +item.insuranceAmountByTypeMap.type4
          }

          return {
            '保额': item.dataName,
            '分布': insuranceAmountByTypeMap
          }
        })

        this.pieData.premium.chartData.rows = res.userSchemeInfos.map((item: any, index: number) => {
          let insuranceFeeByTypeMap: number = 0

          if (item.insuranceFeeByTypeMap.type1) {
            insuranceFeeByTypeMap += +item.insuranceFeeByTypeMap.type1
          }
          if (item.insuranceFeeByTypeMap.type2) {
            insuranceFeeByTypeMap += +item.insuranceFeeByTypeMap.type2
          }
          if (item.insuranceFeeByTypeMap.type3) {
            insuranceFeeByTypeMap += +item.insuranceFeeByTypeMap.type3
          }
          if (item.insuranceFeeByTypeMap.type4) {
            insuranceFeeByTypeMap += +item.insuranceFeeByTypeMap.type4
          }

          return {
            '保费': item.dataName,
            '分布': insuranceFeeByTypeMap
          }
        })

        this.pieData.label = res.userSchemeInfos.map((item: any, index: number) => {
          return {
            color: this.pieData.color[index],
            name: item.dataName
          }
        })

        // 专属方案
        this.schemeData = res.userSchemeInfos.map((item: any, index: number) => {
          return {
            name: item.dataName,
            list: item.productMapList
          }
        })
      } else {
        // 判断方案是否制作中
        this.permisson = res.resultMsg
      }
    })
  }

  // Tab切换
  private handleTab(recored: { name: string, img: string }): void {
    this.componentId = recored.name
  }

  private handleSatrt(start: boolean) {
    this.start = start
  }

  public render() {
    if (this.permisson) {
      return (
        <Permisson props={{ permisson: this.permisson }} />
      )
    } else {
      if (!this.start) {
        return (
          <Start props={{ userProblemInfo: this.userProblemInfo, salesInfoMap: this.salesInfoMap }} on-handleSatrt={this.handleSatrt} />
        )
      } else {
        const { userSchemeInfos } = this
        const datasource = userSchemeInfos.map((d: any) => {
          return {
            ...d,
            src: this.tabListImg.filter((i: any) => d.dataName === i.name)[0].img
          }
        })
        const target = datasource.filter((item: any) => this.componentId === item.dataName)[0]

        return (
          <div class="scheme">
            <van-row class="scheme-wrapper">
              <van-col span="24" class="scheme-header">
                <div class="shceme-header-content">
                  <van-tabs>
                    {this.tabList.map((item: TabImg) => {
                      return <van-tab>
                        <div slot="title" class="tab-list">
                          <van-image
                            width="42"
                            height="42"
                            lazy-load
                            round
                            onClick={this.handleTab.bind(this, item)}
                            src={item.img}
                          />
                          <span onClick={this.handleTab.bind(this, item)}>{item.name}</span>
                        </div>
                      </van-tab>
                    })}
                  </van-tabs>
                </div>
              </van-col>

              <van-col span="24" class="scheme-content">
                {this.componentId === '家庭状况' ? <Family
                  props={{ sumInsured: this.sumInsured, insuranceFee: this.insuranceFee, pieData: this.pieData, schemeData: this.schemeData }}
                /> : this.componentId === '贴心服务' ? <Service /> : <UserScheme props={{ userInfo: target }} />}
              </van-col>

              <van-col span="24" class="scheme-qrcode">
                <van-image
                  round
                  width="70"
                  height="70"
                  style={{ 'background': 'linear-gradient(#bbbcc0, #a9aeaf)' }}
                  class="scheme-qrcode-left"
                  src={this.salesInfoMap.imageUrl}
                />
                <div class="scheme-qrcode-middle">
                  <span>
                    <h4>{this.salesInfoMap.name}</h4>
                    <p>专属规划师</p>
                  </span>
                  <p class="scheme-qrcode-middle-text">{`${this.salesInfoMap.jobTitle}`}</p>
                </div>
                <van-image
                  width="60"
                  height="60"
                  class="scheme-qrcode-right"
                  src={this.salesInfoMap.wxImage}
                />
              </van-col>
            </van-row>
          </div>
        )
      }
    }
  }
}
