import Vue from 'vue'
import Router from 'vue-router'
import LoginPage from './views/LoginPage';
import DashboardPage from './views/DashboardPage';
import Budget from './components/Budget/Budget.vue';
import AccountSettings from './components/AccountSettings/AccountSettings.vue';
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
      path: '/dashboard', name: 'dashboard', component: DashboardPage, redirect: '/dashboard/budget',
      beforeEnter(to, from, next) {
        if(store.state.auth.idToken) {
          next()
        } else {
          next('/')
        }
      },
      children: [
        {path: 'budget', component: Budget},
        {path: 'account-settings', component: AccountSettings},
      ]
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
