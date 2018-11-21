import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router';
import 'font-awesome/css/font-awesome.css';  
import './theme/default.styl';
import colors from 'vuetify/es5/util/colors';
import Truncate from 'lodash.truncate';
Vue.config.productionTip = false
Vue.filter('truncate', Truncate);



new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
