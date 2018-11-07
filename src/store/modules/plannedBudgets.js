import axios from "axios";
import user from './user';

const state = {
  plannedBudgets: []
};

const mutations = {
  setPlannedBudgets(state, plannedBudgets) {
    state.plannedBudgets = plannedBudgets;
  },
  addPlannedBudget(state, plannedBudget) {
    state.plannedBudgets.push(plannedBudget);
  },
  editPlannedBudget(state, plannedBudget) {
    const index = state.plannedBudgets.findIndex(inc => inc.key === plannedBudget.key);
    state.plannedBudgets.splice(index, 1, plannedBudget);
  },
  deletePlannedBudget(state, plannedBudget) {
    const index = state.plannedBudgets.findIndex(inc => inc.key === plannedBudget.key);
    state.plannedBudgets.splice(index, 1);
  }
};

const actions = {
  setPlannedBudgets({commit}, plannedBudgets) {
    commit('setPlannedBudgets', plannedBudgets);
  },
  addPlannedBudget({commit}, plannedBudget) {
    return axios.post(`https://cashwise-a8d6a.firebaseio.com/users/${user.state.user.key}/plannedBudgets.json`, plannedBudget)
      .then(res => {
        plannedBudget.key = res.data.name;
        commit('addPlannedBudget', plannedBudget);
      })
      .catch(err => console.error(err));
  },
  editPlannedBudget({commit}, plannedBudget) {
    axios.patch(`https://cashwise-a8d6a.firebaseio.com/users/${user.state.user.key}/plannedBudgets/${plannedBudget.key}.json`, plannedBudget)
      .then(res => commit('editPlannedBudget', plannedBudget))
      .catch(err => console.error(err));
  },
  deletePlannedBudget({commit}, key) {
    axios.delete(`https://cashwise-a8d6a.firebaseio.com/users/${user.state.user.key}/plannedBudgets/${key}.json`)
      .then(res => commit('deletePlannedBudget', key))
      .catch(err => console.error(err));
  }
};

const getters = {
  getUserPlannedBudgets: state => state.plannedBudgets,
  getUserPlannedBudget: state => keyString => state.plannedBudgets.find(pb => pb.key === keyString)
};

export default {
  state,
  mutations,
  actions,
  getters
}