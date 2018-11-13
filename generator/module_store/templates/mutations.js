import _ from 'lodash'
import { NEW_<%= schema.identifier.toUpperCase() %> } from './constants'
import { COLLECTION_MUTATIONS, MODEL_MUTATIONS } from '@/store/lib/mixins'

// <%= schema.label %> Module Mutations
export default {
  ...COLLECTION_MUTATIONS,
  ...MODEL_MUTATIONS,
  <%_ schema.relations.forEach((rel) => { _%>
  <%_ if (rel.type === 'REF_BELONGS_TO') { _%>
  <%= rel.alias.identifier_plural %> (state, <%= rel.alias.identifier_plural %>) {
    state.<%= rel.alias.identifier_plural %> = <%= rel.alias.identifier_plural %>
  },
  <%_ } else if (rel.type === 'HAS_MANY') { _%>
  <%= rel.alias.identifier_plural %> (state, <%= rel.alias.identifier_plural %>) {
    state.<%= rel.alias.identifier_plural %> = <%= rel.alias.identifier_plural %>
  },
  <%_ } else if (['BELONGS_TO', 'HAS_ONE'].includes(rel.type)) { _%>
  <%= rel.alias.identifier %> (state, <%= rel.alias.identifier %>) {
    state.<%= rel.alias.identifier %> = <%= rel.alias.identifier %>
  },
  <%_ } _%>
  <%_ })_%>
  resetNewModel (state) {
    state.newModel = _.cloneDeep(NEW_<%= schema.identifier.toUpperCase() %>)
  },
  editModel (state, model) {
    state.editModel = _.cloneDeep(model)
  }
}
