<template>
  <div>

    <!-- ADD SHOW WIDGET BACK HERE -->
    <<%= schema.label %>ShowWidget :model="model" :fetching="fetching" />

    <%_ for (index in schema.relations) { _%>
    <%_ let relation = schema.relations[index] _%>
    <%_ if (relation.type === 'LIST') { _%>
    <<%= relation.name %> :header="'<%= relation.name %>'" :fetching="false" :collection="<%= relation.getter %>" />
    <%_ } else { _%>
    <<%= relation.name %> :header="'<%= relation.name %>'" :fetching="false" :model="<%= relation.getter %>" />
    <%_ } _%>
    <%_ } _%>

  </div>
</template>
