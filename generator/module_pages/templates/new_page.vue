<template>
  <div class="container">

    <div class="row">
      <div class="col-sm-12">
        <h2><%= schema.label %> - New</h2>
      </div>
    </div>

    <hr>

    <<%= schema.class_name %>Form :model="model" />
    <div class="row">
      <div class="col-lg-12 text-right">

        <b-button to="/<%= schema.identifier_plural %>" variant="light" class="mr-2">
          <i class="fa fa-fw fa-times"></i>
          Cancel
        </b-button>

        <b-button variant="primary" @click="formSubmit(model)">
          <i class="fa fa-fw fa-plus"></i>
          Create <%= schema.label %>
        </b-button>

      </div>
    </div>

  </div>
</template>

<!-- // // // //  -->

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import <%= schema.class_name %>Form from '@/modules/<%= schema.identifier %>/components/<%= schema.class_name %>Form'

export default {
  name: '<%= schema.class_name %>New',
  metaInfo: {
    title: '<%= schema.label %> - New'
  },
  components: {
    <%= schema.class_name %>Form
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
