
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
