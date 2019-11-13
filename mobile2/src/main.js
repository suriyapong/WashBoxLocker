import Vue from 'vue'

import './plugins'

import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'



import ability from './utils/ability'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  ability,
  render: h => h(App)
}).$mount('#app')
