import { Component, Vue, Emit } from 'vue-property-decorator'
import { Image, Field, Button, Row, Col } from 'vant'

interface ImageList {
  src: string
  id: number
  text?: string
}

@Component({
  components: {
    [Image.name]: Image,
    [Field.name]: Field,
    [Button.name]: Button,
    [Row.name]: Row,
    [Col.name]: Col
  }
})
export default class Family extends Vue {
  private imageList!: ImageList[]
  private activeIndex!: number
  private activeSrc?: string

  public data() {
    return {
      username: '',
      imageList: [
        { src: require('@/assets/image/baba_@2x.png'), id: 0, text: '单身' },
        { src: require('@/assets/image/yihun_@2x.png'), id: 1, text: '已婚未生育' },
        { src: require('@/assets/image/danqinbaba_2x.png'), id: 2, text: '单亲爸爸' },
        { src: require('@/assets/image/quanjiafu_@2x.png'), id: 3, text: '已婚有孩子' }
      ],
      activeIndex: 0,
      activeSrc: [
        require('@/assets/image/baba@2x.png'),
        require('@/assets/image/yihun@2x.png'),
        require('@/assets/image/danqinbaba@2x.png'),
        require('@/assets/image/quanjiafu@2x.png')
      ]
    }
  }

  private onChangeImg(key: number): void {
    this.activeIndex = key
  }

  @Emit('handleNext')
  private handleNext(e: any) {
    e.stopPropagation()
  }

  public render() {
    return (
      <van-row class="family">
        <van-col span="24" class="family-title">
          <p>你的家庭成员有哪些？</p>
          <p>了解家庭结构,规划师会帮助您全面防御家庭风险?</p>
        </van-col>
        <van-col span="24">
          <van-row gutter="20" class="family-member">
            {this.imageList.map((item: ImageList) => {
              return <van-col span="12">
                <van-image
                  round
                  width="80"
                  height="80"
                  src={this.activeIndex === item.id ? (this as any).activeSrc[this.activeIndex] : item.src}
                  onClick={this.onChangeImg.bind(this, item.id)}
                />
                <p>{item.text}</p>
              </van-col>
            })}
          </van-row>
        </van-col>
        <van-col span="24" class="surveys-card-next">
          <van-button color="#fb5949" size="small" round onClick={this.handleNext}>下一步</van-button>
        </van-col>
      </van-row>
    )
  }
}
