import Vue from 'vue'
import App from './App.vue'

import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue);

Vue.config.productionTip = false;

export const eventBus = new Vue();

new Vue({
    data: {
        listings: []
    },
    render: h => h(App)
}).$mount('#app');