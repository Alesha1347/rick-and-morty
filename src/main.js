import Vue from 'vue'
import api from '@/api';
import App from '@/App';
import router from '@/router';
import store from '@/store';
import components from './components/UI/index'

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

components.forEach(component =>{
  Vue.component(component.name, component)
})

Vue.config.productionTip = false
Vue.prototype.$api = api;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
