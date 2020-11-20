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
import firebase from 'firebase/app'

 let base2 ='https://ezxcrbxjw0.execute-api.us-east-1.amazonaws.com/dev/';
Vue.config.productionTip = false
const base = axios.create({
  baseURL: 'https://6nlk8s2xu7.execute-api.us-west-1.amazonaws.com/dev/api/v1/',
  headers: {
    'Content-Type': 'application/json'
	}
})
firebase.initializeApp({
  apiKey: "AIzaSyD6fk26g_aRzmkeu3OZiC4e4gf2SKOz9eg",
  authDomain: process.env.AUTHDOMAIN,
  databaseURL: process.env.DATABASEURL,
  projectId: process.env.PROYECTID,
  storageBucket: "calcium-doodad-288418.appspot.com",
  messagingSenderId: process.env.MESSAGINGSENDERID,
  appId: process.env.APPID,
})
Vue.use(VueAxios, base)
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
