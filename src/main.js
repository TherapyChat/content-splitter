import Vue from 'vue'
import VueMq from 'vue-mq'
import App from './App.vue'

Vue.config.productionTip = false

Vue.use(VueMq, {
  breakpoints: { // default breakpoints - customize this
    sm: 800,
    md: 1250
  }
})

new Vue({
  render: h => h(App)
}).$mount('#app')
