<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import <%= schema.label %>Form from '@/components/<%= schema.label %>Form'

export default {
  name: '<%= schema.identifier %>_new',
  metaInfo: {
    title: '<%= schema.label %> - New'
  },
  components: {
    <%= schema.label %>Form
  },
  created () {
    this.resetNewModel()
  },
  computed: mapGetters({
    model: '<%= schema.identifier %>/newModel'
  }),
  methods: {
    ...mapActions({
      formSubmit: '<%= schema.identifier %>/createModel'
    }),
    ...mapMutations({
      resetNewModel: '<%= schema.identifier %>/resetNewModel'
    })
  }
}
</script>
