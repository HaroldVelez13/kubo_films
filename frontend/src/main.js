import Vue from 'vue'
import App from './App.vue'
import router from './routes/router'
import './assets/bootstrap.min.css';
import VueYoutube from 'vue-youtube'

Vue.use(VueYoutube)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
