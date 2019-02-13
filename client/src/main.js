import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false;

//create new Vue instance
new Vue({
    data: {
        listings: []
    },
    render: h => h(App)
}).$mount('#app');