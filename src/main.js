import Vue from 'vue'
// import App from './App.vue'
import firebase from 'firebase'
import './firebase'
import Master from './components/Master/index'
import router from './router'
import store from './store'
import { sync } from 'vuex-router-sync'
import EventBus from './bus'
import VeeValidate, { Validator } from 'vee-validate'
import zh_TW from 'vee-validate/dist/locale/zh_TW'
import CxltToastr from 'cxlt-vue2-toastr'
var toastrConfigs = {
  position: 'bottom right',
  showDuration: 2000,
  timeOut: 3000,
  progressBar: true
}

sync(store, router)
Vue.config.productionTip = false

Vue.use(CxltToastr, toastrConfigs)
Vue.use(VeeValidate)
Vue.use(EventBus)
Validator.localize('zh_TW', zh_TW)
Vue.directive('focus', {
  inserted: function(el) {
    el.focus()
  }
})

let app
firebase.auth().onAuthStateChanged(user => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(Master)
    }).$mount('#app')
  }
})
