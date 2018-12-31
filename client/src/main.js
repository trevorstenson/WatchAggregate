import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false;

const listings = [
    {
        title: 'hamilton',
        link: 'reddit',
        price: '$230'
    },
    {
        title: 'oris',
        link: 'wus',
        price: '$650'
    }
];

new Vue({
    data: {
      listings
    },
  render: h => h(App),
}).$mount('#app')
