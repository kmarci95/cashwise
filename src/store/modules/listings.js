import axios from 'axios';
import user from "./user";

const state = {
  listings: [],
  listing: {}
};

const mutations = {
  addListing(state, listings) {
    state.listings.push(listings);
  },
  setListings(state, listings) {
    state.listings = listings;
  },
  editListing(state, listing) {
    const index = state.listings.findIndex(inc => inc.key === listing.key);
    state.listings.splice(index, 1, listing);
  },
  deleteListing(state, key) {
    const index = state.listings.findIndex(inc => inc.key === key);
    state.listings.splice(index, 1);
  }
};

const actions = {
  async addListing({commit}, listing) {
    return axios.post(`https://cashwise-a8d6a.firebaseio.com/users/${user.state.user.key}/listings.json`, listing)
      .then(res => {
        listing.key = res.data.name;
        commit('addListing', listing);
      })
      .catch(err => console.error(err));
  },
  setListings({commit}, listings) {
    commit('setListings', listings)
  },
  editListing({commit}, listing) {
    axios.patch(`https://cashwise-a8d6a.firebaseio.com/users/${user.state.user.key}/listings/${listing.key}.json`, listing)
      .then(res => commit('editListing', listing))
      .catch(err => console.error(err));
  },
  deleteListing({commit}, key) {
    axios.delete(`https://cashwise-a8d6a.firebaseio.com/users/${user.state.user.key}/listings/${key}.json`)
      .then(res => commit('deleteListing', key))
      .catch(err => console.error(err));
  },
};

const getters = {
  getListings: state => state.listings,
  getListing: state => keyString => state.listings.find(listing => listing.key === keyString)
};

export default {
  state,
  mutations,
  actions,
  getters
}