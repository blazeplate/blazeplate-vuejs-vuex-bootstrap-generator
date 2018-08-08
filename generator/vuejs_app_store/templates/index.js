import Vue from 'vue'
import Vuex from 'vuex'

// TODO - auth should be dynamicallly included
import auth from './auth'
import notification from './notification'
<%_ for (index in appSchema.schemas) { _%>
import <%= appSchema.schemas[index].identifier %> from './<%= appSchema.schemas[index].identifier %>'
<%_ } _%>

// Vuex Initialization
// TODO - should this be done elsewhere?
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    notification,
    <%= storeModules %>
  }
})
