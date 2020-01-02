import { Component, Vue, Emit } from 'vue-property-decorator'
import { Image, Row, Col, Button } from 'vant'

interface ImageList {
  src: string
  id: number
  text?: string
  check: boolean
}

@Component({
  components: {
    [Image.name]: Image,
    [Row.name]: Row,
    [Col.name]: Col,
    [Button.name]: Button
  }
})
export default class Target extends Vue {
  private imageList!: ImageList[]
  private activeSrc?: string

  public data() {
    return {
      imageList: [
        { src: require('@/assets/image/baba_@2x.png'), id: 0, text: '单身', check: true },
        { src: require('@/assets/image/yihun_@2x.png'), id: 1, text: '已婚未生育', check: false },
        { src: require('@/assets/image/danqinbaba_2x.png'), id: 2, text: '单亲爸爸', check: false },
        { src: require('@/assets/image/quanjiafu_@2x.png'), id: 3, text: '已婚有孩子', check: false }
      ],
      activeSrc: [
        { src: require('@/assets/image/baba@2x.png'), id: 0 },
        { src: require('@/assets/image/yihun@2x.png'), id: 1 },
        { src: require('@/assets/image/danqinbaba@2x.png'), id: 2 },
        { src: require('@/assets/image/quanjiafu@2x.png'), id: 3 }
      ]
    }
  }

  private onChangeImg(key: number, check: boolean): void {
    const { imageList } = this
    const target = imageList.filter((item: ImageList) => key === item.id)[0]
    if (target) {
      target.check = !check
      this.imageList = [...imageList]
    }
  }

  @Emit('handleNext')
  private handleNext(e: any) {
    e.stopPropagation()
  }

  public render() {
    return (
      <van-row class="target">
        <van-col span="24" class="target-title">
          <p>你想为谁选保险？（多选）</p>
          <p>了解您为哪位家庭成员投保，可以让规划师分别为家人合理定制方案</p>
        </van-col>
        <van-col span="24">
          <van-row gutter="20" class="target-member">
            {this.imageList.map((item: ImageList) => {
              return <van-col span="12">
                <van-image
                  round
                  width="80"
                  height="80"
                  src={!item.check ? item.src : (this as any).activeSrc[item.id].src}
                  onClick={this.onChangeImg.bind(this, item.id, item.check)}
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
