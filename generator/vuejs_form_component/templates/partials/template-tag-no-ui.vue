<template>
  <div>
  <%_ for (index in schema.attributes) { _%>
  <%_ let attr = schema.attributes[index] _%>
  <%_ if (attr.datatype === 'RELATION' && attr.datatypeOptions.relationType === 'OWNS_MANY') continue _%>
    <div>
      <label>
        <%= attr.label %>
        <% if (attr.required) { %><span class='text-danger'>*</span><% } %>
      </label>
      <small><%= attr.help %></small>
    <%_ if (attr.datatype === 'BOOL') { _%>
      <input type="checkbox" v-model="model.<%=attr.identifier%>">
    <%_ } else if (attr.datatype === 'TEXT') { _%>
      <input type="text" placeholder="<%= attr.label %>" v-model="model.<%=attr.identifier%>">
    <%_ } else if (attr.datatype === 'NUMBER') { _%>
      <input type="number" placeholder="<%= attr.label %>" v-model="model.<%=attr.identifier%>">
    <%_ } else if (attr.datatype === 'DATE') { _%>
      <input type="date" placeholder="<%= attr.label %>" v-model="model.<%=attr.identifier%>">
    <%_ } else if (attr.datatype === 'TIME') { _%>
      <input type="time" placeholder="<%= attr.label %>" v-model="model.<%=attr.identifier%>">
    <%_ } else if (attr.datatype === 'DATETIME') { _%>
      <input type="datetime-local" placeholder="<%= attr.label %>" v-model="model.<%=attr.identifier%>">
    <%_ } else if (attr.datatype === 'RELATION') { _%>

    <%_ } if (attr.datatypeOptions.relationType === 'BELONGS_TO') { _%>
      <select type="text" placeholder="<%= attr.label %>" v-model="model.<%=attr.identifier%>">
        <option :value="<%=attr.datatypeOptions.schema_identifier%>._id" v-for="<%=attr.datatypeOptions.schema_identifier%> in <%= attr.datatypeOptions.schema_identifier_plural %>">
          {{ <%= attr.datatypeOptions.schema_identifier %>.<%= attr.datatypeOptions.lead_attr %> }}
        </option>
      </select>
    <%_ } else if (attr.datatypeOptions.relationType === 'HAS_MANY') { _%>
      <select type="text" multiple placeholder="<%= attr.label %>" v-model="model.<%=attr.identifier%>">
        <option :value="<%=attr.datatypeOptions.schema_identifier%>._id" v-for="<%=attr.datatypeOptions.schema_identifier%> in <%= attr.datatypeOptions.schema_identifier_plural %>">{{ <%= attr.datatypeOptions.schema_identifier %>.<%= attr.datatypeOptions.lead_attr %> }}</option>
      </select>
    <%_ } _%>
    </div>
  <%_ } _%>
  </div>
</template>