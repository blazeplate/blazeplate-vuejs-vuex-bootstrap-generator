<script>
import { mapGetters, mapActions } from 'vuex'
import Loading from '@/components/Loading'
import <%= schema.class_name %>ShowWidget from '@/components/<%= schema.class_name %>ShowWidget'
<%_ for (index in schema.relations) { _%>
import <%= schema.relations[index].name %> from '@/components/<%= schema.relations[index].name %>'
<%_ } _%>

export default {
  props: ['id'],
  name: '<%= schema.identifier %>_show',
  metaInfo: {
    title: '<%= schema.label %>s - Show'
  },
  components: {
    <%_ for (index in schema.relations) { _%>
    <%= schema.relations[index].name %>,
    <%_ } _%>
    <%= schema.class_name %>ShowWidget,
    Loading
  },
  created () {
    this.fetch(this.id)
    <%_ for (index in schema.relations) { _%>
    this.<%= schema.relations[index].method %>(this.id)
    <%_ } _%>
  },
  methods: mapActions({
    <%_ for (index in schema.relations) { _%>
    <%= schema.relations[index].method %>: '<%= schema.relations[index].module %>/<%= schema.relations[index].action %>',
    <%_ } _%>
    fetch: '<%= schema.identifier %>/fetchModel',
    onConfirmDestroy: '<%= schema.identifier %>/deleteModel'
  }),
  computed: mapGetters({
    <%_ for (index in schema.relations) { _%>
    <%= schema.relations[index].computed %>: '<%= schema.relations[index].module %>/<%= schema.relations[index].getter %>',
    <%_ } _%>
    model: '<%= schema.identifier %>/model',
    fetching: '<%= schema.identifier %>/fetching'
  })
}
</script>
