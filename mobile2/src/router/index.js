import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('../layouts/LoginLayout.vue'),
    children: [
      { path: '', component: () => import('../views/Login.vue') },
      { path: 'login', component: () => import('../views/Login.vue') },
    ]
  },
  {
    path: '/',
    component: () => import('../layouts/StaffLayout.vue'),
    children: [
      { path: 'locker', component: () => import('../views/Locker.vue') },
      // { path: 'clearlockerdropoff/:LockerID', name: 'ClearLockerDropOff', props: true, component: () => import('pages/ClearLockerDropOff.vue') },
      // { path: 'clearlockerdropoffcomplete/:LockerID', name: 'ClearLockerDropOffComplete', props: true, component: () => import('pages/ClearLockerDropOffComplete.vue') },
    
      // { path: 'setpickup/:LockerID', name: 'SetPickUp', props: true, component: () => import('pages/SetPickUp.vue') },
      // { path: 'setpickupcomplete/:LockerID', name: 'SetPickUpComplete', props: true, component: () => import('pages/SetPickUpComplete.vue') },
      // { path: 'clearpickupcomplete/:LockerID', name: 'ClearPickUpComplete', props: true, component: () => import('pages/ClearPickUpComplete.vue') },

      // { path: 'openlocker', name: 'ClearPickUpComplete', component: () => import('pages/OpenLocker.vue') },
    ]
  }

  
]

const router = new VueRouter({
  routes
})

export default router
