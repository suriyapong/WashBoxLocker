
const routes = [
  {
    path: '/',
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'login', component: () => import('pages/Login.vue') },
    ]
  },
  {
    path: '/staff',
    component: () => import('layouts/StaffLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Locker.vue') },
      { path: 'locker', component: () => import('pages/Locker.vue') },
      { path: 'clearlockerdropoff/:LockerID', name: 'ClearLockerDropOff', props: true, component: () => import('pages/ClearLockerDropOff.vue') },
      { path: 'clearlockerdropoffcomplete/:LockerID', name: 'ClearLockerDropOffComplete', props: true, component: () => import('pages/ClearLockerDropOffComplete.vue') },
    
      { path: 'setpickup/:LockerID', name: 'SetPickUp', props: true, component: () => import('pages/SetPickUp.vue') },
      { path: 'setpickupcomplete/:LockerID', name: 'SetPickUpComplete', props: true, component: () => import('pages/SetPickUpComplete.vue') },
      
      { path: 'clearpickupcomplete/:LockerID', name: 'ClearPickUpComplete', props: true, component: () => import('pages/ClearPickUpComplete.vue') },
      
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
