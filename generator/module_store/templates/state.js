import { COLLECTION_STATE, MODEL_STATE } from '@/store/lib/mixins'

// <%= schema.label %> Module State
export default {
  <%_ schema.relations.forEach((rel) => { _%>
  <%_ if (rel.type === 'OWNS_MANY') { _%>
  <%= rel.alias.identifier_plural %>: [],
  <%_ } else if (rel.type === 'BELONGS_TO') { _%>
  <%= rel.alias.identifier %>: {},
  <%_ } _%>
  <%_ })_%>
  ...COLLECTION_STATE,
  ...MODEL_STATE,
  newModel: {},
  editModel: {}
}
