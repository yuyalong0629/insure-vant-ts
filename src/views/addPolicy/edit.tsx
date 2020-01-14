import { Component, Vue } from 'vue-property-decorator'
import { insuranceInfo } from '@/api/index'
import './index.less'

@Component
export default class EditPolicy extends Vue {
  private fileList!: any[]
  private userId!: number
  private userInsuranceInfo?: any

  private data() {
    return {
      fileList: [],
      userId: 0,
      userInsuranceInfo: {}
    }
  }

  private mounted() {
    this.userId = this.$ls.get('userId')

    insuranceInfo({ userId: this.userId, insuranceId: (this.$route as any).query.id }).then((res: any) => {
      if (res.resultCode === '0') {
        this.userInsuranceInfo = res.userInsuranceInfo
        this.fileList = [{ url: res.userInsuranceInfo.insuranceImage }]
        return
      }
      this.$toast(res.resultMsg)
    })
  }

  // 编辑保单
  private handleEdit() {
    this.$router.push({
      path: '/addPolicy',
      query: {
        id: this.userInsuranceInfo.id
      }
    })
  }

  public render() {
    return (
      <div class="add">
        <van-row class="add-wrapper">
          <van-col span="24" class="add-upload">
            <van-uploader
              v-model={this.fileList}
              upload-text="上传图片"
              disabled
              deletable={false}
              max-count={1}
            />
            <h4>{this.userInsuranceInfo.insuranceName}</h4>
          </van-col>
          <van-col span="24" class="add-info">
            <h4 class="add-info-title">个人信息</h4>

            <div class="add-target">
              <label class="add-target-label">
                <van-icon name="contact" />
                <span>谁的保单</span>
              </label>
              <div class="add-target-content">
                <van-button plain hairline color='#C7C7C7' size="mini">{this.userInsuranceInfo.dataName}</van-button>
              </div>
            </div>

            <van-cell-group>
              <van-field
                label="被保险人"
                left-icon="user-circle-o"
                v-model={this.userInsuranceInfo.insuredName}
                required
                disabled
                placeholder="请输入被保险人真实姓名" />
            </van-cell-group>

            <div class="add-sex">
              <label class="add-sex-label">
                <van-icon name="friends-o" />性别</label>
              <div class="add-sex-content">
                <van-button plain hairline color='#C7C7C7' size="mini">{this.userInsuranceInfo.gender === 1 ? '男' : '女'}</van-button>
              </div>
            </div>

            <van-cell-group class="add-birthday">
              <van-cell title="出生日期" icon="calender-o" is-link value={this.userInsuranceInfo.birthday} />
            </van-cell-group>

          </van-col>
          <van-col span="24" class="add-name">
            <h4 class="add-name-title">主险名称</h4>
            <van-field
              label="保险名称"
              v-model={this.userInsuranceInfo.insuranceName}
              left-icon="completed"
              disabled
              placeholder="请输入保险名称" />
          </van-col>
        </van-row>

        <div class="add-button">
          <van-button
            color="#FC5D47"
            type="primary"
            round
            block
            onClick={this.handleEdit}
          >
            编辑保单
            </van-button>
        </div>
      </div>
    )
  }
}
