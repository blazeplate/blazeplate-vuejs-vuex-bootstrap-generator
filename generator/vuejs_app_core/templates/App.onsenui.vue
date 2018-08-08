
<template>
  <v-ons-splitter>

    <!-- Side Menu -->
    <v-ons-splitter-side swipeable collapse width="250px"
      :animation="$ons.platform.isAndroid() ? 'overlay' : 'reveal'"
      :open.sync="menuIsOpen">
      <!-- <MenuPage/> -->
    </v-ons-splitter-side>

    <!-- Page Content -->
    <v-ons-splitter-content>
      <router-view/>
    </v-ons-splitter-content>

  </v-ons-splitter>
</template>

<script>
// import Notification from '@/components/app_notification'
// import MenuPage from '@/components/Sidebar'

export default {
  name: 'app',

  // Top-Level Application Components
  components: {
    // MenuPage
  },

  // Top-Level page Meta
  metaInfo: {
    title: 'Home', // set a title
    titleTemplate: 'Blazeplate - %s', // title is now "Blazeplate - Loading..."
    htmlAttrs: {
      lang: 'en'
    }
  },
  data () {
    return {
      opened: false
    }
  },
  computed: {
    menuIsOpen: {
      get () {
        return this.opened
      },
      set (newValue) {
        this.opened = newValue
        // this.$store.commit('splitter/toggle', newValue)
      }
    }
  }
}
</script>

<style type="text/css">
  html {
    height: 100%;
  }

  body {
    height: 100%;
  }

  .container-fluid {
    height: 100%;
  }

  #app {
    height: 100%;
  }
  ons-splitter-side[side=left][animation=overlay] {
    border-right: 1px solid #BBB;
  }
</style>
