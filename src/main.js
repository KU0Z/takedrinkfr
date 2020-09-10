import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import '@babel/polyfill'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'
import './style/scss/app/main.scss';
import axios from 'axios'
import VueAxios from 'vue-axios'

 let base2 ='https://ezxcrbxjw0.execute-api.us-east-1.amazonaws.com/dev/';
Vue.config.productionTip = false
const base = axios.create({
  baseURL: 'https://auth.muca.live/',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin':'*',
	}
})
Vue.use(VueAxios, base)
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
