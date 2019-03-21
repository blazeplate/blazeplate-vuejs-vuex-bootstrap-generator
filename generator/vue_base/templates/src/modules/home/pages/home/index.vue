<template>
  <b-container>
    <b-row class="h-100 align-items-center">
      <b-col lg="12">

        <b-row>
          <b-col lg="12" class="text-center">
            <p class="lead text-muted">This app was built with</p>
          </b-col>
        </b-row>

        <b-row>
          <b-col lg="12" class="text-center">
            <img style="max-width: 4rem !important;" src="<%= meta.icon %>"/>
            <h3 class='display-4'><%= meta.label %></h3>
            <p class="lead text-muted">powered by <a target="_blank" href="https://codotype.org">Codotype</a></p>
          </b-col>
        </b-row>

        <b-row class="my-2">
          <b-col lg="12" class="text-center">
            <p class="lead"><%= meta.description %></p>
          </b-col>
        </b-row>

        <b-row class="my-2">
          <b-col lg="12" class="text-center">
            <p class="lead text-primary"><router-link to="/auth/register">Please register a new account to get started.</router-link></p>
          </b-col>
        </b-row>

        <b-row class="my-4">
          <b-col lg="12" class="text-center">
            <a class="btn btn-lg btn-outline-dark mx-2" href="https://codotype.org" target="_blank">
              <i class="fa fa-book"></i>
              codotype.org
            </a>
          </b-col>
        </b-row>

      </b-col>
    </b-row>
  </b-container>
</template>

<script>
  export default {
    name: 'Home',
    metaInfo: {
      title: 'Home'
    }
  }
</script>
