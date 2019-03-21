<template>
  <b-navbar toggleable="md" type="light" variant="light" class='footer-bottom'>

    <b-collapse is-nav id="nav_collapse">

      <!-- Navbar Links -->
      <b-navbar-nav class="mr-auto">

        <b-nav-item to="/about">
          <i class="fa fa-lg fa-fw fa-question-circle mr-1"></i>
          About
        </b-nav-item>

        <b-nav-item target="_blank" href="https://github.com/codotype">
          <i class="fab fa-lg fa-fw fa-github text-dark mr-1"></i>
          GitHub
        </b-nav-item>

      </b-navbar-nav>

      <b-navbar-nav class="ml-auto">

        <b-nav-item target="_blank" href="https://codotype.github.io">
          <i class="fa fa-lg fa-book mr-1"></i>
          Documentation
        </b-nav-item>

      </b-navbar-nav>

    </b-collapse>
  </b-navbar>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style scoped>

  .footer-bottom {
    position: fixed
    width: 100%
    bottom: 0
  }

  nav.navbar {
    padding-top: .25rem
    padding-bottom: .25rem
    border-top: 1px solid #d3d3d3
    font-size: .8rem

    .navbar-brand
      letter-spacing: .25rem !important
      font-family: sans-serif
      font-weight: 100
      letter-spacing: 0.1rem
      // text-transform: uppercase
      // font-size: 1.5rem

      strong
        font-weight: 400

      img.logo
        float: left
        margin-right: 0.4rem
        height: 2rem
        display: flex
  }
</style>
