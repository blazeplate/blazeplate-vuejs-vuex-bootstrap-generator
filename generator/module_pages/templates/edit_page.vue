<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-12">
        <h2><%= schema.label %> - Edit</h2>
      </div>
    </div>

    <hr>

    <<%= schema.label %>Form :model="model" v-if="model._id && !fetching" />
    <Loading v-else />

    <div class="row">
      <div class="col-lg-12 text-right">

        <a href="#/<%= schema.identifier_plural %>" class="btn btn-outline-dark mr-2">
          <i class="fa fa-fw fa-times mr-1"></i>
          Cancel
        </a>

        <button class="btn btn-outline-success" @click="formSubmit(model)">
          <i class="fa fa-fw fa-plus mr-1"></i>
          Update <%= schema.label %>
        </button>

      </div>
    </div>

  </div>
</template>

<!-- // // // //  -->

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
