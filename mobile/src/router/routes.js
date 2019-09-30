
const routes = [
  {
    path: '/',
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Login.vue') },
      { path: 'login', component: () => import('pages/Login.vue') },
    ]
  },
  {
    path: '/',
    component: () => import('layouts/StaffLayout.vue'),
    children: [
      { path: 'locker', component: () => import('pages/Locker.vue') },
      { path: 'clearlockerdropoff/:LockerID', name: 'ClearLockerDropOff', props: true, component: () => import('pages/ClearLockerDropOff.vue') },
      { path: 'clearlockerdropoffcomplete/:LockerID', name: 'ClearLockerDropOffComplete', props: true, component: () => import('pages/ClearLockerDropOffComplete.vue') },
    
      { path: 'setpickup/:LockerID', name: 'SetPickUp', props: true, component: () => import('pages/SetPickUp.vue') },
      { path: 'setpickupcomplete/:LockerID', name: 'SetPickUpComplete', props: true, component: () => import('pages/SetPickUpComplete.vue') },
      { path: 'clearpickupcomplete/:LockerID', name: 'ClearPickUpComplete', props: true, component: () => import('pages/ClearPickUpComplete.vue') },

      { path: 'openlocker', name: 'ClearPickUpComplete', component: () => import('pages/OpenLocker.vue') },
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue'),

  })
}

export default routes
