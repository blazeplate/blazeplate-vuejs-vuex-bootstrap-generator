<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import Loading from '@/components/Loading'
import <%= schema.class_name %>Form from '@/components/<%= schema.class_name %>Form'

export default {
  props: ['id'],
  name: '<%= schema.identifier %>_edit',
  metaInfo: {
    title: '<%= schema.label %> - Edit'
  },
  components: {
    Loading,
    <%= schema.class_name %>Form
  },
  created () {
    this.fetch(this.id)
    .then(() => {
      // TODO - this is ugly, fix it.
      setTimeout(() => {
        this.setEditModel(this.$store.getters['<%= schema.identifier %>/model'])
      }, 500)
    })
  },
  computed: mapGetters({
    model: '<%= schema.identifier %>/editModel',
    fetching: '<%= schema.identifier %>/fetching'
  }),
  methods: {
    ...mapActions({
      fetch: '<%= schema.identifier %>/fetchModel',
      formSubmit: '<%= schema.identifier %>/updateModel'
    }),
    ...mapMutations({
      setEditModel: '<%= schema.identifier %>/editModel'
    })
  }
}
</script>
