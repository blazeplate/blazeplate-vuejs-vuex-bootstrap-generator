<template>
  <LoadingFull v-if="fetching" />
  <div class="container" v-else>
    <div class="row">
      <div class="col-sm-12">
        <h2><%= schema.label %> - Edit</h2>
      </div>
    </div>

    <hr>

    <<%= schema.class_name %>Form :model="model" />

    <div class="row">
      <div class="col-lg-12 text-right">

        <b-button @click="$router.back()" variant="secondary" class="mr-2">
          <i class="fa fa-fw fa-times"></i>
          Cancel
        </b-button>

        <b-button variant="primary" @click="formSubmit(model)">
          <i class="fa fa-fw fa-plus"></i>
          Update <%= schema.label %>
        </b-button>

      </div>
    </div>

  </div>
</template>

<!-- // // // //  -->

<script>
import { mapGetters, mapActions } from 'vuex'
import LoadingFull from '@/components/LoadingFull'
import <%= schema.class_name %>Form from '@/modules/<%= schema.identifier %>/components/<%= schema.class_name %>Form'

export default {
  props: ['id'],
  name: '<%= schema.identifier %>_edit',
  metaInfo: {
    title: '<%= schema.label %> - Edit'
  },
  components: {
    LoadingFull,
    <%= schema.class_name %>Form
  },
  data () {
    return {
      fetching: false
    }
  },
  created () {
    this.fetching = true
    this.fetchEditModel(this.id)
    .then(() => { this.fetching = false })
  },
  computed: mapGetters({
    model: '<%= schema.identifier %>/editModel'
    // fetching: '<%= schema.identifier %>/fetching'
  }),
  methods: mapActions({
    fetchEditModel: '<%= schema.identifier %>/fetchEditModel',
    formSubmit: '<%= schema.identifier %>/updateModel'
  })
}
</script>
