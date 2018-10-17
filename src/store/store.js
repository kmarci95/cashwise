import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth';
import user from './modules/user';
import infoBar from './modules/infoBar';
import incomes from './modules/incomes';
import plannedBudgets from './modules/plannedBudgets';
import expenses from './modules/expenses';
import goals from './modules/goals';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    user,
    infoBar,
    incomes,
    plannedBudgets,
    expenses,
    goals
  }
})
