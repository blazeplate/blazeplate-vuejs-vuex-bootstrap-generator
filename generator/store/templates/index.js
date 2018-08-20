import Vue from 'vue'
import Vuex from 'vuex'

import auth from '@/modules/auth/store'
import notification from '@/modules/notification/store'
<%_ appSchema.schemas.forEach((schema) => { _%>
import <%= schema.identifier %> from '@/modules/<%= schema.identifier %>/store'
<%_ }) _%>

// Vuex Initialization
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    notification,
    <%= appSchema.schemas.map(s => s.identifier).join(',\n    ') %>
  }
})
