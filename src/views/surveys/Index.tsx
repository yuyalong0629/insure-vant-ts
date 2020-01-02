import { Component, Vue } from 'vue-property-decorator'
import { Image, Button, Row, Col } from 'vant'
import NameCard from '@/components/Card/NameCard'
import FamilyCard from '@/components/Card/FamilyCard'
import TargetCard from '@/components/Card/TargetCard'
import { timeFix } from '@/utils/util'
import './index.less'
import { schemeProblemInfoList } from '@/api/index'

@Component({
  components: {
    [Image.name]: Image,
    [Button.name]: Button,
    [Row.name]: Row,
    [Col.name]: Col,
    NameCard,
    FamilyCard,
    TargetCard
  }
})
export default class Question extends Vue {
  private surveysBgImage?: string
  private cardAnimate!: boolean
  private cardList?: string[]
  private activeIndex!: number

  public data() {
    return {
      timeFix,
      surveysBgImage: require('@/assets/image/beijing.png'),
      cardAnimate: true,
      cardList: ['NameCard', 'FamilyCard', 'TargetCard'],
      activeIndex: 0
    }
  }

  public mounted() {
    schemeProblemInfoList({ userId: '1' }).then((res: any) => {
      console.log(res)
    })
  }

  private handleNext(key: number): void {
    this.cardAnimate = false

    const timer = setTimeout(() => {
      this.cardAnimate = true
      this.activeIndex++
      clearTimeout(timer)
    }, 800)
  }

  private handlePrev(): void {
    this.cardAnimate = false

    const timer = setTimeout(() => {
      this.cardAnimate = true
      this.activeIndex--
      clearTimeout(timer)
    }, 800)
  }

  public render() {
    const ComponentId = (this as any).cardList[this.activeIndex]
    const disabled = this.activeIndex === ((this.cardList as any).length - 1)

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
        <div class={['surveys-card', 'animated', this.cardAnimate ? 'fadeInLeft' : 'fadeOutRight']}>
          <div class="surveys-card-question">
            <ComponentId on-handleNext={(this as any).handleNext} />
            <van-row class="surveys-card-prev">
              <van-col span="24">
                {this.activeIndex !== 0 ? <van-button plain hairline round color="#fb5949" size="small" onClick={this.handlePrev}>上一步</van-button> : ''}
              </van-col>
            </van-row>
          </div>
        </div>
      </div>
    )
  }
}
