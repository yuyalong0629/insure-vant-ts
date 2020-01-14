import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import VeRing from 'v-charts/lib/ring.common'
import 'echarts/lib/component/title'

@Component({
  components: {
    VeRing
  }
})
export default class Scheme extends Vue {
  @Prop({ default: () => { } }) private datasource!: any
  @Prop({ default: () => { } }) private setColor!: any

  private chartData!: any
  private chartSettings!: any
  private colors!: string[]
  private title!: any
  private legend!: any

  private data() {
    this.chartSettings = {
      radius: [40, 50],
      label: 'outside',
      offsetY: '50%'
    }

    this.title = {
      text: '保额分布',
      x: 'center',
      y: 'center',
      textStyle: {
        color: '#666',
        fontSize: 14,
        fontWeight: '600'
      }
    }

    return {
      chartData: {}
    }
  }

  @Watch('datasource', { immediate: true, deep: true })
  private watchDatasource(params: any) {
    this.$nextTick(() => {
      this.title.text = params.text
      this.chartData = params.chartData
    })
  }

  public render() {
    return (
      <ve-ring
        data={this.chartData}
        title={this.title}
        colors={this.setColor}
        legend-visible={false}
        tooltip-visible={false}
        settings={this.chartSettings}
        width="160px"
        height="160px"
      ></ve-ring>
    )
  }
}
