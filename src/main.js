import Vue from 'vue'
import wrap from '@vue/web-component-wrapper';
import App from './App.vue'

// KEEP THIS COMMENTED CODE FOR DEVELOPING PURPOSES 
// Vue.config.productionTip = false

// new Vue({
//   render: h => h(App)
// }).$mount('#app')

const CustomElement = wrap(Vue, App);
window.customElements.define('content-splitter', CustomElement);
