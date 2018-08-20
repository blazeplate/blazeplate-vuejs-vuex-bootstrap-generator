
// <%= schema.label %> Module Getters
const getters = {
  collection: state => {
    return state.collection
  },
  fetching: state => {
    return state.fetching
  },
  model: state => {
    return state.model
  },
  <%_ for (index in schema.relations) { _%>
  <%_ let rel = schema.relations[index] _%>
  <%= rel.getter %>: state => {
    return state.<%= rel.state %>
  },
  <%_ } _%>
  newModel: state => {
    return state.newModel
  },
  editModel: state => {
    return state.editModel
  }
}

export default getters
