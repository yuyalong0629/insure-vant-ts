import { Component, Vue, Prop } from 'vue-property-decorator'
import './index.less'

@Component
export default class Scheme extends Vue {
  @Prop({ default: '' }) private permisson!: string

  public render() {
    return (
      <div class="permisson">
        <h3>{this.permisson}</h3>
      </div>
    )
  }
}
