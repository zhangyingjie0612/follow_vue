// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'
import store from './store/index'
axios.defaults.baseURL='http://localhost:8080/'
Vue.prototype.axios=axios

Vue.config.productionTip = false
Vue.use(ElementUI);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store,//通过在根实例中注册store选项，该store实例会注入到跟组件下的所有子组件中，且子组件能通过this.$store访问到
})
