import { Component, Vue } from 'vue-property-decorator'
import './index.less'

@Component
export default class Service extends Vue {
  public render() {
    return (
      <van-row class="service">
        <van-col span="24" class="service-list">
          <h4 class="service-title">我们的服务</h4>
          <ul class="service-list-content">
            <li>
              <h5>保险课程</h5>
              <p>如果您想多了解些保险知识，我们会提供基础保险知识的科普课程以供参考。</p>
            </li>
            <li>
              <h5>客服解答</h5>
              <p>遇到任何疑问，都有人工客服在线悉心解答，随时随地为您提供专业的保险咨询服务。</p>
            </li>
            <li>
              <h5>家庭保障方案</h5>
              <p>为您和家人评估风险保障缺口，挑选行业中最适合最优惠的产品，还有专家在线帮助投保与核保，并免费提供保单诊断服务。</p>
            </li>
            <li>
              <h5>专属规划师</h5>
              <p>规划师会结合您的情况输出定制化保险方案。为您提供健康告知咨询、保障条款讲解、保障方案规划等服务，确保您在投保的每一步都清楚明白不踩坑。</p>
            </li>
            <li>
              <h5>保单服务</h5>
              <p>投保成功后，若您需要纸质保单或发票，客服会协助您申请处理，后续也会为您进行保单管理。</p>
            </li>
            <li>
              <h5>理赔咨询服务</h5>
              <p>需要理赔时，我们会给您咨询服务，可以安排一对一专员全程协助理赔，负责处理您的报案，提醒您理赔流程、资料收集，并追踪理赔结果。</p>
            </li>
          </ul>
        </van-col>

        <van-col span="24" class="service-list">
          <h4 class="service-title">投保原则</h4>
          <ul class="service-list-content">
            <li>
              <h5>①先规划,后产品</h5>
              <p>建议从家庭的实际情况来整体规划,再去考虑具体的产品配置</p>
            </li>
            <li>
              <h5>②先保额,后保费</h5>
              <p>保险就是要以小博大,杠杆越高越好,保额太低解决不了问题</p>
            </li>
            <li>
              <h5>③先大人,后小孩</h5>
              <p>优先保障家庭的经济支柱,大人的平安是孩子健康成长的前提</p>
            </li>
            <li>
              <h5>④先人身后财产</h5>
              <p>身体是革命的本钱,只要我们身体,可以为去赚取财富</p>
            </li>
          </ul>
        </van-col>

        <van-col span="24" class="service-list">
          <h4 class="service-title">常见问题</h4>
          <ul class="service-list-content">
            <li>
              <h5>Q:在线投保有什么注意事项</h5>
              <p>A:绝大部分的理赔纠纷，都是因为没有如实告知健康情况。强烈建议您仔细阅读投保页面中的“健康告知”，确认没有问题再进行投保。如有疑问，请及时联系规划师。</p>
            </li>
            <li>
              <h5>Q:方案中的产品如何投保</h5>
              <p>A:建议联系规划师协助投保，部分产品的购买顺序会影响顺利投保。</p>
            </li>
            <li>
              <h5>Q:投保后，谁来给我们提供服务，理赔的时候 怎么办？</h5>
              <p>A:如果是通过我们投保的产品，出险理赔请第一时间联系您的专属规划师，我们会为您提供专业的指导。</p>
            </li>
          </ul>
        </van-col>
      </van-row>
    )
  }
}
