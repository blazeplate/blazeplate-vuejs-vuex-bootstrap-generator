import axios from 'axios'
import { PAGINATION_ACTIONS, FILTER_ACTIONS } from '@/store/lib/mixins'

const API_ROOT = '/api/users'

// // // //

// User module actions
// functions that causes side effects and can involve asynchronous operations.
export default {
  ...PAGINATION_ACTIONS,
  ...FILTER_ACTIONS,
  fetchCollection: ({ commit, state, rootGetters }) => {
    commit('fetching', true)

    // Fetches either active or inactive users
    axios.get(API_ROOT, {
      // headers: {
      //   authorization: rootGetters['auth/token']
      // }
    })
    .then(({ data }) => {
      commit('fetching', false)
      commit('collection', data)
    })
    .catch((err) => {
      commit('fetching', false)
      throw err // TODO - better error handling
    })
  },

  // fetchUser
  // Fetches an individual user from the server
  fetchUser ({ store, commit, rootGetters }, userID) {
    commit('fetching', true)
    axios.get(`${API_ROOT}/${userId}`, {
      // headers: {
      //   authorization: rootGetters['auth/token']
      // }
    })
    .then(({ data }) => {
      commit('model', data)
      commit('fetching', false)
    })
    .catch((err) => {
      commit('fetching', false)
      throw err // TODO - better error handling
    })
  }
}
