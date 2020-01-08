import { Component, Vue } from 'vue-property-decorator'
import { myInsuranceInfo } from '@/api/index'
import List from '@/components/GuaranteeList/List'
import './index.less'

@Component({
  components: {
    List
  }
})
export default class Policy extends Vue {
  private pageNo!: number
  private list!: any[]
  private loading!: boolean
  private isLoading!: boolean
  private finished!: boolean
  private offset!: number
  private userId!: number

  private data() {
    return {
      pageNo: 0,
      userId: 0,
      list: [],
      loading: false,
      isLoading: false,
      finished: false,
      offset: 100
    }
  }

  private mounted() {
    this.userId = this.$ls.get('userId')
    this.getInsuranceInfo({ userId: this.userId, pageNo: this.pageNo })
  }

  private async getInsuranceInfo(params?: { userId: number, pageNo: number }) {
    return myInsuranceInfo(params).then((res: any) => {
      if (res.resultCode === '0') {
        this.list = this.list.concat(res.userInsuranceInfos.result)
        // 加载状态结束
        this.loading = false
        this.isLoading = false

        // 数据全部加载完成
        if (!res.userInsuranceInfos.next) {
          this.finished = true
        }
        return
      }
      this.$toast.fail(res.resultMsg)

      this.loading = false
      this.isLoading = false
    })
  }

  // 下拉刷新
  private onRefresh() {
    setTimeout(() => {
      this.list = []
      this.getInsuranceInfo({ userId: this.userId, pageNo: 0 }).then(() => {
        this.$toast('刷新成功')
        this.finished = false
        this.pageNo = 0
      })
    }, 500)
  }

  // 上拉加载
  private onLoad() {
    // 异步更新数据
    setTimeout(() => {
      ++this.pageNo
      this.getInsuranceInfo({ userId: this.userId, pageNo: this.pageNo })
    }, 500)
  }

  public render() {
    return (
      <div class="guarantee">
        <van-pull-refresh v-model={this.isLoading} onRefresh={this.onRefresh}>

          <van-list
            v-model={this.loading}
            finished={this.finished}
            offset={this.offset}
            immediate-check={false}
            finished-text="没有更多了"
            onLoad={this.onLoad}
          >
            {this.list.map((item: any) => {
              return <List props={{ data: item }} />
            })}
          </van-list>

        </van-pull-refresh>

        <div class="guarantee-button">
          <van-button color="#FC5D47" type="primary" round block>点击添加电子保单</van-button>
        </div>
      </div >
    )
  }
}
