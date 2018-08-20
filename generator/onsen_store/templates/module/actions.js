// import router from '@/routers'
import { $GET, $POST, $PUT, $DEL } from '../lib/helpers'
import VueOnsen from 'vue-onsenui';

const API_ROOT = '/api/<%= schema.identifier_plural %>'

// // // //

export default {
  <%_ for (index in schema.relations) { _%>
  <%_ let relation = schema.relations[index] _%>
  // GET /api/<%= schema.identifier_plural %>/:id/<%= relation.url %> OWNS MANY
  <%= relation.action %> ({ state, commit, dispatch }, <%= schema.identifier %>Id) {
    commit('fetching', true)
    $GET(API_ROOT + '/' + <%= schema.identifier %>Id + '/<%= relation.url %>')
    .then((<%= schema.identifier_plural %>) => {
      commit('<%= relation.state %>', <%= schema.identifier_plural %>)
      commit('fetching', false)
    })
    .catch((err) => {
      commit('fetching', false)
      VueOnsen._ons.notification.toast('Fetch error', { buttonLabel: 'Dismiss', timeout: 1500 })
      throw err // TODO - better error handling
    })
  },
  <%_ } _%>

  // GET /api/<%= schema.identifier_plural %>
  fetchCollection ({ state, commit, dispatch }) {
    commit('fetching', true)
    $GET(API_ROOT)
    .then((<%= schema.identifier_plural %>) => {
      commit('collection', <%= schema.identifier_plural %>)
      commit('fetching', false)
    })
    .catch((err) => {
      commit('fetching', false)
      VueOnsen._ons.notification.toast('Fetch error', { buttonLabel: 'Dismiss', timeout: 1500 })
      throw err // TODO - better error handling
    })
  },
  // GET /api/<%= schema.identifier_plural %>/:id
  fetchModel ({ state, commit, dispatch }, <%= schema.identifier %>Id) {
    commit('fetching', true)
    $GET(`${API_ROOT}/${<%= schema.identifier %>Id}`)
    .then((<%= schema.identifier %>) => {
      commit('model', <%= schema.identifier %>)
      commit('fetching', false)
    })
    .catch((err) => {
      commit('fetching', false)
      VueOnsen._ons.notification.toast('Fetch error', { buttonLabel: 'Dismiss', timeout: 1500 })
      throw err // TODO - better error handling
    })
  },
  // POST /api/<%= schema.identifier_plural %>
  createModel ({ state, commit, dispatch }, <%= schema.identifier %>Model) {
    commit('fetching', true)
    $POST(`${API_ROOT}`, {
      body: <%= schema.identifier %>Model
    })
    .then((<%= schema.identifier %>) => {
      commit('fetching', false)
      // router.push(`/<%= schema.identifier_plural %>`)
    })
    .catch((err) => {
      commit('fetching', false)
      VueOnsen._ons.notification.toast('Create error', { buttonLabel: 'Dismiss', timeout: 1500 })
      throw err
    })
  },
  // PUT /api/<%= schema.identifier_plural %>/:id
  updateModel ({ state, commit }, <%= schema.identifier %>Model) {
    commit('fetching', true)
    $PUT(`${API_ROOT}/${<%= schema.identifier %>Model._id}`, {
      body: <%= schema.identifier %>Model
    })
    .then((<%= schema.identifier %>) => {
      commit('fetching', false)
      // router.push(`/<%= schema.identifier_plural %>/${<%= schema.identifier %>._id}`)
    })
    .catch((err) => {
      commit('fetching', false)
      VueOnsen._ons.notification.toast('Update error', { buttonLabel: 'Dismiss', timeout: 1500 })
      throw err
    })
  },
  // DELETE /api/<%= schema.identifier_plural %>/:id
  deleteModel ({ state, commit }, <%= schema.identifier %>Model) {
    commit('fetching', true)
    $DEL(`${API_ROOT}/${<%= schema.identifier %>Model._id}`)
    .then((<%= schema.identifier %>) => {
      commit('fetching', false)
      let collection = _.filter(state.collection, (m) => { return m._id !== <%= schema.identifier %>Model._id })
      commit('collection', collection)
      // router.push(`/<%= schema.identifier_plural %>`)
    })
    .catch((err) => {
      commit('fetching', false)
      VueOnsen._ons.notification.toast('Destroy error', { buttonLabel: 'Dismiss', timeout: 1500 })
      throw err // TODO - better error handling
    })
  }
}
