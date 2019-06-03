import axios from 'axios'
import router from '@/routers'
import { RESET_PASSWORD_ROUTE } from './constants'

// TODO - needs error handling!!
export default {
  state: {
    doneResettingPassword: false,
    error: '',
    loadingPasswordReset: false,
    password: 'reverse',
    password_reset_token: '',
    password_verify: 'reverse',
  },
  getters: {
    password: state => state.password,
    password_verify: state => state.password_verify,
    verified: state => !(state.password && state.password_verify && state.password === state.password_verify),
    password_reset_token: state => state.password_reset_token,
    error: state => state.error,
    doneResettingPassword: state => state.doneResettingPassword
  },
  mutations: {
    password (state, password) { state.password = password },
    password_verify (state, password_verify) { state.password_verify = password_verify },
    password_reset_token (state, password_reset_token) { state.password_reset_token = password_reset_token },
    error (state, error) { state.error = error },
    doneResettingPassword (state, done) { state.doneResettingPassword = done },
    loadingPasswordReset (state, loading) { state.loadingPasswordReset = loading }
  },
  actions: {
    submit ({ state, commit }) {
      commit('loadingPasswordReset', true)

      // Handles resetting user password
      axios({
        method: 'post',
        url: RESET_PASSWORD_ROUTE,
        data: {
          password: state.password,
          password_reset_token: state.password_reset_token
        }
      })
      .then(() => {
        commit('doneResettingPassword', true)
        commit('loadingPasswordReset', false)
        commit('password', '')
        commit('password_verify', '')
        router.push('/auth/login')
      })
      .catch((err) => {
        commit('loadingPasswordReset', false)
        commit('error', err.message)
      })
    }
  }
}
