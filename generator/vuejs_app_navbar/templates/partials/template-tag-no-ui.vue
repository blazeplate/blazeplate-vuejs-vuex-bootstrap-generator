<template>
  <header>
    <nav>
      <a href="#/">
        <%=appSchema.label %>
      </a>

      <!-- Navbar Links -->

      <% for (i in headerLinks) { %>
      <a href="<%= headerLinks[i].href %>"><%= headerLinks[i].text %></a>
      <% } %>

      <!-- TODO - render this conditionally -->
      <a href="#/users">Users</a>

      <!-- User Dropdown -->
      <template v-if="isAuthenticated">
        <template slot="button-content">
          {{ currentUser.email }}
        </template>
        <a :href="'#/users/' + currentUser._id">Profile</a>
        <a @click="logout()">Logout</a>
      </template>

      <!-- Register / Login -->
      <template v-else>
        <a href="#/auth/register">Register</a>
        <a href="#/auth/login">Login</a>
      </template>
    </nav>
  </header>
</template>

