import _ from 'lodash'
import axios from 'axios'
import store from '@/store'
import router from '@/router'
import { API_ROOT } from './constants'
import { PAGINATION_ACTIONS } from '@/store/lib/mixins'
import { $GET, $POST, $PUT, $DEL } from '@/store/lib/helpers'

// // // //

function fetchCollection () {
  store.dispatch('company/fetchCollection')
}

const debouncedFetch = _.debounce(fetchCollection, 1000)

// // // //

export default {
  ...PAGINATION_ACTIONS,
  setFilter ({ commit }, filter) {
    commit('filter', filter)
    debouncedFetch()
  },
  clear ({ state, commit }) {
    // commit('collection', [])
    commit('filter', '')
    debouncedFetch()
  },
  // GET /api/companies
  fetchCollection ({ state, commit, dispatch, rootGetters }) {
    commit('fetching', true)
    let apiRoot
    if (state.filter) {
      apiRoot = API_ROOT + '/search'
    } else {
      apiRoot = API_ROOT
    }
    axios.get(apiRoot, {
      headers: {
        authorization: rootGetters['auth/token']
      },
      params: {
        search: state.filter,
        page: state.currentPage,
        per_page: state.pageSize
      }
    })
    .then(({ data }) => {
      commit('collection', data.rows)
      commit('pageSize', data.per_page)
      commit('currentPage', data.page)
      commit('count', data.count)
      commit('fetching', false)
    })
    .catch((err) => {
      commit('fetching', false)
      commit('notification/add', { message: 'Fetch error', context: 'danger', dismissible: true }, { root: true })
      throw err // TODO - better error handling
    })
  },
  // GET /api/companies/:id
  fetchModel ({ state, commit, dispatch, rootGetters }, userId) {
    commit('fetching', true)

    axios.get(`${API_ROOT}/${userId}`, {
      headers: {
        authorization: rootGetters['auth/token']
      }
    })
    .then(({ data }) => {
      commit('model', data)
      commit('fetching', false)
    })
    .catch((err) => {
      commit('fetching', false)
      commit('notification/add', { message: 'Fetch error', context: 'danger', dismissible: true }, { root: true })
      throw err // TODO - better error handling
    })
  }
}
