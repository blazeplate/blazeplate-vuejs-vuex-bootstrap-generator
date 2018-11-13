
// Auth Module Getters
export default {
  login_user: state => {
    return state.login_user
  },
  register_user: state => {
    return state.register_user
  },
  is_authenticated: state => {
    if (state.current_user._id) {
      return true
    } else {
      return false
    }
  },
  isAdmin: state => {
    return state.current_user.admin
  },
  current_user: state => {
    return state.current_user
  },
  logging_in: state => {
    return state.logging_in
  },
  logged_in: state => {
    return state.logged_in
  },
  token: state => {
    return state.token
  },
  authorizationHeader: state => {
    return 'JWT ' + state.token
  },
  fetching: state => {
    return state.fetching
  }
}
