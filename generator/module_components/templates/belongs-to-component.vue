
<template>
  <p class="lead">BELONGS TO COMPONENT</p>
</template>

<!-- // // // //  -->

<script>
import { mapActions } from 'vuex'

export default {
  props: ['collection'],
  methods: mapActions({
    onConfirmDestroy: '<%= schema.identifier %>/deleteModel'
  })
}
</script>
