<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-12">
        <h2><%= schema.label %> - Edit</h2>
      </div>
    </div>

    <hr>

    <<%= schema.label %>Form :model="model" v-if="model._id && !fetching" />
    <Loading v-else />

    <div class="row">
      <div class="col-lg-12 text-right">

        <a href="#/<%= schema.identifier_plural %>" class="btn btn-outline-dark mr-2">
          <i class="fa fa-fw fa-times mr-1"></i>
          Cancel
        </a>

        <button class="btn btn-outline-success" @click="formSubmit(model)">
          <i class="fa fa-fw fa-plus mr-1"></i>
          Update <%= schema.label %>
        </button>

      </div>
    </div>

  </div>
</template>

