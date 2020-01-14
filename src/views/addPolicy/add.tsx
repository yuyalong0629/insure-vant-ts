import { Component, Vue } from 'vue-property-decorator'
import { upload, basicData, addOrUpdateInsuranceInfo, insuranceInfo } from '@/api/index'
import { formatDate } from '@/utils/util'
import './index.less'

interface BasicData {
  id: number
  dataName: string
  check?: boolean
}

interface SexData {
  id: number
  sex: string
  check?: boolean
}

@Component
export default class AddPolicy extends Vue {
  private userId!: number
  private fileList!: any[]
  private show!: boolean
  private currentDate!: any
  private minDate!: any
  private maxDate!: any
  private basicData!: BasicData[] // 谁的保单
  private sexData!: SexData[] // 性别
  private insuredName!: string // 被保险人姓名
  private birthdayHolder!: string // 出生日期 占位字符
  private birthday!: string // 出生日期
  private insuranceName!: string // 主险名称
  private insuranceImage!: string // 保险图片

  private data() {
    return {
      userId: 0,
      fileList: [],
      show: false,
      currentDate: new Date(),
      minDate: new Date(1945, 0, 1),
      maxDate: new Date(),
      basicData: [],
      sexData: [
        { sex: '女', id: 0, check: true },
        { sex: '男', id: 1, check: false }
      ],
      insuredName: '',
      birthdayHolder: '请选择被保险人的出生日期',
      birthday: '',
      insuranceName: '',
      insuranceImage: ''
    }
  }

  private mounted() {
    this.userId = this.$ls.get('userId')

    // 目标保单列表
    basicData({ userId: this.userId }).then((res: any) => {
      if (res.resultCode === '0') {
        this.basicData = res.basicData.map((item: BasicData, index: number) => {
          return {
            ...item,
            check: index === 0 ? true : false
          }
        })
        return
      }
      this.$toast(res.resultMsg)
    })

    // 判断是否从详情编辑跳转过来
    if (this.$route.query.id) {
      insuranceInfo({ userId: this.userId, insuranceId: (this.$route as any).query.id }).then((res: any) => {
        if (res.resultCode === '0') {
          // 图片
          this.fileList = [{ url: res.userInsuranceInfo.insuranceImage }]
          this.insuranceImage = res.userInsuranceInfo.insuranceImage

          // 谁的保单
          const { basicData } = this
          const insuredType = basicData.map((item: BasicData) => {
            return {
              ...item,
              check: res.userInsuranceInfo.insuredType === item.id ? true : false
            }
          })
          this.basicData = [...insuredType]

          // 被保险人
          this.insuredName = res.userInsuranceInfo.insuredName

          // 性别
          const { sexData } = this
          const gender = sexData.map((item: SexData) => {
            return {
              ...item,
              check: res.userInsuranceInfo.gender === item.id ? true : false
            }
          })
          this.sexData = [...gender]

          // 出生日期
          this.birthday = res.userInsuranceInfo.birthday

          // 保险名称
          this.insuranceName = res.userInsuranceInfo.insuranceName
          return
        }
        this.$toast(res.resultMsg)
      })
    }
  }

  // 选择保单目标
  private handleDataName(key: number): void {
    const { basicData } = this
    const data = basicData.map((item: BasicData, index: number) => {
      return {
        ...item,
        check: index === key ? true : false
      }
    })

    this.basicData = [...data]
  }

  // 选择性别
  private handleDataSex(key: number): void {
    const { sexData } = this
    const data = sexData.map((item: SexData, index: number) => {
      return {
        ...item,
        check: index === key ? true : false
      }
    })

    this.sexData = [...data]
  }

  // 图片上传
  private afterRead(file: any) {
    const formData = new FormData()
    formData.append('file', file.file)
    formData.append('fileFileName', file.file.name)

    upload(formData).then((res: any) => {
      if (res.resultCode === 0) {
        this.insuranceImage = res.httpUrl
        this.$toast(res.resultMsg)
        return
      }
      this.$toast(res.resultMsg)
    })
  }

  // 选择出生日期 popup
  private handleDate() {
    this.show = true
  }

  // 选择出生日期 picker
  private confirm(value: string) {
    this.show = false
    this.birthday = formatDate(value, 'yyyy-MM-dd')
  }

  // 选择出生日期 cancel
  private cancel() {
    this.show = false
  }

  // 提交信息
  private handleSubmit() {
    if (!this.insuranceImage) {
      this.$toast('请先上传保单图片')
      return
    }
    if (!this.insuredName) {
      this.$toast('被保险人姓名不能为空')
      return
    }
    if (!this.birthday) {
      this.$toast('出生日期不能为空')
      return
    }

    const params = {
      id: this.$route.query.id || 0,
      userId: this.userId,
      insuranceImage: this.insuranceImage,
      insuredType: this.basicData.filter((item: BasicData) => item.check)[0].id,
      insuredName: this.insuredName,
      gender: this.sexData.filter((item: SexData) => item.check)[0].id,
      birthday: this.birthday,
      insuranceName: this.insuranceName
    }

    addOrUpdateInsuranceInfo(params).then((res: any) => {
      if (res.resultCode === '0') {
        this.$toast('添加成功')
        setTimeout(() => {
          this.$router.push({
            path: '/policy'
          })
        }, 1000)
        return
      }
      this.$toast(res.resultMsg)
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
              max-count={1}
              after-read={this.afterRead}
            />
          </van-col>
          <van-col span="24" class="add-info">
            <h4 class="add-info-title">个人信息</h4>

            <div class="add-target">
              <label class="add-target-label">
                <van-icon name="contact" />
                <span>谁的保单</span>
              </label>
              <div class="add-target-content">
                {this.basicData.map((item: BasicData, index: number) => {
                  return <van-button plain hairline color={!item.check ? '#C7C7C7' : '#FC5D47'} size="mini" onClick={this.handleDataName.bind(this, index)}>{item.dataName}</van-button>
                })}
              </div>
            </div>

            <van-cell-group>
              <van-field
                label="被保险人"
                v-model={this.insuredName}
                left-icon="user-circle-o"
                required
                placeholder="请输入被保险人真实姓名" />
            </van-cell-group>

            <div class="add-sex">
              <label class="add-sex-label">
                <van-icon name="friends-o" />性别</label>
              <div class="add-sex-content">
                {this.sexData.map((item: SexData, index: number) => {
                  return <van-button plain hairline color={!item.check ? '#C7C7C7' : '#FC5D47'} size="mini" onClick={this.handleDataSex.bind(this, index)}>{item.sex}</van-button>
                })}
              </div>
            </div>

            <van-cell-group class="add-birthday">
              <van-cell title="出生日期" icon="calender-o" is-link onClick={this.handleDate} value={this.birthday || this.birthdayHolder} />
            </van-cell-group>

          </van-col>
          <van-col span="24" class="add-name">
            <h4 class="add-name-title">主险名称</h4>
            <van-field
              label="保险名称"
              v-model={this.insuranceName}
              left-icon="completed"
              placeholder="请输入保险名称" />
          </van-col>
        </van-row>

        <van-popup
          v-model={this.show}
          position="bottom"
        >
          <van-datetime-picker
            v-model={this.currentDate}
            type="date"
            onConfirm={this.confirm}
            onCancel={this.cancel}
            min-date={this.minDate}
            max-date={this.maxDate}
          />
        </van-popup>

        <div class="add-button">
          <van-button
            color="#FC5D47"
            type="primary"
            round
            block
            onClick={this.handleSubmit}
          >
            {this.$route.query.id ? '保存编辑' : '确定添加'}
          </van-button>
        </div>
      </div>
    )
  }
}
