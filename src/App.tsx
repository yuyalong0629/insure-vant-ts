import { Component, Vue } from 'vue-property-decorator'
import { wxAuth } from '@/utils/util'
import '@/assets/style/reset.less'

@Component
export default class App extends Vue {
  public userId: number = 0

  public mounted() {
    this.$ls.set('userId', 0)
    this.$ls.set('token', '')

    const isAuthorize = this.$ls.get('authorize') || true
    // 未授权
    if (this.userId === 0) {
      if (isAuthorize) {
        const href = window.location.href.split('#')[0]
        const state = `${(this.$route.query as any).csId}`
        // wxAuth('wx5725ff8014059e2d', href, state)
      }
    }
  }

  public render() {
    return (
      <div id="app">
        <router-view />
      </div>
    )
  }
}
