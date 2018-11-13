import { COLLECTION_STATE, MODEL_STATE } from '@/store/lib/mixins'

// <%= schema.label %> Module State
export default {
  ...COLLECTION_STATE,
  ...MODEL_STATE,
  <%_ schema.relations.forEach((rel) => { _%>
  <%_ if (rel.type === 'REF_BELONGS_TO') { _%>
  <%= rel.alias.identifier_plural %>: [],
  <%_ } else if (rel.type === 'HAS_MANY') { _%>
  <%= rel.alias.identifier_plural %>: [],
  <%_ } else if (['BELONGS_TO', 'HAS_ONE'].includes(rel.type)) { _%>
  <%= rel.alias.identifier %>: {},
  <%_ } _%>
  <%_ })_%>
  newModel: {},
  editModel: {}
}
