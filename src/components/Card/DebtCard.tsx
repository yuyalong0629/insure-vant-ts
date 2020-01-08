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

  private onCancel() {
    this.show = false
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
            <van-cell title="选择负债情况" value={target.answer} onClick={this.handleIncome} is-link />
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
            position="bottom"
          >
            <van-picker
              show-toolbar
              columns={target.problemOption}
              on-cancel={this.onCancel}
              on-confirm={this.onConfirm}
            />
          </van-popup>
        </van-col>
      </van-row>
    )
  }
}
