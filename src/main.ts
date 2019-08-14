import Vue from 'vue';
import App from './App.vue';
import router from '@/router/index';
import store from '@/store/index';
import AntVue from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
Vue.config.productionTip = false;
Vue.use(AntVue)
console.log('process.env.NODE_ENV--', process.env.NODE_ENV)
if(process.env.NODE_ENV === 'development'){
  require('../mock')
}
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
