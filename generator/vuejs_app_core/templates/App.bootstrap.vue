
<template>
  <div id="app">
    <AppNavbar/>
    <router-view/>
    <Notification/>
  </div>
</template>

<script>
import AppNavbar from '@/components/Navbar'
import Notification from '@/containers/app_notification'

export default {
  name: 'app',

  // Top-Level Application Components
  components: {
    AppNavbar,
    Notification
  },

  created () {
    // Authenticates current user on application start
    this.$store.dispatch('auth/fetchUserProfile')
  },

  // Top-Level page Meta
  metaInfo: {
    title: 'Loading...', // set a title
    titleTemplate: 'Blazeplate - %s', // title is now "Blazeplate - Loading..."
    htmlAttrs: {
      lang: 'en'
    }
  }
}
</script>

<style lang="sass">
  @import "./sass/vendor.sass"

  html
    height: 100%

  body
    height: 100%

  .container-fluid, .container
    // height: 100%
    padding-top: 4.5rem

  #app
    height: 100%

</style>
