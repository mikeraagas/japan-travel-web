import Vue from 'vue'
import Antd from 'ant-design-vue';
import Layout from '@layout'
import router from './router'
import 'ant-design-vue/dist/antd.css';
Vue.config.productionTip = false

Vue.use(Antd);

new Vue({
  router,
  render: h => h(Layout)
}).$mount('#app');