import axios from 'axios'
import router from '@/routers'
import LOADING_MODULE from '@/store/lib/loadingModule'
import { REGISTER_ROUTE } from './constants'

export default {
  state: {
    loadingRegister: false
  },
  mutations: {
    loadingRegister (state, loading) { state.loadingRegister = loading },
  },
  actions: {
    register ({ state, commit, dispatch }, registerUser) {
      commit('loadingRegister', true)

      // Assembles request payload
      let { <%= inlineDeconstruction %>, password } = registerUser

      // Sends registration data to server
      axios({
        method: 'post',
        url: REGISTER_ROUTE,
        data: { <%= inlineDeconstruction %>, password }
      })
      .then(() => {
        // Stops loading spinner
        commit('loadingRegister', false)

        // Shows success notification
        dispatch('toast/success', { message: 'Successfully registered' }, { root: true })

        // Redirects to login page
        router.push('/auth/login')
      })
      .catch(({ response }) => {
        // Stops loading spinner
        commit('loadingRegister', false)

        // Shows error notification
        dispatch('toast/error', { message: response.data.message }, { root: true })
      })
    }
  }
}
