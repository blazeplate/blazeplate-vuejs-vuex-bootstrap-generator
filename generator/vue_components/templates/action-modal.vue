<template>
  <!-- <%= action.label %> Modal Form -->
  <b-modal
    lazy
    id="<%= action.function_name %>Modal"
    :visible="showingModal"
    :title="'<%= action.label %>'"
    @ok="<%= action.function_name %>()"
    ok-variant='success'
    ok-title='Submit'
    @hide="$store.commit('<%= schema.identifier %>/<%= action.uri %>/showingModal', false)"
    cancel-title='Cancel'
    cancel-variant='light'
  >

    <b-form>
      <p class="text-muted">TODO - Modify the form below as needed to suit the <%= action.label %> API Action's requirements</p>

      <b-form-group
        id="email-fieldset"
        label="Email"
        label-for="email-input"
      >
        <b-form-input
          id="email-input"
          autocomplete="email"
          placeholder="Email"
          v-model="payload.email"
        />
      </b-form-group>

      <!-- CODOTYPE-NOTE - this is for debugging purposes -->
      <p class="text-muted">Payload Preview</p>
      <pre class='bg-dark text-light'>{{ payload }}</pre>

    </b-form>


  </b-modal>
</template>

<!-- // // // //  -->

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  methods: mapActions({
    <%= action.function_name %>: '<%= schema.identifier %>/<%= action.function_name %>'
  }),
  computed: mapGetters({
    payload: '<%= schema.identifier %>/<%= action.uri %>/payload',
    showingModal: '<%= schema.identifier %>/<%= action.uri %>/showingModal'
  })
}
</script>
