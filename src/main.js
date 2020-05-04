import Vue from 'vue'
import App from './App.vue'
import axios from './axios-auth';

Vue.config.productionTip = false

axios.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return Promise.reject(error);//catchに渡すerror返すとthenに飛ぶ
  }
);

new Vue({
  render: h => h(App),
}).$mount('#app')
