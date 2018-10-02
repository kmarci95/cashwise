import axios from 'axios';

const state = {
  show: false,
  infoBar: {}
};

const mutations = {
  setShow(state, show) {
    state.show = show;
  },
  setInfoBar(state, infoBar) {
    state.infoBar = infoBar;
  }
};

const actions = {
  displayInfoBar({commit}, infoBar) {
    commit('setInfoBar', infoBar);
    commit('setShow', true);
    setTimeout(() => commit('setShow', false), 3000);
  }
};

const getters = {
  getInfoBarShow: state => state.show,
  getInfoBar: state => state.infoBar
};

export default {
  state,
  mutations,
  actions,
  getters
}