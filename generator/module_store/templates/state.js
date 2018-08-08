import { COLLECTION_STATE, MODEL_STATE } from '@/store/lib/mixins'

// <%= schema.label %> Module State
export default {
  <%_ for (index in schema.relations) { _%>
  <%_ let rel = schema.relations[index] _%>
  <%= rel.state %>: <%- rel.state_value %>,
  <%_ } _%>
  ...COLLECTION_STATE,
  ...MODEL_STATE,
  newModel: {},
  editModel: {}
}
