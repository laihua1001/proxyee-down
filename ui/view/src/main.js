// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import axios from 'axios'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
import store from './store'

Vue.use(ElementUI, {size: 'medium'})
Vue.config.productionTip = false
Vue.prototype.$http = axios.create({
    headers: {'X-Requested-With': 'XMLHttpRequest'}
  }
)
Vue.prototype.$http.interceptors.response.use(
  response => {
    let result = response.data;
    if (result.status != 200) {
      ElementUI.Message({showClose: true, message: result.msg});
      return Promise.reject(response);
    }
    return result;
  },
  error => {
    return Promise.reject(error)
  });

new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: {App}
})