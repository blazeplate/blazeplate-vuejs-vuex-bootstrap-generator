
<template>
  <LayoutView :model="model"/>
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


