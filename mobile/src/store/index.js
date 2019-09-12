import Vue from 'vue'
import Vuex from 'vuex'

import feathersVuex from 'feathers-vuex'
import feathersClient from '../plugins/feathers-client'
const { service, auth, FeathersVuex } = feathersVuex(feathersClient, { idField: 'Id' })

Vue.use(Vuex)
Vue.use(FeathersVuex)
/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      // example
    },
    plugins: [
      auth({ userService: 'user',entityIdField:'Id' }),
      service('role',{modelName:'Role',idField: 'Id'}),
      service('user',{modelName:'User',idField: 'Id'}), 
      
      service('locker', { modelName: 'Locker', idField: 'LockerID' }),
      service('check-available', { idField: 'Id' }),
      service('drop-off', { idField: 'Id' }),
      service('clean-drop-off', { idField: 'Id' }),
      service('custom-service', { idField: 'Id'}),
    ],

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  })

  return Store
}
