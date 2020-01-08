import { Component, Vue, Watch, Emit, Prop } from 'vue-property-decorator'
import { ProblemList } from '@/types/interface'
import { smsVerifyCode } from '@/api/index'

interface PhoneInfo {
  [key: string]: any
}

@Component
export default class Phone extends Vue {
  @Prop({ default: () => [] }) private schemeProblemInfoList!: ProblemList[]

  private phoneInfo!: PhoneInfo[]
  private sms!: string
  private checkPhone!: string
  private checkCode!: string
  private time!: number
  private disable!: boolean

  private data() {
    return {
      phoneInfo: [],
      sms: '',
      disable: false,
      time: 60,
      checkPhone: '',
      checkCode: ''
    }
  }

  // 验证手机号
  private onChangePhone() {
    const { phoneInfo } = this
    const target = (phoneInfo as any).filter((item: ProblemList) => item.problemFlag === 'phone')[0]
    const phoneReg = /^[1]([3-9])[0-9]{9}$/
    if (target) {
      if (!target.answer) {
        this.checkPhone = '手机号不能为空'
        return
      }
      if (!(phoneReg.test(target.answer))) {
        this.checkPhone = '手机号格式不正确'
        return
      }
      this.checkPhone = ''
      this.phoneInfo = [...phoneInfo]
    }
  }

  // 发送验证码
  private handleSendSms() {
    const { phoneInfo } = this
    const target = (phoneInfo as any).filter((item: ProblemList) => item.problemFlag === 'phone')[0]
    const phoneReg = /^[1]([3-9])[0-9]{9}$/

    if (target) {
      if (!target.answer) {
        this.checkPhone = '手机号不能为空'
        return
      }

      if (!(phoneReg.test(target.answer))) {
        this.checkPhone = '手机号格式不正确'
        return
      }
      this.checkPhone = ''
      this.phoneInfo = [...phoneInfo]

      this.disable = true
      const interval = window.setInterval(() => {
        if (this.time-- <= 0) {
          this.time = 60
          this.disable = false
          window.clearInterval(interval)
        }
      }, 1000)

      // 获取验证码
      smsVerifyCode({ phone: target.answer })
        .then((res: any) => {
          if (res.resultCode === '0') {
            this.$toast('验证码发送成功')
            return
          }
          this.$toast.success(res.message)
        })
        .catch(() => {
          this.time = 60
          this.disable = false
          window.clearInterval(interval)
        })
    }
  }

  // 提交
  // @Emit('handleNext')
  private handleSubmit(event: Event) {
    event.stopPropagation()
    const { phoneInfo } = this
    const target = (phoneInfo as any).filter((item: ProblemList) => item.problemFlag === 'phone')[0]
    const phoneReg = /^[1]([3-9])[0-9]{9}$/

    if (!target.answer) {
      this.checkPhone = '手机号不能为空'
      return
    }

    if (!(phoneReg.test(target.answer))) {
      this.checkPhone = '手机号格式不正确'
      return
    }

    if (!target.sms) {
      this.checkCode = '验证码不能为空'
      return
    }

    this.checkPhone = ''
    this.checkCode = ''
    this.phoneInfo = [...phoneInfo]
    this.handleSub(this.phoneInfo)
  }

  // 上一步
  @Emit('handlePrev')
  private handlePrev(event?: Event, name?: string) {
    return name
  }

  // submit
  @Emit('handleSub')
  private handleSub(data: any) {
    return data
  }

  @Watch('schemeProblemInfoList', { immediate: true, deep: true })
  public watchSchemeProblemInfoList(val: any) {
    this.phoneInfo = [...val]
  }

  public render() {
    const { phoneInfo } = this
    const target = (phoneInfo as any).filter((item: ProblemList) => item.problemFlag === 'phone')[0]

    return (
      <van-row class="phone">
        <van-col span="24" class="phone-title">
          <p>{target.problem}</p>
          <p>{target.summary}</p>
        </van-col>

        <van-col span="24">
          <van-field
            clearable
            v-model={target.answer}
            placeholder="请输入手机号"
            error-message={this.checkPhone}
            onBlur={this.onChangePhone}
          />
          <van-field
            v-model={target.sms}
            center
            clearable
            placeholder="请输入短信验证码"
            error-message={this.checkCode}
          >
            <van-button slot="button" color="#fb5949" size="small" type="primary" disabled={this.disable} onClick={this.handleSendSms}>{this.disable ? `${this.time} s` : '获取验证码'}</van-button>
          </van-field>
        </van-col>

        <van-col span="24" class="surveys-card-next">
          <van-button color="#fb5949" size="small" round disabled={!target.answer ? true : false} onClick={this.handleSubmit}>提交</van-button>
        </van-col>

        <van-col span="24" class="surveys-card-prev">
          {target.prev ? <van-button plain hairline round color="#fb5949" size="small" onClick={this.handlePrev.bind(this, event, target.prev)}>上一步</van-button> : ''}
        </van-col>
      </van-row>
    )
  }
}
