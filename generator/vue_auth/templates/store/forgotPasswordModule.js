import axios from 'axios'
import { RESET_ROUTE } from './constants'

export default {
  state: {
    email: '',
    done: false,
    loadingForgotPassword: false
  },
  getters: {
    email: state => state.email,
    done: state => state.done
  },
  mutations: {
    email (state, email) { state.email = email },
    done (state, done) { state.done = done },
    loadingForgotPassword (state, loading) { state.loadingForgotPassword = loading }
  },
  actions: {
    resetForm ({ commit }) {
      commit('email', '')
      commit('done', false)
    },
    submit ({ state, commit }) {
      commit('loadingForgotPassword', true)

      // Sends login data to server
      // Handles user.password_reset_token creation
      // Reset link is emailed to the user
      axios({
        method: 'post',
        url: RESET_ROUTE,
        data: {
          email: state.email
        }
      })
      .then(() => {
        commit('done', true)
        commit('loadingForgotPassword', false)
      })
      .catch((err) => {
        commit('loadingForgotPassword', false)
        // commit('error', err.message)
        // TODO - integrate with TOAST module
      })
    }
  }
}
