<template>
  <!-- { schema, related_schema, rel } -->
  <div class="card mb-2">
    <div class="card-header"><%= rel.alias.label %></div>
    <div class="card-body">
      <table class="table">
        <thead>
          <%_ related_schema.attributes.forEach((attr) => { _%>
          <th><%= attr.label %></th>
          <%_ }) _%>
          <%_ related_schema.relations.forEach((r) => { _%>
          <%_ if (r.type === 'BELONGS_TO') { _%>
          <th><%= r.alias.label %></th>
          <%_ } _%>
          <%_ }) _%>
        </thead>
        <tbody>
          <tr>
            <%_ related_schema.attributes.forEach((attr) => { _%>
            <td>{{ model.<%= attr.identifier %>}}</td>
            <%_ }) _%>
            <%_ related_schema.relations.forEach((r) => { _%>
            <%_ if (r.type === 'BELONGS_TO') { _%>
            <td>{{ model.<%= r.alias.identifier %>}}</td>
            <%_ } _%>
            <%_ }) _%>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<!-- // // // //  -->

<script>
import { mapActions } from 'vuex'

export default {
  props: ['model']
}
</script>
