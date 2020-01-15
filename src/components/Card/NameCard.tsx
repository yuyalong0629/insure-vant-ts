import { Component, Vue, Emit, Prop, Watch } from 'vue-property-decorator'
import './index.less'
import { ProblemList } from '@/types/interface'

interface ImageList {
  optionContent: string
  optionSort: string
  optionType: string
  src: string
  activeSrc: string
  active: boolean
}

interface NameInfo {
  [key: string]: any
}

@Component
export default class UserName extends Vue {
  @Prop({ default: () => [] }) private schemeProblemInfoList!: ProblemList[]

  private setNameInfo!: NameInfo[]
  private timeout?: any

  public data() {
    return {
      setNameInfo: [],
      timeout: null
    }
  }

  // 监听输入框值改变
  private onChangeInput(value: string): void {
    if (this.timeout) {
      clearTimeout(this.timeout)
      this.timeout = null
    }

    this.timeout = setTimeout(() => {
      const { setNameInfo } = this
      const target = (setNameInfo as any).filter((item: ProblemList) => item.problemFlag === 'gender')[0]
      if (target) {
        target.answer = value
        this.setNameInfo = [...setNameInfo]
        this.checkInput(this.setNameInfo)
      }
    }, 300)
  }

  // 切换性别
  private onChangeImg(active: boolean, num: number): void {
    const { setNameInfo } = this
    const target = (setNameInfo as any).filter((item: ProblemList) => item.problemFlag === 'gender')[0]
    if (target) {
      const problemOption = target.problemOption.map((item: NameInfo, index: number) => {
        return {
          ...item,
          active: index === num ? true : false
        }
      })

      target.problemOption = problemOption
      this.setNameInfo = [...setNameInfo]
      this.checkImage(this.setNameInfo)
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

  // 检查输入框
  @Emit('checkInput')
  private checkInput(data: any) {
    return data
  }

  // 性别切换
  @Emit('checkImage')
  private checkImage(data: any) {
    return data
  }

  @Watch('schemeProblemInfoList', { immediate: true, deep: true })
  public watchSchemeProblemInfoList(val: any) {
    this.setNameInfo = [...val]
  }

  public render() {
    const { setNameInfo } = this
    const target = (setNameInfo as any).filter((item: ProblemList) => item.problemFlag === 'gender')[0]

    return (
      <van-row gutter="20" class="username">
        <van-col span="24" class="username-title">
          <p>{target.problem}</p>
          <p>{target.summary}</p>
        </van-col>
        <van-col span="24">
          <van-field
            v-model={target.answer}
            on-input={this.onChangeInput}
            type="text"
            size="large"
            placeholder={target.problem}
          />
        </van-col>
        <van-col span="24" class="username-image">
          {target.problemOption.map((item: ImageList, index: number) => {
            return <van-image
              round
              width="80"
              height="80"
              src={item.active ? item.activeSrc : item.src}
              onClick={this.onChangeImg.bind(this, item.active, index)}
            />
          })}
        </van-col>
        <van-col class="surveys-card-next" span="24">
          <van-button color="#fb5949" size="small" round disabled={!target.answer || !target.next ? true : false} onClick={this.handleNext.bind(this, event, target.next)}>下一步</van-button>
        </van-col>
        <van-col span="24" class="surveys-card-prev">
          {target.prev ? <van-button plain hairline round color="#fb5949" size="small" onClick={this.handlePrev.bind(this, event, target.prev)}>上一步</van-button> : ''}
        </van-col>
      </van-row>
    )
  }
}
