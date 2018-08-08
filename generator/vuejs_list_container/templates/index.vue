<%_ if (ui_framework.id === 'bootstrap') { _%>
<%- include partials/list.bootstrap.vue %>
<%_ } else if (ui_framework.id === 'onsenui') { _%>
<%- include partials/list.onsenui.vue %>
<%_ } _%>

<!-- // // // //  -->

<script>

import ListView from '@/components/<%= schema.class_name %>ListWidget'
import Loading from '@/components/Loading'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: '<%= schema.identifier %>_list',
  components: {
    Loading,
    ListView
  },
  metaInfo: {
    title: '<%= schema.label_plural %>'
  },
  created () {
    return this.fetch()
  },
  computed: mapGetters({
    fetching: '<%= schema.identifier %>/fetching',
    collection: '<%= schema.identifier %>/collection'
  }),
  methods: mapActions({
    fetch: '<%= schema.identifier %>/fetchCollection'
  })
}
</script>


