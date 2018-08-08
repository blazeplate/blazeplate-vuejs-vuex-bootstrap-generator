<template>
  <div class='row'>
  <%_ for (index in schema.attributes) { _%>
  <%_ let attr = schema.attributes[index] _%>
  <%_ if (attr.datatype === 'RELATION' && attr.datatypeOptions.relationType === 'OWNS_MANY') continue _%>
    <div class="col-lg-6">
      <div class="form-group">
        <label class='mb-0'>
          <%= attr.label %>
          <% if (attr.required) { %><span class='text-danger'>*</span><% } %>
        </label>
        <small class="form-text text-muted mb-2"><%= attr.help %></small>
      <%_ if (attr.datatype === 'BOOL') { _%>
        <input type="checkbox" class="form-control" v-model="model.<%=attr.identifier%>">
      <%_ } else if (attr.datatype === 'TEXT') { _%>
        <input type="text" class="form-control" placeholder="<%= attr.label %>" v-model="model.<%=attr.identifier%>">
      <%_ } else if (attr.datatype === 'NUMBER') { _%>
        <input type="number" class="form-control" placeholder="<%= attr.label %>" v-model="model.<%=attr.identifier%>">
      <%_ } else if (attr.datatype === 'DATE') { _%>
        <input type="date" class="form-control" placeholder="<%= attr.label %>" v-model="model.<%=attr.identifier%>">
      <%_ } else if (attr.datatype === 'TIME') { _%>
        <input type="time" class="form-control" placeholder="<%= attr.label %>" v-model="model.<%=attr.identifier%>">
      <%_ } else if (attr.datatype === 'DATETIME') { _%>
        <input type="datetime-local" class="form-control" placeholder="<%= attr.label %>" v-model="model.<%=attr.identifier%>">
      <%_ } else if (attr.datatype === 'JSON') { _%>
        <textarea class="form-control" placeholder="<%= attr.label %>" @change="model.<%=attr.identifier%> = JSON.parse($event.target.value)">{{ JSON.stringify(model.<%=attr.identifier%>, null, 2) }}</textarea>
      <%_ } else if (attr.datatype === 'RELATION') { _%>

      <%_ } if (attr.datatypeOptions.relationType === 'BELONGS_TO') { _%>
        <select type="text" class="form-control" placeholder="<%= attr.label %>" v-model="model.<%=attr.identifier%>">
          <option :value="<%=attr.datatypeOptions.schema_identifier%>._id" v-for="<%=attr.datatypeOptions.schema_identifier%> in <%= attr.datatypeOptions.schema_identifier_plural %>">
            {{ <%= attr.datatypeOptions.schema_identifier %>.<%= attr.datatypeOptions.lead_attr %> }}
          </option>
        </select>
      <%_ } else if (attr.datatypeOptions.relationType === 'HAS_MANY') { _%>
        <select type="text" multiple class="form-control" placeholder="<%= attr.label %>" v-model="model.<%=attr.identifier%>">
          <option :value="<%=attr.datatypeOptions.schema_identifier%>._id" v-for="<%=attr.datatypeOptions.schema_identifier%> in <%= attr.datatypeOptions.schema_identifier_plural %>">{{ <%= attr.datatypeOptions.schema_identifier %>.<%= attr.datatypeOptions.lead_attr %> }}</option>
        </select>
      <%_ } _%>
      </div>
    </div>
  <%_ } _%>

  </div>
</template>