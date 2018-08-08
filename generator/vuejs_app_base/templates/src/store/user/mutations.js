// User Module mutations
export default {
  fetching (state, isFetching) {
    state.fetching = isFetching
  },
  sync (state, collection) {
    state.collection = collection
  },
  current (state, attributes) {
    state.current = attributes
  },
  collection (state, collection) {
    state.collection = collection
  }
}
