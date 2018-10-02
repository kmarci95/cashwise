import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth';
import user from './modules/user';
import infoBar from './modules/infoBar';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    user,
    infoBar
  }
})
