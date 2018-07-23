import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import VueDraggable from 'vue-draggable'
import Datepicker from 'vue-datepicker'

import App from './App.vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.use(VueDraggable)
Vue.component('datePicker', Datepicker)

Date.prototype.diffDays = function (date) {
    var oneDay = 24 * 60 * 60 * 1000;

    return Math.floor((Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) - Date.UTC(this.getFullYear(), this.getMonth(), this.getDate())) / oneDay);
};

new Vue({
    el: '#app',
    render: h => h(App)
});