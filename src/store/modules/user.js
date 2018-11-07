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
    state.user.categories.splice(index, 1, category);
  },
  deleteCategory(state, category) {
    const index = state.user.categories.findIndex(cat => cat.key === category.key);
    state.user.categories.splice(index, 1);
  }
};

const actions = {
  fetchUser({commit, dispatch}, userId) {
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

            let plannedBudgetArr = [];
            for(let key2 in res.data[key].plannedBudgets) {
              plannedBudgetArr.push({...res.data[key].plannedBudgets[key2], key: key2});
            }

            let goalsArr = [];
            for(let key2 in res.data[key].goals) {
              goalsArr.push({...res.data[key].goals[key2], key: key2});
            }

            let listingsArr = [];
            for(let key2 in res.data[key].listings) {
              listingsArr.push({...res.data[key].listings[key2], key: key2});
            }

            commit('setUser', {
              userName: res.data[key].userName,
              userId: res.data[key].userId,
              key,
              expenses: expenseArr,
              categories: categoriesArr
            });
            dispatch('setIncomes', incomeArr);
            dispatch('setExpenses', expenseArr);
            dispatch('setPlannedBudgets', plannedBudgetArr);
            dispatch('setGoals', goalsArr);
            dispatch('setListings', listingsArr);
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
  }
};

export default {
  state,
  mutations,
  actions,
  getters
}