<template>
  <div class="container">

    <!-- ADD SHOW WIDGET BACK HERE -->
    <<%= schema.label %>ShowWidget :model="model" :fetching="fetching" />

    <div class="row">
      TODo - relations go here
    </div>

  </div>
</template>

<!-- // // // //  -->

<script>
import { mapGetters, mapActions } from 'vuex'
import Loading from '@/components/Loading'
import <%= schema.class_name %>ShowWidget from '@/modules/<%= schema.identifier %>/components/<%= schema.class_name %>ShowWidget'

export default {
  props: ['id'],
  name: '<%= schema.identifier %>_show',
  metaInfo: {
    title: '<%= schema.label %>s - Show'
  },
  components: {
    <%= schema.class_name %>ShowWidget,
    Loading
  },
  created () {
    this.fetch(this.id)
  },
  methods: mapActions({
    fetch: '<%= schema.identifier %>/fetchModel',
    onConfirmDestroy: '<%= schema.identifier %>/deleteModel'
  }),
  computed: mapGetters({
    model: '<%= schema.identifier %>/model',
    fetching: '<%= schema.identifier %>/fetching'
  })
}
</script>
