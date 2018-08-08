<template>
  <div class="container">

    <!-- ADD SHOW WIDGET BACK HERE -->
    <<%= schema.label %>ShowWidget :model="model" :fetching="fetching" />

    <div class="row">
      <%_ for (index in schema.relations) { _%>
      <%_ let relation = schema.relations[index] _%>
      <div class="col-lg-12 mt-2">

        <%_ if (relation.type === 'LIST') { _%>
        <<%= relation.name %> :header="'<%= relation.name %>'" :fetching="false" :collection="<%= relation.getter %>" />
        <%_ } else { _%>
        <<%= relation.name %> :header="'<%= relation.name %>'" :fetching="false" :model="<%= relation.getter %>" />
        <%_ } _%>
      </div>
      <%_ } _%>
    </div>

  </div>
</template>
