import axios from "axios";
import user from './user';

const state = {
  goals: []
};

const mutations = {
  setGoals(state, goals) {
    state.goals = goals;
  },
  addGoal(state, goal) {
    state.goals.push(goal);
  },
  editGoal(state, goal) {
    const index = state.goals.findIndex(inc => inc.key === goal.key);
    state.goals.splice(index, 1, goal);
  },
  deleteGoal(state, goal) {
    const index = state.goals.findIndex(inc => inc.key === goal.key);
    state.goals.splice(index, 1);
  }
};

const actions = {
  setGoals({commit}, goals) {
    commit('setGoals', goals);
  },
  addGoal({commit}, goal) {
    return axios.post(`https://cashwise-a8d6a.firebaseio.com/users/${user.state.user.key}/goals.json`, goal)
      .then(res => {
        goal.key = res.data.name;
        commit('addGoal', goal);
      })
      .catch(err => console.error(err));
  },
  editGoal({commit}, goal) {
    axios.patch(`https://cashwise-a8d6a.firebaseio.com/users/${user.state.user.key}/goals/${goal.key}.json`, goal)
      .then(res => commit('editGoal', goal))
      .catch(err => console.error(err));
  },
  deleteGoal({commit}, key) {
    axios.delete(`https://cashwise-a8d6a.firebaseio.com/users/${user.state.user.key}/goals/${key}.json`)
      .then(res => commit('deleteGoal', key))
      .catch(err => console.error(err));
  }
};

const getters = {
  getUserGoals: state => state.goals,
  getUserGoal: state => keyString => state.goals.find(goal => goal.key === keyString)
};

export default {
  state,
  getters,
  mutations,
  actions
}