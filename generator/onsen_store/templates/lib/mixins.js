import _ from 'lodash'

// // // //
// Adds a Collection to a Vuex module

export const COLLECTION_GETTERS = {
  collection: state => {
    return state.collection
  },
  fetching: state => {
    return state.fetching
  }
}

export const COLLECTION_MUTATIONS = {
  collection (state, collection) {
    state.collection = collection
  },
  fetching (state, isFetching) {
    state.fetching = isFetching
  }
}

export const COLLECTION_STATE = {
  collection: [],
  fetching: false
}

// // // //
// Adds a Model definition to a Vuex module
export const MODEL_GETTERS = {
  model: state => {
    return state.model
  }
}

export const MODEL_MUTATIONS = {
  model (state, model) {
    state.model = model
  }
}

export const MODEL_STATE = {
  model: {}
}

// // // //
// Adds Collection filtering to a Vuex module
// TODO - abstract `showingInactive` into a separate mixin

export const FILTER_GETTERS = {
  filteredCollection: state => {
    return state.filteredCollection
  },
  filter: state => {
    return state.filter
  },
  showingInactive: state => {
    return state.showingInactive
  },
  orderBy: state => {
    return state.orderBy
  }
}

export const FILTER_MUTATIONS = {
  filteredCollection (state, filteredCollection) {
    state.filteredCollection = filteredCollection
  },
  filter (state, filter) {
    state.filter = filter
  },
  showingInactive (state, show) {
    state.showingInactive = show
  },
  orderBy (state, orderBy) {
    state.orderBy = orderBy
  }
}

export const FILTER_STATE = {
  filteredCollection: [],
  filter: '',
  showingInactive: false,
  orderBy: 'asc' // 'asc' or 'desc'
}

export const FILTER_ACTIONS = {
  // module/toggleOrderBy
  toggleOrderBy ({ state, commit, dispatch }) {
    const ORDER_ASC = 'asc'
    const ORDER_DESC = 'desc'
    if (state.orderBy === ORDER_ASC) {
      commit('orderBy', ORDER_DESC)
    } else {
      commit('orderBy', ORDER_ASC)
    }
    dispatch('filteredCollection')
  },

  // module/toggleInactive
  toggleInactive ({ state, commit, dispatch }) {
    if (state.showingInactive) {
      commit('showingInactive', false)
    } else {
      commit('showingInactive', true)
    }
    // Re-fetches the collection
    dispatch('fetchCollection')
  },

  // module/setFilter
  // Updates the current search query, invokes the module/filter mutation
  setFilter ({ commit, dispatch }, filter) {
    commit('filter', filter)
    dispatch('filteredCollection')
  }
}

// // // //
// Pagination Mixins

export const PAGINATION_STATE = {
  start: 0,
  pageSize: 3,
  currentPage: 1,
  paginatedCollection: []
}

export const PAGINATION_ACTIONS = {
  paginatedCollection ({ state, commit }) {
    let collection = state.filteredCollection || state.collection

    function paginate () {
      return _.chain(collection)
      .drop(state.start)
      .take(state.pageSize)
      .value()
    }

    let paginatedCollection = paginate()

    if (paginatedCollection.length === 0 && state.currentPage > 1) {
      commit('currentPage', 1)
      commit('paginatedCollection', paginate())
    } else {
      commit('paginatedCollection', paginatedCollection)
    }
  },
  pageSize ({ dispatch, commit }, newSize) {
    commit('pageSize', newSize)
    dispatch('paginatedCollection')
  },
  goToPage ({ dispatch, commit }, page) {
    commit('currentPage', page)
    dispatch('paginatedCollection')
  },
  prevPage ({ dispatch, state, commit }) {
    commit('currentPage', state.currentPage - 1)
    dispatch('paginatedCollection')
  },
  nextPage ({ dispatch, state, commit }) {
    commit('currentPage', state.currentPage + 1)
    dispatch('paginatedCollection')
  },
  firstPage ({ dispatch, commit }) {
    commit('currentPage', 1)
    dispatch('paginatedCollection')
  },
  lastPage ({ dispatch, state, commit }) {
    let collection = state.filteredCollection || state.collection
    commit('currentPage', Math.ceil(collection.length / state.pageSize))
    dispatch('paginatedCollection')
  }
}

export const PAGINATION_MUTATIONS = {
  currentPage (state, page) {
    state.currentPage = page
    state.start = (page - 1) * state.pageSize
  },
  pageSize (state, newSize) {
    state.pageSize = newSize
    state.start = (state.currentPage - 1) * state.pageSize
  },
  start (state, start) {
    state.start = start
  },
  paginatedCollection (state, paginatedCollection) {
    state.paginatedCollection = paginatedCollection
  }
}

export const PAGINATION_GETTERS = {
  pages: state => {
    let collection = state.filteredCollection || state.collection
    let total = Math.ceil(collection.length / state.pageSize)
    let current = Math.ceil(state.start / state.pageSize) + 1
    let pages = _.times(total, index => {
      return {
        current: index + 1 === current,
        page: index + 1
      }
    })

    return pages
  },
  currentPage: state => {
    return state.currentPage
  },
  totalPages: state => {
    let collection = state.filteredCollection || state.collection
    return Math.ceil(collection.length / state.pageSize)
  },
  prevPage: state => {
    return state.currentPage - 1 > 0 ? state.currentPage - 1 : false
  },
  nextPage: state => {
    let collection = state.filteredCollection || state.collection
    let total = Math.ceil(collection.length / state.pageSize)
    return state.currentPage < total ? state.currentPage + 1 : false
  },
  paginatedCollection: state => {
    return state.paginatedCollection
  }
}
