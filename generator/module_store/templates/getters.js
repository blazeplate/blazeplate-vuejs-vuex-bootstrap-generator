import { COLLECTION_GETTERS, MODEL_GETTERS } from '@/store/lib/mixins'

// <%= schema.label %> Module Getters
const getters = {
  <%_ schema.relations.forEach((rel) => { _%>
  <%_ if (rel.type === 'OWNS_MANY') { _%>
  <%= rel.alias.identifier_plural %>: state => {
    return state.<%= rel.alias.identifier_plural %>
  },
  <%_ } else if (rel.type === 'BELONGS_TO') { _%>
  <%= rel.alias.identifier %>: state => {
    return state.<%= rel.alias.identifier %>
  },
  <%_ } _%>
  <%_ })_%>
  ...COLLECTION_GETTERS,
  ...MODEL_GETTERS,
  newModel: state => {
    return state.newModel
  },
  editModel: state => {
    return state.editModel
  }
}

export default getters
