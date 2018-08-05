import _ from 'lodash'
import { NEW_<%= schema.identifier.toUpperCase() %> } from './constants'

// <%= schema.label %> Module Mutations
export default {
  <%_ for (index in schema.relations) { _%>
  <%_ let rel = schema.relations[index] _%>
  <%= rel.state %> (state, <%= rel.state %>) {
    state.<%= rel.state %> = <%= rel.state %>
  },
  <%_ } _%>
  collection (state, collection) {
    state.collection = collection
  },
  fetching (state, isFetching) {
    state.fetching = isFetching
  },
  model (state, model) {
    state.model = model
  },
  resetNewModel (state) {
    state.newModel = _.cloneDeep(NEW_<%= schema.identifier.toUpperCase() %>)
  },
  editModel (state, model) {
    state.editModel = _.cloneDeep(model)
  }
}
