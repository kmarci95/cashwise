import axios from 'axios';

const state = {
  idToken: null,
  userId: null
};

const mutations = {
  authUser(state, userData) {
    state.idToken = userData.token;
    state.userId = userData.userId;
  },
  clearAuthData(state) {
    state.idToken = null;
    state.userId = null;
  }
};

const actions = {
  register({commit, dispatch}, authData) {
    return axios.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyDQQfJNW09K_qFc5tKFtxV1NpWLkfG8Cqo',
      {
        email: authData.email,
        password: authData.password,
        returnSecureToken: true
      })
      .then(res => {
        console.log(res);
        commit('authUser', {token: res.data.idToken, userId: res.data.localId});
        const now = new Date();
        const expDate = new Date(now.getTime() + res.data.expiresIn * 1000);
        localStorage.setItem('token', res.data.idToken);
        localStorage.setItem('userId', res.data.localId);
        localStorage.setItem('expiresIn', expDate);
      })
  },
  login({commit, dispatch}, authData) {
    return axios.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyDQQfJNW09K_qFc5tKFtxV1NpWLkfG8Cqo',
      {
        email: authData.email,
        password: authData.password,
        returnSecureToken: true
      })
      .then(res => {
        console.log(res);
        commit('authUser', {token: res.data.idToken, userId: res.data.localId});
        const now = new Date();
        const expDate = new Date(now.getTime() + res.data.expiresIn * 1000);
        localStorage.setItem('token', res.data.idToken);
        localStorage.setItem('userId', res.data.localId);
        localStorage.setItem('expiresIn', expDate);
      })
  },
  tryAutoLogin({commit}) {
    const token = localStorage.getItem('token');
    if(!token) return;
    const expirationDate = localStorage.getItem('expiresIn');
    const now = new Date();
    if(now >= expirationDate) {
      return
    }
    const userId = localStorage.getItem('userId');
    commit('authUser', {token: token, userId: userId});
  },
  logout({commit}) {
    commit('clearAuthData');
    localStorage.removeItem('expiresIn');
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
  },
};

const getters = {
  isAuthenticated(state) {
    return state.idToken !== null;
  }
};

export default {
  state,
  mutations,
  actions,
  getters
}