import _ from 'lodash'
import { NEW_<%= schema.identifier.toUpperCase() %> } from './constants'
import { COLLECTION_MUTATIONS, MODEL_MUTATIONS } from '@/store/lib/mixins'

// <%= schema.label %> Module Mutations
export default {
  <%_ schema.relations.forEach((rel) => { _%>
  <%_ if (rel.type === 'OWNS_MANY') { _%>
  <%= rel.alias.identifier_plural %> (state, <%= rel.alias.identifier_plural %>) {
    state.<%= rel.alias.identifier_plural %> = <%= rel.alias.identifier_plural %>
  },
  <%_ } else if (rel.type === 'BELONGS_TO') { _%>
  <%= rel.alias.identifier %> (state, <%= rel.alias.identifier %>) {
    state.<%= rel.alias.identifier %> = <%= rel.alias.identifier %>
  },
  <%_ } _%>
  <%_ })_%>
  ...COLLECTION_MUTATIONS,
  ...MODEL_MUTATIONS,
  resetNewModel (state) {
    state.newModel = _.cloneDeep(NEW_<%= schema.identifier.toUpperCase() %>)
  },
  editModel (state, model) {
    state.editModel = _.cloneDeep(model)
  }
}
