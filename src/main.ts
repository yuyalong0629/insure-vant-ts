import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import './config/index'

import {
  Image,
  Button,
  Row,
  Col,
  Toast,
  Field,
  Cell,
  CellGroup,
  Popup,
  DatetimePicker,
  Picker,
  Checkbox,
  CheckboxGroup,
  Grid,
  GridItem,
  Dialog,
  List,
  PullRefresh,
  Uploader,
  Icon,
  Tab,
  Tabs,
  Tag
} from 'vant'

Vue.use(Image)
Vue.use(Button)
Vue.use(Row)
Vue.use(Col)
Vue.use(Toast)
Vue.use(Field)
Vue.use(Cell)
Vue.use(CellGroup)
Vue.use(Popup)
Vue.use(DatetimePicker)
Vue.use(Picker)
Vue.use(Checkbox).use(CheckboxGroup)
Vue.use(Grid).use(GridItem)
Vue.use(Dialog)
Vue.use(List)
Vue.use(PullRefresh)
Vue.use(Uploader)
Vue.use(Icon)
Vue.use(Tab).use(Tabs)
Vue.use(Tag)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
