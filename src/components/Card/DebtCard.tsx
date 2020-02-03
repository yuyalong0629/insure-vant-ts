import { Component, Vue, Prop, Watch, Emit } from 'vue-property-decorator'
import { ProblemList } from '@/types/interface'

interface IncomeInfo {
  [key: string]: any
}

@Component
export default class Debt extends Vue {
  @Prop({ default: () => [] }) private schemeProblemInfoList!: ProblemList[]

  private incomeInfo!: IncomeInfo[]
  private show!: boolean

  private data() {
    return {
      incomeInfo: [],
      show: false
    }
  }

  // 年收入选择
  private handleIncome() {
    this.show = true
  }

  private onConfirm(value: any, index: number) {
    this.show = false
    const { incomeInfo } = this
    const target = (incomeInfo as any).filter((item: ProblemList) => item.problemFlag === 'debt')[0]

    if (target) {
      target.answer = value.text
      this.incomeInfo = [...incomeInfo]
      this.checkImage(this.incomeInfo)
    }
  }

  private handleToggle(name: string, num: number) {
    const { incomeInfo } = this
    const target = (incomeInfo as any).filter((item: ProblemList) => item.problemFlag === 'debt')[0]
    if (target) {
      target.answer = name

      const problemOption = target.problemOption.filter((item: any, index: number) => num === index)[0]
      problemOption.active = !problemOption.active

      this.incomeInfo = [...incomeInfo]
      this.checkImage(this.incomeInfo)
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
    this.incomeInfo = [...val]
  }

  public render() {
    const { incomeInfo } = this
    const target = (incomeInfo as any).filter((item: ProblemList) => item.problemFlag === 'debt')[0]

    return (
      <van-row class="income">
        <van-col span="24" class="income-title">
          <p>{target.problem}</p>
          <p>{target.summary}</p>
        </van-col>

        <van-col span="24" class="income-input">
          <van-cell-group>
            <van-cell title="选择负债情况" value={target.answer ? `${target.answer}...` : ''} onClick={this.handleIncome} is-link />
          </van-cell-group>
        </van-col>

        <van-col span="24" class="surveys-card-next">
          <van-button color="#fb5949" size="small" round disabled={!target.next || !target.answer ? true : false} onClick={this.handleNext.bind(this, event, target.next)}>下一步</van-button>
        </van-col>

        <van-col span="24" class="surveys-card-prev">
          {target.prev ? <van-button plain hairline round color="#fb5949" size="small" onClick={this.handlePrev.bind(this, event, target.prev)}>上一步</van-button> : ''}
        </van-col>

        <van-col span="24">
          <van-popup
            get-container="body"
            v-model={this.show}
            closeable
            position="bottom"
            style={{ padding: '48px 24px' }}
          >
            <van-row type="flex" gutter="16" justify="space-around">
              {target.problemOption.map((item: any, index: number) => {
                return <van-col style={{ padding: '6px' }} >
                  <van-button
                    block
                    plain
                    type="info"
                    size="small"
                    icon={item.active ? 'success' : ''}
                    color={!item.active ? '#4bb0ff' : '#fb5949'}
                    onClick={this.handleToggle.bind(this, item.optionContent, index)}
                  >{item.optionContent}</van-button>
                </van-col>
              })}
            </van-row>
          </van-popup>
        </van-col>
      </van-row>
    )
  }
}
