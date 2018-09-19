import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import 'jquery/dist/jquery.min';
import 'popper.js/dist/popper.min';
import 'bootstrap'

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
