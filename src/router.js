import Vue from 'vue'
import Router from 'vue-router'
import LoginPage from './views/LoginPage';
import DashboardPage from './views/DashboardPage';
import Budget from './components/Budget/Budget.vue';
import PlannedBudget from './components/PlannedBudget/PlannedBudget.vue';
import AccountSettings from './components/AccountSettings/AccountSettings.vue';
import Goals from './components/Goals/Goals.vue';
import Listings from './components/Listings/Listings.vue';
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
      path: '/dashboard', name: 'dashboard', component: DashboardPage, redirect: '/dashboard/listings',
      beforeEnter(to, from, next) {
        if(store.state.auth.idToken) {
          next()
        } else {
          next('/')
        }
      },
      children: [
        {path: 'listings', component: Listings},
        {path: 'listings/:id/budget', component: Budget},
        {path: 'account-settings', component: AccountSettings},
        {path: 'planned-budget', component: PlannedBudget},
        {path: 'goals', component: Goals},
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
