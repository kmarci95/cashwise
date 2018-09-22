import axios from 'axios';

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
              incomeArr.push({...res.data[key].incomes[key2]});
            }
            console.log(incomeArr);
            commit('setUser', {...res.data[key], key, incomes: incomeArr});
          }
        }
        commit('finishRequest');
      })
      .catch(err => console.error(err));
  },
  changeUserName({commit, state}, userName) {
    commit('setUserName', userName);
    console.log(userName);
    axios.patch(`https://cashwise-a8d6a.firebaseio.com/users/${state.user.key}.json`, {
      userName
    })
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
      return state.user.expenses.reduce((accumulator, expense) => accumulator + parseInt(expense.value));
    }
  }
};

export default {
  state,
  mutations,
  actions,
  getters
}