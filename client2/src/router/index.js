import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    component: () => import(/* webpackChunkName: "about" */ '../views/Index.vue')
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },

  { path: '/mainmenu', component: () => import('../views/MainMenu.vue') },
  { path: '/dropoffconfirm', component: () => import('../views/DropOffConfirm.vue') },
  { path: '/dropoffphonenumber', component: () => import('../views/DropOffPhoneNumber.vue') },
  { path: '/dropofflockernumber/:LockerNo', props: true, component: () => import('../views/DropOffLockerNumber.vue') },
  { path: '/dropoffcomplete/:LockerNo', props: true, component: () => import('../views/DropOffComplete.vue') },



]

const router = new VueRouter({
  routes
})

export default router
