import { Component, Vue } from 'vue-property-decorator'
import { Image, Button } from 'vant'
import './index.less'

@Component({
  components: {
    [Image.name]: Image,
    [Button.name]: Button
  }
})
export default class Home extends Vue {
  private mainPic?: string

  public data() {
    return {
      mainPic: require('@/assets/image/main.png')
    }
  }

  public render() {
    return (
      <div class="home" >
        <van-image
          width="100%"
          height="100%"
          src={this.mainPic}
        />
        <van-button color="linear-gradient(to right, #fb3849, #fb5949)" class="home-subscribe" to="/surveys">预约咨询</van-button>
      </div>
    )
  }
}
