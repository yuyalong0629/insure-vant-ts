import { Component, Vue } from 'vue-property-decorator'
import '@/assets/style/reset.less'

@Component
export default class App extends Vue {
  public render() {
    return (
      <div id="app">
        <router-view />
      </div>
    )
  }
}
