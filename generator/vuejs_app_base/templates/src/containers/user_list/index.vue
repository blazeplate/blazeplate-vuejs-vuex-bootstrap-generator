
<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-12">

        <!-- Header -->
        <h2>User List</h2>
        <hr>

        <!-- Fetching -->
        <p class='lead' v-if="fetching">
          <i class="fa fa-2x fa-spin fa-spinner"></i>
        </p>

        <!-- EmptyView -->
        <!-- TODO - abstract into ListView -->
        <p class='lead' v-if="!collection[0]">
          EMPTY
        </p>

        <!-- ListView -->
        <ListView :collection="collection"></ListView>

      </div>
    </div>
  </div>
</template>

<!-- // // // //  -->

<script>
import { mapGetters, mapActions } from 'vuex'
import ListView from './list.vue'

export default {
  components: {
    ListView
  },
  created () {
    this.fetch()
  },
  computed: mapGetters({
    collection: 'user/collection',
    fetching: 'user/fetching'
  }),
  mapActions({
    fetch: 'user/fetchCollection'
  })
}
</script>
