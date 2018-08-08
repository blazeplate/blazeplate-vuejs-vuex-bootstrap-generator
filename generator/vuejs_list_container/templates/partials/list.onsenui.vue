<template>

  <!-- <div class="container"> -->
    <!-- List View -->
    <!-- <div class="row" v-if="!fetching"> -->
      <!-- <div class="col-lg-12"> -->
        <!-- <ListView :collection="collection" /> -->
      <!-- </div> -->
    <!-- </div> -->
    <!-- <Loading v-else /> -->
  <!-- </div> -->

  <v-ons-page>

    <v-ons-button href="#/<%= schema.identifier_plural %>/new">
      <v-ons-icon icon="fa-plus" />
      New <%= schema.label %>
    </v-ons-button>

    <!-- // // // // -->
    <!-- TODO - this should be moved into the vuejs_widget_component generator -->
    <v-ons-list>
      <v-ons-list-header><%= schema.label_plural %></v-ons-list-header>

      <v-ons-list-item v-for="item in collection" :key="item._id">
        <div class="left">
          <v-ons-icon icon="fa-spinner" v-if='item.fetching'></v-ons-icon>
          <v-ons-icon :icon="'fa-' + item.type" v-else-if='item.connected'></v-ons-icon>
          <v-ons-icon icon="fa-circle-o" v-else></v-ons-icon>
        </div>
        <div class="center">
          {{item.label}}
        </div>
        <div class="right">
          <v-ons-switch v-model='item.fetching'></v-ons-switch>
        </div>
      </v-ons-list-item>
    </v-ons-list>
    <!-- // // // // -->

  </v-ons-page>

</template>