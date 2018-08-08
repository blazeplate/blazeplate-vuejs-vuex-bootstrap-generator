import { COLLECTION_GETTERS, MODEL_GETTERS } from '../lib/mixins'

// <%= schema.label %> Module Getters
const getters = {
  <%_ for (index in schema.relations) { _%>
  <%_ let rel = schema.relations[index] _%>
  <%= rel.getter %>: state => {
    return state.<%= rel.state %>
  },
  <%_ } _%>
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
