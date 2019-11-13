import './plugins'
import ability from './utils/ability'


import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  ability,
  render: h => h(App)
}).$mount('#app')
