
// Auth Module mutations
export default {
  fetching (state, isFetching) {
    state.fetching = isFetching
  },
  clear_login_user (state) {
    state.login_user = {
      email: '',
      username: '',
      password: '',
      errors: {}
    }
  },
  clear_register_user (state) {
    state.register_user = {
      email: '',
      username: '',
      password: '',
      passwordverify: '',
      errors: {}
    }
  },
  logging_in (state, status) {
    state.logging_in = status
  },
  logged_in (state, bool) {
    state.logged_in = bool
  },
  token (state, token) {
    localStorage.token = token
    state.token = token
  },
  clear_token (state) {
    localStorage.token = ''
    state.token = ''
  },
  current_user (state, currentUser) {
    state.current_user = currentUser
  },
  clear_current_user (state) {
    state.current_user = {}
  }
}
