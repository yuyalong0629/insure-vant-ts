import { Component, Vue, Emit } from 'vue-property-decorator'
import { Image, Field, Button, Row, Col } from 'vant'
import './index.less'
import Question from '@/views/surveys/Index'

interface ImageList {
  src: string
  id: number
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
export default class UserName extends Vue {
  private username!: string
  private imageList!: ImageList[]
  private activeIndex!: number
  private activeSrc?: string

  public data() {
    return {
      username: '',
      imageList: [
        { src: require('@/assets/image/baba_@2x.png'), id: 0 },
        { src: require('@/assets/image/mama_@2x.png'), id: 1 }
      ],
      activeIndex: 0,
      activeSrc: [require('@/assets/image/baba@2x.png'), require('@/assets/image/mama@2x.png')]
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
      <van-row gutter="20" class="username">
        <van-col span="24" class="username-title">
          <p>选保险前,</p>
          <p>先告诉老端该如何称呼你呀?</p>
        </van-col>
        <van-col span="24">
          <van-field
            v-model={this.username}
            type="text"
            size="large"
            placeholder="请输入您的姓氏"
          />
        </van-col>
        <van-col span="24" class="username-image">
          {this.imageList.map((item: ImageList) => {
            return <van-image
              round
              width="80"
              height="80"
              src={this.activeIndex === item.id ? (this as any).activeSrc[this.activeIndex] : item.src}
              onClick={this.onChangeImg.bind(this, item.id)}
            />
          })}
        </van-col>
        <van-col span="24" class="surveys-card-next">
          <van-button color="#fb5949" size="small" round disabled={!this.username} onClick={this.handleNext}>下一步</van-button>
        </van-col>
      </van-row>
    )
  }
}
