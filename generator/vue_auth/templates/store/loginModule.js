import axios from 'axios'
import router from '@/routers'
import { LOGIN_ROUTE } from './constants'

export default {
  state: {
    loadingLogin: false
  },
  mutations: {
    token (state, token) { state.token = token },
    loadingLogin (state, loading) { state.loadingLogin = loading }
  },
  getters: {
    loadingLogin: state => { return state.loadingLogin },
  },
  actions: {
    submitLogin ({ commit, state, dispatch }, user) {
      commit('loadingLogin', true)

      // Authenticates user with server
      return axios({
        method: 'post',
        url: LOGIN_ROUTE,
        data: {
          email: user.email,
          password: user.password
        }
      })
      .then(({ data }) => {
        // Changes loading state
        commit('loadingLogin', false)

        // Updates store.token
        commit('token', data.token)

        // Pulls current user data from server response
        const { email, admin, _id, role } = data
        commit('current_user', { email, admin, _id, role })

        // Shows success notification
        dispatch('toast/success', { message: 'Successfully authenticated' }, { root: true })

        // Redirects to home page
        router.push('/')
      })
      .catch((err) => {
        commit('loadingLogin', false)
        dispatch('toast/error', { message: err.response.data.message }, { root: true })
        throw err
      })
    }
  }
}
