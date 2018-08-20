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

        <a href="#/<%= schema.identifier_plural %>" class="btn btn-outline-dark mr-2">
          <i class="fa fa-fw fa-times mr-1"></i>
          Cancel
        </a>

        <button class="btn btn-outline-success" @click="formSubmit(model)">
          <i class="fa fa-fw fa-plus mr-1"></i>
          Create <%= schema.label %>
        </button>

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
