<template>
  <LoadingFull v-if="fetching" />
  <div class="container" v-else>

    <div class="row">
      <div class="col-md-8">
        <h2>
          <%= schema.label_plural %>
        </h2>
      </div>

      <div class="col-md-4 text-right">
        <b-button variant="primary" to="/<%= schema.identifier_plural %>/new">
          <i class="fa fa-fw fa-plus"></i>
          New <%= schema.label %>
        </b-button>
      </div>
    </div>

    <!-- List View -->
    <div class="row">
      <div class="col-lg-12">
        <ListView :collection="collection" />
      </div>
    </div>
  </div>
</template>

<!-- // // // //  -->

<script>

import ListView from '@/modules/<%= schema.identifier %>/components/<%= schema.class_name %>ListWidget'
import LoadingFull from '@/components/LoadingFull'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: '<%= schema.class_name %>List',
  components: {
    LoadingFull,
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
