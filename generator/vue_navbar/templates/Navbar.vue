<template>
  <b-navbar toggleable="md" fixed="top" type="light" variant="light">
    <b-navbar-brand to="/">
      <strong><%= blueprint.label %></strong>
    </b-navbar-brand>

    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
    <b-collapse is-nav id="nav_collapse">

      <!-- Navbar Links -->
      <b-navbar-nav class="mr-auto" v-if="isAuthenticated">
        <%_ headerLinks.forEach((link) => { _%>
        <b-nav-item to="<%= link.href %>"><%= link.text %></b-nav-item>
        <%_ }) _%>
      </b-navbar-nav>

      <!-- User Dropdown -->
      <b-navbar-nav class="ml-auto" v-if="isAuthenticated">

        <b-nav-item-dropdown text="Admin" v-if="isAdmin" right>
          <%_ headerLinks.forEach((link) => { _%>
          <b-nav-item to="<%= link.href %>"><%= link.text %></b-nav-item>
          <%_ }) _%>
        </b-nav-item-dropdown>

        <b-nav-item-dropdown right>
          <template slot="button-content">
            {{ currentUser.email }}
          </template>
          <b-dropdown-item :to="'/users/' + currentUser._id">Profile</b-dropdown-item>
          <b-dropdown-item @click="logout()">Logout</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>

      <!-- Loading -->
      <b-navbar-nav class='ml-auto' v-else-if="loading">
        <p class="lead">¯\_(ツ)_/¯</p>
      </b-navbar-nav>

      <!-- Register / Login -->
      <b-navbar-nav class='ml-auto' v-else>
        <b-nav-item to="/auth/register">Register</b-nav-item>
        <b-nav-item to="/auth/login">Login</b-nav-item>
        <b-nav-item to="/auth/forgot_password">Forgot Password</b-nav-item>
      </b-navbar-nav>

    </b-collapse>
  </b-navbar>
</template>

<!-- // // // //  -->

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Navbar',
  computed: mapGetters({
    loading: 'auth/loadingProfile',
    isAuthenticated: 'auth/is_authenticated',
    currentUser: 'auth/current_user',
    isAdmin: 'auth/isAdmin'
  }),
  methods: mapActions({
    logout: 'auth/logout'
  })
}
</script>