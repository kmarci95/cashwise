import Vue from 'vue'
import Router from 'vue-router'
import LoginPage from './views/LoginPage';
import DashboardPage from './views/DashboardPage';
import store from './store/store';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: LoginPage
    },
    {
      path: '/dashboard', name: 'dashboard', component: DashboardPage,
      beforeEnter(to, from, next) {
        if(store.state.auth.idToken) {
          next()
        } else {
          next('/')
        }
      }
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
