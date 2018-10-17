import axios from "axios";
import user from './user';

const state = {
  expenses: []
};

const mutations = {
  setExpenses(state, expenses) {
    state.expenses = expenses;
  },
  addExpense(state, expense) {
    state.expenses.push(expense);
  },
  editExpense(state, expense) {
    const index = state.expenses.findIndex(inc => inc.id === expense.id);
    state.expenses.splice(index, 1, expense);
  },
  deleteExpense(state, key) {
    const index = state.expenses.findIndex(exp => exp.key === key);
    state.expenses.splice(index, 1);
  }
};

const actions = {
  setExpenses({commit}, expenses) {
    commit('setExpenses', expenses);
  },
  addExpense({commit}, expense) {
    return axios.post(`https://cashwise-a8d6a.firebaseio.com/users/${user.state.user.key}/expenses.json`, expense)
      .then(res => {
        expense.key = res.data.name;
        commit('addExpense', expense);
      })
      .catch(err => console.error(err));
  },
  editExpense({commit}, expense) {
    axios.patch(`https://cashwise-a8d6a.firebaseio.com/users/${user.state.user.key}/expenses/${expense.key}.json`, expense)
      .then(res => commit('editExpense', expense))
      .catch(err => console.error(err));
  },
  deleteExpense({commit}, key) {
    axios.delete(`https://cashwise-a8d6a.firebaseio.com/users/${user.state.user.key}/expenses/${key}.json`)
      .then(res => commit('deleteExpense', key))
      .catch(err => console.error(err));
  }
};

const getters = {
  getUserExpenses: state => state.expenses,
  getExpense(state) {
    if(!state.expenses) return 0;
    else {
      return state.expenses.reduce((accumulator, expense) => accumulator + parseInt(expense.value), 0);
    }
  },
  getUserExpense: state => keyString => state.expenses.find(expense => expense.key === keyString)
};

export default {
  state,
  getters,
  mutations,
  actions
}