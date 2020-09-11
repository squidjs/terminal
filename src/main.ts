import Vue from 'vue';
import App from './ui/App.vue';

// Disable production tip
Vue.config.productionTip = false

new Vue({

  render: h => h(App),

}).$mount('#app');
