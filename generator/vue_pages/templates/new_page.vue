<template>
  <b-container>

    <b-row>
      <b-col sm="12">
        <h2><%= schema.label %> - New</h2>
      </b-col>
    </b-row>

    <hr>

    <<%= schema.class_name %>Form :model="model" />

    <b-row>
      <b-col sm="12" class="text-right">

        <b-btn
          class="mr-2"
          variant="light"
          @click="$router.go(-1)"
        >
          <i class="fa fa-fw fa-times"></i>
          Cancel
        </b-btn>

        <b-btn
          variant="primary"
          @click="createModel()"
        >
          <i class="fa fa-fw fa-plus"></i>
          Create <%= schema.label %>
        </b-btn>

      </b-col>
    </b-row>

  </b-container>
</template>

<!-- // // // //  -->

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import <%= schema.class_name %>Form from '@/modules/<%= schema.identifier %>/components/<%= schema.class_name %>Form'

export default {
  name: '<%= schema.class_name %>NewPage',
  metaInfo: {
    title: '<%= schema.label %> - New'
  },
  components: {
    <%= schema.class_name %>Form
  },
  created () {
    this.resetForm()
  },
  computed: mapGetters({
    model: '<%= schema.identifier %>/form/model'
  }),
  methods: {
    ...mapActions({
      createModel: '<%= schema.identifier %>/form/createModel'
    }),
    ...mapMutations({
      resetForm: '<%= schema.identifier %>/form/reset'
    })
  }
}
</script>
