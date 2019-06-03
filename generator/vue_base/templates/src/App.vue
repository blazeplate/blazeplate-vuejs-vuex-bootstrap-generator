<template>
  <div id="app">
    <Navbar/>
    <router-view />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'

export default {
  name: 'app',
  components: {
    Navbar
  },
  created () {
    this.$store.dispatch('auth/fetchProfile') // Authenticates current user on application start
  },
  metaInfo: {
    title: 'Loading...', // set a title
    titleTemplate: '<%= blueprint.label %> - %s', // title is now "<%= blueprint.label %> - Loading..."
    htmlAttrs: {
      lang: 'en'
    }
  }
}
</script>

<style>
  html {
    height: 100%;
  }

  body {
    height: 100%;
  }

  #app {
    height: 100%;
    padding-top: 4.5rem;
  }

  .app {
    height: 100%;
  }
</style>
