<script>
// TODO - integrate RelationDropdown & abstract collection logic from this component
import RelationDropdown from '@/components/RelationDropdown'

export default {
  name: '<%= schema.identifier %>_form',
  props: ['model'],
  components: {
    RelationDropdown
  },
  created () {
    <%_ for (index in schema.attributes) { _%>
    <%_ let attr = schema.attributes[index] _%>
    <%_ if (attr.datatype === 'RELATION') { _%>
    this.$store.dispatch('<%= attr.datatypeOptions.schema_identifier %>/fetchCollection')
    <%_ } _%>
    <%_ } _%>
  },
  computed: {
    <%_ for (index in schema.attributes) { _%>
    <%_ let attr = schema.attributes[index] _%>
    <%_ if (attr.datatype === 'RELATION') { _%>
    <%=attr.datatypeOptions.schema_identifier_plural%> () {
      return this.$store.getters['<%= attr.datatypeOptions.schema_identifier %>/collection']
    },
    <%_ } _%>
    <%_ } _%>
  }
}
</script>
