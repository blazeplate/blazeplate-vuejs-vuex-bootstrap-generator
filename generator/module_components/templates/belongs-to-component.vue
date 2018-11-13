<template>
  <!-- { schema, related_schema, rel } -->
  <div class="card mb-3">
    <div class="card-body">
      <p class="lead"><%= rel.alias.label %></p>
      <table class="table">
        <thead>
          <%_ related_schema.attributes.forEach((attr) => { _%>
          <th><%= attr.label %></th>
          <%_ }) _%>
          <%_ related_schema.relations.forEach((r) => { _%>
          <%_ if (['BELONGS_TO', 'HAS_ONE'].includes(r.type)) { _%>
          <th><%= r.alias.label %></th>
          <%_ } else if (['BELONGS_TO', 'HAS_ONE'].includes(r.type)) { _%>
          <th><%= r.alias.label_plural %></th>
          <%_ } _%>
          <%_ }) _%>

        </thead>
        <tbody>
          <tr>
            <%_ related_schema.attributes.forEach((attr) => { _%>
            <%_ if (attr.datatype === 'STRING_ARRAY') { _%>
            <td>{{model.<%= attr.identifier %>.join(', ')}}</td>
            <%_ } else if (attr.datatype === 'BOOL') { _%>
            <td>
              <span>
                <i class="fa fa-fw fa-check-square-o" v-if="model.<%= attr.identifier%>"></i>
                <i class="fa fa-fw fa-square-o" v-if="!model.<%= attr.identifier%>"></i>
              </span>
            </td>
            <%_ } else { _%>
            <td>{{model.<%= attr.identifier %>}}</td>
            <%_ } _%>
            <%_ }) _%>
            <%_ related_schema.relations.forEach((r) => { _%>
            <%_ if (['BELONGS_TO', 'HAS_ONE'].includes(r.type)) { _%>
            <td>{{model.<%= r.alias.identifier %>.<%= r.related_lead_attribute %>}}</td>
            <%_ } else if (['HAS_MANY'].includes(r.type)) { _%>
            <td>{{model.<%= r.alias.identifier %>_ids.length }} <%= r.alias.label_plural %></td>
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
export default {
  props: ['model']
}
</script>
