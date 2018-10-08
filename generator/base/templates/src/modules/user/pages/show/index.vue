<template>
  <div class="container">
    <a to="/users">Back</a>
    <h2>User Show - {{model.name}}</h2>
    <hr>
    <p class="lead text-warning">TOOD - implement user show page</p>
  </div>
</template>

<!-- // // // //  -->

<script>
import { mapGetters, mapActions } from 'vuex'
import LayoutView from './components/layout.vue'

export default {
  props: ['id'],
  components: {
    LayoutView
  },
  metaInfo: {
    title: 'Users - Show'
  },
  created () {
    this.fetch(this.id)
  },
  methods: mapActions({
    fetch: 'user/fetchModel'
  }),
  computed: mapGetters({
    model: 'user/current'
  })
}
</script>
