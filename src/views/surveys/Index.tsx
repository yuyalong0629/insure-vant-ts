import { Component, Vue } from 'vue-property-decorator'
import NameCard from '@/components/Card/NameCard'
import FamilyCard from '@/components/Card/FamilyCard'
import TargetCard from '@/components/Card/TargetCard'
import AgeCard from '@/components/Card/AgeCard'
import IncomeCard from '@/components/Card/IncomeCard'
import DebtCard from '@/components/Card/DebtCard'
import HealthCard from '@/components/Card/HealthCard'
import PhoneCard from '@/components/Card/PhoneCard'

import { timeFix, randomNum } from '@/utils/util'
import './index.less'
import { schemeProblemInfoList, submitProblemInfo, getSalesInfo } from '@/api/index'
import { ProblemList } from '@/types/interface'

interface CardList {
  name: string
  current: string
}

interface Submit {
  userId: number
  token?: string
  problemInfo: string
}

@Component({
  components: {
    NameCard,
    FamilyCard,
    TargetCard,
    AgeCard,
    IncomeCard,
    DebtCard,
    HealthCard,
    PhoneCard
  }
})
export default class Question extends Vue {
  private surveysBgImage?: string
  private cardAnimate!: boolean
  private schemeProblemInfoList?: ProblemList[]
  private activeName!: string
  private animationIn!: string
  private animationOut!: string
  private getPhone!: string

  public data() {
    return {
      timeFix,
      surveysBgImage: require('@/assets/image/beijing.png'),
      cardAnimate: true,
      // 问卷信息
      schemeProblemInfoList: [],
      activeName: 'gender',
      animationIn: 'bounceInDown',
      animationOut: 'bounceOutUp',
      getPhone: ''
    }
  }

  public mounted() {
    const csId = this.$route.query.csId
    const userId = this.$ls.get('userId') || 2

    // 问题列表
    schemeProblemInfoList({ csId: csId, userId: userId }).then((res: any) => {
      if (res.resultCode === '0') {
        this.schemeProblemInfoList = []

        // 遍历模板列表
        res.schemeProblemInfoList.forEach((item: ProblemList, index: number) => {
          // 名称和性别
          if (item.problemFlag === 'gender') {
            // 获取下标对应对象
            const findIndex = res.schemeProblemInfoList.findIndex((item: any) => item.problemFlag === 'gender')

            const nameAndGender = {
              ...item,
              name: 'NameCard',
              problem: res.schemeProblemInfoList[0].problem,
              current: 'gender',
              answer: '',
              prev: res.schemeProblemInfoList[findIndex === -1 ? -1 : findIndex - 2] ? res.schemeProblemInfoList[findIndex === -1 ? -1 : findIndex - 2].problemFlag : '',
              next: res.schemeProblemInfoList[findIndex === -1 ? -1 : findIndex + 1] ? res.schemeProblemInfoList[findIndex === -1 ? -1 : findIndex + 1].problemFlag : ''
            }

              // 增加对应图片及选项
              ; (nameAndGender as any).problemOption.map((item: any, index: number) => {
                const toItem = typeof item === 'string' ? JSON.parse(item) : item

                  ; (nameAndGender as any).problemOption[index] = {
                    ...toItem,
                    src: toItem.optionContent === '女' ? require('@/assets/image/mama_@2x.png') : require('@/assets/image/baba_@2x.png'),
                    activeSrc: toItem.optionContent === '女' ? require('@/assets/image/mama@2x.png') : require('@/assets/image/baba@2x.png'),
                    active: index === 0 ? true : false
                  }
              })

              ; (this as any).schemeProblemInfoList.push(nameAndGender)
          }

          // 家庭结构
          if (item.problemFlag === 'family') {
            // 获取下标对应对象
            const findIndex = res.schemeProblemInfoList.findIndex((item: any) => item.problemFlag === 'family')

            const family = {
              ...item,
              name: 'FamilyCard',
              problem: item.problem,
              current: 'family',
              prev: res.schemeProblemInfoList[findIndex === -1 ? -1 : findIndex - 1] ? res.schemeProblemInfoList[findIndex === -1 ? -1 : findIndex - 1].problemFlag : '',
              next: res.schemeProblemInfoList[findIndex === -1 ? -1 : findIndex + 1] ? res.schemeProblemInfoList[findIndex === -1 ? -1 : findIndex + 1].problemFlag : ''
            }
              // 增加对应图片及选项
              ; (family as any).problemOption.map((item: any, index: number) => {
                const toItem = typeof item === 'string' ? JSON.parse(item) : item
                const srcPic = toItem.optionContent === '未婚' ? require('@/assets/image/baba_@2x.png') : (toItem.optionContent === '单亲' ? require('@/assets/image/danqinbaba_2x.png') : (toItem.optionContent === '已婚有娃' ? require('@/assets/image/quanjiafu_@2x.png') : require('@/assets/image/yihun_@2x.png')))
                const activeSrcPic = toItem.optionContent === '未婚' ? require('@/assets/image/baba@2x.png') : (toItem.optionContent === '单亲' ? require('@/assets/image/danqinbaba@2x.png') : (toItem.optionContent === '已婚有娃' ? require('@/assets/image/quanjiafu@2x.png') : require('@/assets/image/yihun@2x.png')))

                  ; (family as any).problemOption[index] = {
                    ...toItem,
                    src: srcPic,
                    activeSrc: activeSrcPic,
                    active: index === 0 ? true : false
                  }
              })

              ; (this as any).schemeProblemInfoList.push(family)
          }

          // 请问你为谁买保险？
          if (item.problemFlag === 'insurance') {
            // 获取下标对应对象
            const findIndex = res.schemeProblemInfoList.findIndex((item: any) => item.problemFlag === 'insurance')

            const insurance = {
              ...item,
              name: 'TargetCard',
              problem: item.problem,
              current: 'insurance',
              prev: res.schemeProblemInfoList[findIndex === -1 ? -1 : findIndex - 1] ? res.schemeProblemInfoList[findIndex === -1 ? -1 : findIndex - 1].problemFlag : '',
              next: res.schemeProblemInfoList[findIndex === -1 ? -1 : findIndex + 1] ? res.schemeProblemInfoList[findIndex === -1 ? -1 : findIndex + 1].problemFlag : ''
            }
              // 增加对应图片及选项
              ; (insurance as any).problemOption.map((item: any, index: number) => {
                const toItem = typeof item === 'string' ? JSON.parse(item) : item
                const srcPic = toItem.optionContent === '自己' ? require('@/assets/image/baba_@2x.png') : (toItem.optionContent === '配偶' ? require('@/assets/image/mama_@2x.png') : (toItem.optionContent === '子女' ? require('@/assets/image/nver_@2x.png') : require('@/assets/image/yihun_@2x.png')))
                const activeSrcPic = toItem.optionContent === '自己' ? require('@/assets/image/baba@2x.png') : (toItem.optionContent === '配偶' ? require('@/assets/image/mama@2x.png') : (toItem.optionContent === '子女' ? require('@/assets/image/nver@2x.png') : require('@/assets/image/yihun@2x.png')))

                  ; (insurance as any).problemOption[index] = {
                    ...toItem,
                    src: srcPic,
                    activeSrc: activeSrcPic,
                    active: index === 0 ? true : false
                  }
              })

              ; (this as any).schemeProblemInfoList.push(insurance)
          }

          // 年龄
          if (item.problemFlag === 'age') {
            // 获取下标对应对象
            const findIndex = res.schemeProblemInfoList.findIndex((item: any) => item.problemFlag === 'age')

            const age = {
              ...item,
              name: 'AgeCard',
              problem: item.problem,
              current: 'age',
              answer: '',
              prev: res.schemeProblemInfoList[findIndex === -1 ? -1 : findIndex - 1] ? res.schemeProblemInfoList[findIndex === -1 ? -1 : findIndex - 1].problemFlag : '',
              next: res.schemeProblemInfoList[findIndex === -1 ? -1 : findIndex + 1] ? res.schemeProblemInfoList[findIndex === -1 ? -1 : findIndex + 1].problemFlag : ''
            }

              ; (this as any).schemeProblemInfoList.push(age)
          }

          // 家庭收入
          if (item.problemFlag === 'income') {
            // 获取下标对应对象
            const findIndex = res.schemeProblemInfoList.findIndex((item: any) => item.problemFlag === 'income')

            const income = {
              ...item,
              name: 'IncomeCard',
              problem: item.problem,
              current: 'income',
              answer: '',
              prev: res.schemeProblemInfoList[findIndex === -1 ? -1 : findIndex - 1] ? res.schemeProblemInfoList[findIndex === -1 ? -1 : findIndex - 1].problemFlag : '',
              next: res.schemeProblemInfoList[findIndex === -1 ? -1 : findIndex + 1] ? res.schemeProblemInfoList[findIndex === -1 ? -1 : findIndex + 1].problemFlag : ''
            }
              // 增加对应图片及选项
              ; (income as any).problemOption.map((item: any, index: number) => {
                const toItem = typeof item === 'string' ? JSON.parse(item) : item

                  ; (income as any).problemOption[index] = {
                    ...toItem,
                    text: toItem.optionContent,
                    active: index === 0 ? true : false
                  }
              })

              ; (this as any).schemeProblemInfoList.push(income)
          }

          // 家庭负债情况
          if (item.problemFlag === 'debt') {
            // 获取下标对应对象
            const findIndex = res.schemeProblemInfoList.findIndex((item: any) => item.problemFlag === 'debt')

            const debt = {
              ...item,
              name: 'DebtCard',
              problem: item.problem,
              current: 'debt',
              answer: '',
              prev: res.schemeProblemInfoList[findIndex === -1 ? -1 : findIndex - 1] ? res.schemeProblemInfoList[findIndex === -1 ? -1 : findIndex - 1].problemFlag : '',
              next: res.schemeProblemInfoList[findIndex === -1 ? -1 : findIndex + 1] ? res.schemeProblemInfoList[findIndex === -1 ? -1 : findIndex + 1].problemFlag : ''
            }
              // 增加对应图片及选项
              ; (debt as any).problemOption.map((item: any, index: number) => {
                const toItem = typeof item === 'string' ? JSON.parse(item) : item

                  ; (debt as any).problemOption[index] = {
                    ...toItem,
                    text: toItem.optionContent,
                    active: false
                  }
              })

              ; (this as any).schemeProblemInfoList.push(debt)
          }

          // 健康情况
          if (item.problemFlag === 'health') {
            // 获取下标对应对象
            const findIndex = res.schemeProblemInfoList.findIndex((item: any) => item.problemFlag === 'health')

            const health = {
              ...item,
              name: 'HealthCard',
              problem: item.problem,
              current: 'health',
              answer: '',
              prev: res.schemeProblemInfoList[findIndex === -1 ? -1 : findIndex - 1] ? res.schemeProblemInfoList[findIndex === -1 ? -1 : findIndex - 1].problemFlag : '',
              next: res.schemeProblemInfoList[findIndex === -1 ? -1 : findIndex + 1] ? res.schemeProblemInfoList[findIndex === -1 ? -1 : findIndex + 1].problemFlag : ''
            }
              // 增加对应图片及选项
              ; (health as any).problemOption.map((item: any, index: number) => {
                const toItem = typeof item === 'string' ? JSON.parse(item) : item

                  ; (health as any).problemOption[index] = {
                    ...toItem,
                    icon: '',
                    active: false
                  }
              })

              ; (this as any).schemeProblemInfoList.push(health)
          }

          // 手机号
          if (item.problemFlag === 'phone') {
            // 获取下标对应对象
            const findIndex = res.schemeProblemInfoList.findIndex((item: any) => item.problemFlag === 'phone')

            const phone = {
              ...item,
              name: 'PhoneCard',
              problem: item.problem,
              current: 'phone',
              answer: '',
              sms: '',
              prev: res.schemeProblemInfoList[findIndex === -1 ? -1 : findIndex - 1] ? res.schemeProblemInfoList[findIndex === -1 ? -1 : findIndex - 1].problemFlag : '',
              next: res.schemeProblemInfoList[findIndex === -1 ? -1 : findIndex + 1] ? res.schemeProblemInfoList[findIndex === -1 ? -1 : findIndex + 1].problemFlag : ''
            }
              ; (this as any).schemeProblemInfoList.push(phone)
          }
        })
      } else {
        this.$toast.fail(res.resultMsg)
      }
    })
  }

  // 下一步 $Emit
  private handleNext(name: string): void {
    const animationIn = ['bounceInDown', 'lightSpeedIn', 'flipInX', 'zoomInUp', 'zoomInLeft', 'rollIn', 'rotateIn']
    const animationOut = ['bounceOutUp', 'lightSpeedOut', 'flipOutX', 'zoomOutDown', 'zoomOutRight', 'rollOut', 'rotateOut']

    this.animationIn = animationIn[randomNum(0, 7)]
    this.animationOut = animationOut[randomNum(0, 7)]

    this.cardAnimate = false

    const timer = setTimeout(() => {
      this.activeName = name
      this.cardAnimate = true
      window.clearTimeout(timer)
    }, 800)
  }

  // 上一步 $Emit
  private handlePrev(name: string): void {
    const animationIn = ['bounceInDown', 'lightSpeedIn', 'flipInX', 'zoomInUp', 'zoomInLeft', 'rollIn', 'rotateIn']
    const animationOut = ['bounceOutUp', 'lightSpeedOut', 'flipOutX', 'zoomOutDown', 'zoomOutRight', 'rollOut', 'rotateOut']

    this.animationIn = animationIn[randomNum(0, 7)]
    this.animationOut = animationOut[randomNum(0, 7)]

    this.cardAnimate = false

    const timer = setTimeout(() => {
      this.cardAnimate = true
      this.activeName = name
      window.clearTimeout(timer)
    }, 800)
  }

  // 图片切换 $Emit
  private checkImage(data: any): void {
    this.schemeProblemInfoList = data
  }

  // 检查输入框 $Emit
  private checkInput(data: any): void {
    this.schemeProblemInfoList = data
  }

  // 提交
  private handleSub(data: any): void {
    const result = data.map((item: any, index: number) => {
      // 性别 和 名称
      if (item.problemFlag === 'gender') {
        const target = item.problemOption.filter((i: any) => i.active)[0]
        return [
          {
            id: 1,
            option: item.answer
          },
          {
            id: item.id,
            option: target.optionContent
          }
        ]
      }

      // 家庭结构
      if (item.problemFlag === 'family') {
        const target = item.problemOption.filter((i: any) => i.active)[0]
        return {
          id: item.id,
          option: target.optionContent
        }
      }

      // 为谁买保险
      if (item.problemFlag === 'insurance') {
        const target = item.problemOption.filter((i: any) => i.active)

        return {
          id: item.id,
          option: target.map((d: any) => d.optionContent)
        }
      }

      // 年龄
      if (item.problemFlag === 'age') {
        return {
          id: item.id,
          option: item.answer
        }
      }

      // 家庭年收入
      if (item.problemFlag === 'income') {
        return {
          id: item.id,
          option: item.answer
        }
      }

      // 家庭负债情况
      if (item.problemFlag === 'debt') {
        return {
          id: item.id,
          option: item.answer
        }
      }

      // 健康情况
      if (item.problemFlag === 'health') {
        return {
          id: item.id,
          option: item.answer
        }
      }

      // 手机号
      if (item.problemFlag === 'phone') {
        this.getPhone = item.answer

        return {
          id: item.id,
          option: item.answer,
          verifyCode: item.sms
        }
      }
    })

    const userId = this.$ls.get('userId') || 0
    const token = this.$ls.get('tokrn')

    const params = {
      userId: userId,
      token: token,
      problemInfo: encodeURIComponent(JSON.stringify(result.flat()))
    }
    this.getSubmit(params)
  }

  // 方案问题提交
  private getSubmit(params?: Submit) {
    return submitProblemInfo(params).then((res: any) => {
      console.log(res)
      if (res.resultCode === '0') {
        this.$toast.success('提交成功!')
        this.$router.push({
          path: '/market',
          query: {
            phone: this.getPhone
          }
        })
        return
      }
      this.$toast.fail(res.resultMsg)
    }).catch(() => {
      this.$toast.fail('请求超时')
    })
  }

  private render() {
    if ((this as any).schemeProblemInfoList.length) {
      const { activeName, schemeProblemInfoList } = this
      const ComponentId = (schemeProblemInfoList as any).filter((item: ProblemList) => activeName === (item as any).current)[0]

      return (
        <div class="surveys">
          <van-image
            width="100%"
            height="100%"
            src={this.surveysBgImage}
          />
          <div class="surveys-greetings">
            <h5 class="surveys-greetings-text">{(this as any).timeFix()}</h5>
          </div>
          <div class={['surveys-card', 'animated', this.cardAnimate ? this.animationIn : this.animationOut]}>
            <div class="surveys-card-question">
              <ComponentId.name
                props={{ schemeProblemInfoList: this.schemeProblemInfoList }}
                on-handleNext={(this as any).handleNext}
                on-handlePrev={(this as any).handlePrev}
                on-checkImage={this.checkImage}
                on-checkInput={this.checkInput}
                on-handleSub={this.handleSub}
              />
            </div>
          </div>
        </div>
      )
    }
  }
}
