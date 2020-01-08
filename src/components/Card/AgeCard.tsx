import { Component, Vue, Prop, Watch, Emit } from 'vue-property-decorator'
import { ProblemList } from '@/types/interface'
import { formatDate } from '@/utils/util'

interface AgeInfo {
  [key: string]: any
}

@Component
export default class Age extends Vue {
  @Prop({ default: () => [] }) private schemeProblemInfoList!: ProblemList[]

  private ageInfo!: AgeInfo[]
  private show!: boolean
  private minDate!: any
  private maxDate!: any
  private currentDate!: any

  private data() {
    return {
      ageInfo: [],
      show: false,
      minDate: new Date(1945, 0, 1),
      maxDate: new Date(),
      currentDate: new Date()
    }
  }

  // 年龄选择
  private handleAge() {
    this.show = true
  }

  // 日期选择
  private handleConfirm(value: string) {
    this.show = false
    const { ageInfo } = this
    const target = (ageInfo as any).filter((item: ProblemList) => item.problemFlag === 'age')[0]

    if (target) {
      target.answer = formatDate(value, 'yyyy-MM-dd')
      this.ageInfo = [...ageInfo]
      this.checkImage(this.ageInfo)
    }
  }

  private handleCancel() {
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
    this.ageInfo = [...val]
  }

  public render() {
    const { ageInfo } = this
    const target = (ageInfo as any).filter((item: ProblemList) => item.problemFlag === 'age')[0]

    return (
      <van-row class="age">
        <van-col span="24" class="age-title">
          <p>{target.problem}</p>
          <p>{target.summary}</p>
        </van-col>

        <van-col span="24" class="age-input">
          <van-cell-group>
            <van-cell title="请选择年龄" value={target.answer} onClick={this.handleAge} is-link />
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
            <van-datetime-picker
              v-model={this.currentDate}
              type="date"
              min-date={this.minDate}
              max-date={this.maxDate}
              on-confirm={this.handleConfirm}
              on-cancel={this.handleCancel}
            />
          </van-popup>
        </van-col>
      </van-row>
    )
  }
}
