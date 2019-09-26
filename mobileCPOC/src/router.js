import Vue from 'vue'
import Router from 'vue-router'

import feathersClient from "./plugins/feathers-client";


Vue.use(Router)

const router = new Router({
  routes: [

    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/Login.vue'),
    },
    {
      path: '/mainpass',
      name: 'MainPassenger',
      component: () => import('@/views/MainPass.vue'),
    },
    {
      path: '/myprofile',
      name: 'MyProfile',
      component: () => import('@/views/MyProfile.vue'),
    },

    {
      path: '/history',
      name: 'History',
      component: () => import('@/views/History.vue'),
    },
    {
      path: '/plan',
      name: 'Plan',
      component: () => import('@/views/Plan.vue'),
    },
    {
      path: '/home',
      name: 'Home',
      component: () => import('@/views/Home.vue'),
    },
    {
      path: '*',
      redirect: '/home',
    }

  ]
})
//console.log(feathersClient)
router.beforeEach(async (to, from, next) => {
  // หน้าที่ไม่ต้อง login ให้ค่าใน array  public page 
  const publicPages = ['/login'];
  const authRequired = !publicPages.includes(to.path);
  const accessToken = await feathersClient.authentication.getAccessToken()

  if (authRequired) {
    try {
      if (!accessToken) {
        return next('/login');
      }
      await feathersClient.authenticate({ strategy: 'jwt', accessToken })
      return next();
    } catch (error) {
      return next('/login');
    }
  } else {
    return next();
  }


})


export default router