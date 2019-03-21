<template>
  <LoadingFull v-if="fetching" />
  <b-container v-else>

    <b-row>
      <b-col sm="12">
        <h2><%= schema.label %> - Edit</h2>
      </b-col>
    </b-row>

    <hr>

    <<%= schema.class_name %>Form :model="model" />

    <b-row>
      <b-col sm="12" class="text-right">

        <b-btn
          class="mr-2"
          variant="secondary"
          @click="$router.go(-1)"
        >
          <i class="fa fa-fw fa-times"></i>
          Cancel
        </b-btn>

        <b-btn
          variant="primary"
          @click="updateModel(model)"
        >
          <i class="fa fa-fw fa-plus"></i>
          Update <%= schema.label %>
        </b-btn>

      </b-col>
    </b-row>

  </b-container>
</template>

<!-- // // // //  -->

<script>
import { mapGetters, mapActions } from 'vuex'
import LoadingFull from '@/components/LoadingFull'
import <%= schema.class_name %>Form from '@/modules/<%= schema.identifier %>/components/<%= schema.class_name %>Form'

export default {
  name: '<%= schema.class_name %>EditPage',
  props: {
    id: {
      type: String,
      required: true
    }
  },
  metaInfo: {
    title: '<%= schema.label %> - Edit'
  },
  components: {
    LoadingFull,
    <%= schema.class_name %>Form
  },
  created () {
    this.fetch(this.id)
  },
  computed: mapGetters({
    currentUser: 'auth/current_user',
    isAdmin: 'auth/isAdmin',
    model: '<%= schema.identifier %>/edit/model',
    fetching: '<%= schema.identifier %>/edit/loading'
  }),
  methods: mapActions({
    fetch: '<%= schema.identifier %>/edit/fetch',
    updateModel: '<%= schema.identifier %>/edit/update'
  })
}
</script>
