<template>
  <div>
    <h2><%= schema.label %> - Edit</h2>

    <hr>

    <<%= schema.label %>Form :model="model" v-if="model._id && !fetching" />
    <Loading v-else />

    <a href="#/<%= schema.identifier_plural %>">
      <i class="fa fa-fw fa-times mr-1"></i>
      Cancel
    </a>

    <button @click="formSubmit(model)">
      <i class="fa fa-fw fa-plus mr-1"></i>
      Update <%= schema.label %>
    </button>
  </div>
</template>

