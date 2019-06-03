import axios from 'axios'
import router from '@/routers'
import { PROFILE_ROUTE } from './constants'

// TODO - needs error handling!!
export default {
  state: {
    user: {},
    loadingProfile: false
  },
  mutations: {
    user (state, currentUser) { state.user = currentUser },
    loadingProfile (state, loading) { state.loadingProfile = loading },
    clear_user (state) { state.user = Object.assign({}, {}) }
  },
  getters: {
    user: state => { return state.user },
    loadingProfile: state => { return state.loadingProfile },
  },
  actions: {
    fetchProfile ({ getters, commit, dispatch }) {
      return new Promise((resolve, reject) => {
        // Prevents unnecssary fetch on client start
        if (!getters['token']) {
          commit('clear_token')
          commit('clear_current_user')
          commit('loadingProfile', false)
          return resolve()
        }

        commit('loadingProfile', true)

        axios.get(PROFILE_ROUTE, {
          headers: {
            authorization: getters['authorizationHeader']
          }
        })
        .then(({ data }) => {
          commit('current_user', data)
          commit('loadingProfile', false)
          return resolve(data)
        })
        .catch((err) => {
          commit('clear_token')
          commit('clear_current_user')
          commit('loadingProfile', false)
          dispatch('toast/error', { message: err.message }, { root: true })
        })
      })
    }
  }
}
