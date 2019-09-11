
const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'mainmenu', component: () => import('pages/MainMenu.vue') },
      { path: 'dropoffconfirm', component: () => import('pages/DropOffConfirm.vue') },
      { path: 'dropoffphonenumber', component: () => import('pages/DropOffPhoneNumber.vue') },
      { path: 'dropofflockernumber/:LockerNo', name: 'DropOffLockerNumber', props: true, component: () => import('pages/DropOffLockerNumber.vue') },
      { path: 'dropoffcomplete/:LockerNo', name: 'DropOffComplete', props: true, component: () => import('pages/DropOffComplete.vue') },
      
      { path: 'pickupconfirm', component: () => import('pages/PickupConfirm.vue') },
      { path: 'pickupcode', component: () => import('pages/PickUpCode.vue') },
      { path: 'pickuplockernumber/:LockerNo', name: 'PickUpLockerNumber', props: true, component: () => import('pages/PickUpLockerNumber.vue') },
      { path: 'pickupcomplete/:LockerNo', name: 'PickUpComplete', props: true, component: () => import('pages/PickUpComplete.vue') },

      { path: 'lockernotavailable', component: () => import('pages/LockerNotAvailable.vue') },    
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
