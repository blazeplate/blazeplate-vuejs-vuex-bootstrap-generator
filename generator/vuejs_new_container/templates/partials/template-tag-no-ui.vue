<template>
  <div>

    <h2><%= schema.label %> - New</h2>

    <hr>

    <<%= schema.label %>Form :model="model" />

    <a href="#/<%= schema.identifier_plural %>">
      <i class="fa fa-fw fa-times mr-1"></i>
      Cancel
    </a>

    <button @click="formSubmit(model)">
      <i class="fa fa-fw fa-plus mr-1"></i>
      Create <%= schema.label %>
    </button>

  </div>
</template>
