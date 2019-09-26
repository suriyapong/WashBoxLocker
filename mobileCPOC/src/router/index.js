
import Vue from 'vue'
import Router from 'vue-router'
import Meta from 'vue-meta'
// Routes
import paths from './paths'
import feathersClient from "./plugins/feathers-client";


function route(path, view, name) {
    return {
      name: name || view,
      path,
      component: (resovle) => {
        import(`@/views/${view}.vue`).then(resovle)
      },
      props: true
    }
  }
  
  Vue.use(Router)
 
// Create a new router
const router = new Router({
    //mode: 'history',
    routes: paths.map(path => route(path.path, path.view, path.name)).concat([
      { path: '*', redirect: '/home' }
    ]),
    scrollBehavior(to, from, savedPosition) {
      if (savedPosition) {
        return savedPosition
      }
      if (to.hash) {
        return { selector: to.hash }
      }
      return { x: 0, y: 0 }
    }
  })
  
  Router.beforeEach(async (to, from, next) => {
  // หน้าที่ไม่ต้อง login ให้ค่าใน array  public page 
  const publicPages = ['/login'];
  const authRequired = !publicPages.includes(to.path);

  if (authRequired) {
    try {
      await feathersClient.get('authentication');

    } catch (error) {
      return next('/login');
    }
  }

  const user  = await feathersClient.get('authentication');

  if (authRequired && !user) {
    return next('/login');
  }

  return next();
})
Vue.use(Meta)


export default router
