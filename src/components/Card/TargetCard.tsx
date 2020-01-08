import { Component, Vue, Emit, Prop, Watch } from 'vue-property-decorator'
import { ProblemList } from '@/types/interface'

interface ImageList {
  optionContent: string
  optionSort: string
  optionType: string
  src: string
  activeSrc: string
  active: boolean
}

interface Insurance {
  [key: string]: any
}

@Component
export default class Target extends Vue {
  @Prop({ default: () => [] }) private schemeProblemInfoList!: ProblemList[]

  private insuranceInfo!: Insurance[]

  public data() {
    return {
      insuranceInfo: []
    }
  }

  private onChangeImg(num: number): void {
    const { insuranceInfo } = this
    const target = (insuranceInfo as any).filter((item: ProblemList) => item.problemFlag === 'insurance')[0]

    if (target) {
      const problemOption = target.problemOption.filter((item: Insurance, index: number) => num === index)[0]

      if (problemOption) {
        problemOption.active = !problemOption.active
      }

      this.insuranceInfo = [...insuranceInfo]
      this.checkImage(this.insuranceInfo)
    }
  }

  // 下一步
  @Emit('handleNext')
  private handleNext(event?: Event, name?: string) {
    return name
  }

  // 上一步
  @Emit('handlePrev')
  private handlePrev(event?: Event, name?: string) {
    return name
  }

  // check
  @Emit('checkImage')
  private checkImage(data: any) {
    return data
  }

  @Watch('schemeProblemInfoList', { immediate: true, deep: true })
  public watchSchemeProblemInfoList(val: any) {
    this.insuranceInfo = [...val]
  }

  public render() {
    const { insuranceInfo } = this
    const target = (insuranceInfo as any).filter((item: ProblemList) => item.problemFlag === 'insurance')[0]

    return (
      <van-row class="target">
        <van-col span="24" class="target-title">
          <p>{target.problem}（多选）</p>
          <p>{target.summary}</p>
        </van-col>
        <van-col span="24">
          <van-row gutter="20" class="target-member">
            {target.problemOption.map((item: ImageList, index: number) => {
              return <van-col span="12">
                <van-image
                  round
                  width="80"
                  height="80"
                  src={!item.active ? item.src : item.activeSrc}
                  onClick={this.onChangeImg.bind(this, index)}
                />
                <p>{item.optionContent}</p>
              </van-col>
            })}
          </van-row>
        </van-col>
        <van-col span="24" class="surveys-card-next">
          <van-button color="#fb5949" size="small" round disabled={!target.next ? true : false} onClick={this.handleNext.bind(this, event, target.next)}>下一步</van-button>
        </van-col>
        <van-col span="24" class="surveys-card-prev">
          {target.prev ? <van-button plain hairline round color="#fb5949" size="small" onClick={this.handlePrev.bind(this, event, target.prev)}>上一步</van-button> : ''}
        </van-col>
      </van-row>
    )
  }
}
