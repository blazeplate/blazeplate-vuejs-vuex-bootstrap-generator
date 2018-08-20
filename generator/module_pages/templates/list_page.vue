<template>
  <div class="container">

    <div class="row">
      <div class="col-md-8">
        <h2>
          <%= schema.label_plural %>
        </h2>
      </div>

      <div class="col-md-4 text-right">
        <a class='btn btn-outline-success' href="#/<%= schema.identifier_plural %>/new">
          <i class="fa fa-fw fa-plus mr-2"></i>
          New <%= schema.label %>
        </a>
      </div>
    </div>

    <!-- List View -->
    <div class="row" v-if="!fetching">
      <div class="col-lg-12">
        <ListView :collection="collection" />
      </div>
    </div>
    <Loading v-else />
  </div>
</template>

<!-- // // // //  -->

<script>

import ListView from '@/modules/<%= schema.identifier %>/components/<%= schema.class_name %>ListWidget'
import Loading from '@/components/Loading'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: '<%= schema.class_name %>List',
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


