import { $GET } from '@/store/lib/helpers'
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
    let apiRoute = API_ROOT
    if (state.showingInactive) {
      apiRoute += '/past'
    }

    // Fetches Collection from the server
    $GET(apiRoute, { token: rootGetters['auth/token'] })
    .then((json) => {
      commit('fetching', false)
      commit('collection', json)
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
    $GET(`/api/users/${userID}`, { token: rootGetters['auth/token'] })
    .then((user) => {
      commit('model', user)
      commit('fetching', false)
    })
    .catch((err) => {
      commit('fetching', false)
      throw err // TODO - better error handling
    })
  }
}
