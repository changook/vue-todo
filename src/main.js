import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import VueDraggable from 'vue-draggable'

import App from './App.vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.use(VueDraggable)

new Vue({
    el: '#app',
    render: h => h(App)
});