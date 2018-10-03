import axios from 'axios';
import store from '../store';

const state = {
  user: {},
  loading: false
};

const mutations = {
  setUser(state, user) {
    state.user = user;
  },
  setUserName(state, name) {
    state.user.userName = name;
  },
  startRequest(state) {
    state.loading = true;
  },
  finishRequest(state) {
    state.loading = false;
  },
  addCategory(state, category) {
    state.user.categories.push(category);
  },
  editCategory(state, category) {
    const index = state.user.categories.findIndex(cat => cat.key === category.key);
    console.log(index);
    state.user.categories.splice(index, 1, category);
  },
  deleteCategory(state, category) {
    console.log(category);
    const index = state.user.categories.findIndex(cat => cat.key === category.key);
    state.user.categories.splice(index, 1);
  },
  addIncome(state, income) {
    state.user.incomes.push(income);
  },
  addExpense(state, expense) {
    state.user.expenses.push(expense);
  },
  addPlannedBudget(state, plannedBudget) {

  },
  addGoal(state, goal) {

  }
};

const actions = {
  fetchUser({commit}, userId) {
    commit('startRequest');
    axios.get('https://cashwise-a8d6a.firebaseio.com/users.json')
      .then(res => {
        for(let key in res.data) {
          if(res.data[key].userId === userId) {
            let incomeArr = [];
            for(let key2 in res.data[key].incomes) {
              incomeArr.push({...res.data[key].incomes[key2], key: key2});
            }

            let expenseArr = [];
            for(let key2 in res.data[key].expenses) {
              expenseArr.push({...res.data[key].expenses[key2], key: key2});
            }

            let categoriesArr = [];
            for(let key2 in res.data[key].categories) {
              categoriesArr.push({...res.data[key].categories[key2], key: key2});
            }

            commit('setUser', {...res.data[key], key, incomes: incomeArr, expenses: expenseArr, categories: categoriesArr});
          }
        }
        commit('finishRequest');
      })
      .catch(err => console.error(err));
  },
  changeUserName({commit, state}, userName) {
    axios.patch(`https://cashwise-a8d6a.firebaseio.com/users/${state.user.key}.json`, {
      userName
    })
      .then(res => commit('setUserName', userName))
      .catch(err => console.error(err));
  },
  addCategory({commit}, category) {
    axios.post(`https://cashwise-a8d6a.firebaseio.com/users/${state.user.key}/categories.json`, {
      label: category
    })
      .then(res => {
        commit('addCategory', {label: category, key: res.data.name})
      })
      .catch(err => console.error(err));
  },
  editCategory({commit}, category) {
    axios.patch(`https://cashwise-a8d6a.firebaseio.com/users/${state.user.key}/categories/${category.key}.json`, {
      label: category.label
    })
      .then(res => commit('editCategory', category))
      .catch(err => console.error(err));
  },
  deleteCategory({commit}, category) {
    axios.delete(`https://cashwise-a8d6a.firebaseio.com/users/${state.user.key}/categories/${category.key}.json`)
      .then(res => commit('deleteCategory', category))
      .catch(err => console.error(err));
  },
  addIncome({commit}, income) {
    return axios.post(`https://cashwise-a8d6a.firebaseio.com/users/${state.user.key}/incomes.json`, income)
      .then(res => commit('addIncome', income))
      .catch(err => console.error(err));
  },
  addExpense({commit}, expense) {
    return axios.post(`https://cashwise-a8d6a.firebaseio.com/users/${state.user.key}/expenses.json`, expense)
      .then(res => commit('addExpense', expense))
      .catch(err => console.error(err));
  },
  addPlannedBudget({commit}, plannedBudget) {
    return axios.post(`https://cashwise-a8d6a.firebaseio.com/users/${state.user.key}/plannedBudgets.json`, plannedBudget)
      .then(res => commit('addPlannedBudget', plannedBudget))
      .catch(err => console.error(err));
  },
  addGoal({commit}, goal) {
    return axios.post(`https://cashwise-a8d6a.firebaseio.com/users/${state.user.key}/goals.json`, goal)
      .then(res => commit('addGoal', goal))
      .catch(err => console.log(err));
  }
};

const getters = {
  getUser(state) {
    return state.user;
  },
  getUserName(state) {
    return state.user.userName;
  },
  getUserLoading(state) {
    return state.loading;
  },
  getCategories(state) {
    return state.user.categories;
  },
  getBudget(state) {
    return state.user.budget;
  },
  getIncome(state) {
    if(!state.user.incomes) return 0;
    else {
      return state.user.incomes.reduce((accumulator, income) => accumulator + parseInt(income.value), 0);
    }
  },
  getExpenses(state) {
    if(!state.user.expenses) return 0;
    else {
      return state.user.expenses.reduce((accumulator, expense) => accumulator + parseInt(expense.value), 0);
    }
  }
};

export default {
  state,
  mutations,
  actions,
  getters
}