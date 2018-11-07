import axios from "axios";
import user from './user';

const state = {
  incomes: []
};

const mutations = {
  setIncomes(state, incomes) {
    state.incomes = incomes;
  },
  addIncome(state, income) {
    state.incomes.push(income);
  },
  editIncome(state, income) {
    const index = state.incomes.findIndex(inc => inc.key === income.key);
    state.incomes.splice(index, 1, income);
  },
  deleteIncome(state, key) {
    const index = state.incomes.findIndex(inc => inc.key === key);
    state.incomes.splice(index, 1);
  }
};

const actions = {
  setIncomes({commit}, incomes) {
    commit('setIncomes', incomes);
  },
  addIncome({commit}, income) {
    return axios.post(`https://cashwise-a8d6a.firebaseio.com/users/${user.state.user.key}/incomes.json`, income)
      .then(res => {
        income.key = res.data.name;
        commit('addIncome', income);
      })
      .catch(err => console.error(err));
  },
  editIncome({commit}, income) {
    axios.patch(`https://cashwise-a8d6a.firebaseio.com/users/${user.state.user.key}/incomes/${income.key}.json`, income)
      .then(res => commit('editIncome', income))
      .catch(err => console.error(err));
  },
  deleteIncome({commit}, key) {
    axios.delete(`https://cashwise-a8d6a.firebaseio.com/users/${user.state.user.key}/incomes/${key}.json`)
      .then(res => commit('deleteIncome', key))
      .catch(err => console.error(err));
  }
};

const getters = {
  getUserIncomes: state => state.incomes,
  getIncome(state) {
    if(!state.incomes) return 0;
    else {
      return state.incomes.reduce((accumulator, income) => accumulator + parseInt(income.value), 0);
    }
  },
  getUserIncome: state => keyString => state.incomes.find(income => income.key === keyString)
};

export default {
  state,
  getters,
  mutations,
  actions
}