import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/flex.css'
import axios from "axios";
import VCharts from 'v-charts'
import Fragment from 'vue-fragment'
//使用fragement
Vue.use(Fragment.Plugin)

//使用VCharts
Vue.use(VCharts)

Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.prototype.$http = axios;


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
