import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'

Vue.use(VueRouter)

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

let flag = false

export default function ({ store }) {
  const originalPush = VueRouter.prototype.push
  VueRouter.prototype.push = function push (location) {
    return originalPush.call(this, location).catch(err => err)
  }

  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,

    // Leave these as they are and change in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  })

  Router.beforeEach((to, from, next) => {
    const user = store.getters['auth/getUser']
    if (!user) {
      if (to.matched.some(route => route.meta.authOnly)) {
        if (flag) return
        flag = true
        Vue.prototype.$q.notify({
          type: 'warning',
          message: 'Faça o login para acessar esta página.'
        })
        return next({ name: 'login' })
      }
      return next()
    } else if (to.name === 'login') return next({ name: 'app.home' })
    return next()
  })
  return Router
}
