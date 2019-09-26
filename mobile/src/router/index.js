import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes'
import Meta from 'vue-meta'
import feathersClient from "../plugins/feathers-client";

Vue.use(VueRouter)

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation
 */

export default function (/* { store, ssrContext } */) {
  const Router = new VueRouter({
    scrollBehavior(to, from, savedPosition) {
      if (savedPosition) {
        return savedPosition
      }
      if (to.hash) {
        return { selector: to.hash }
      }
      return { x: 0, y: 0 }
    },
    routes,

    // Leave these as is and change from quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  })

  Router.beforeEach(async (to, from, next) => {
    // หน้าที่ไม่ต้อง login ให้ค่าใน array  public page 
    // const publicPages = ['/login'];
    // const authRequired = !publicPages.includes(to.path);
  
    // if (authRequired) {
    //   try {
    //     await feathersClient.get('authentication');
  
    //   } catch (error) {
    //     return next('/login');
    //   }
    // }
  
    // const user  = await feathersClient.get('authentication');
  
    // if (authRequired && !user) {
    //   return next('/login');
    // }
  
    return next();
  })
  Vue.use(Meta)

  return Router
}
