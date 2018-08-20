<template>
  <div class='row'>
  <%_ schema.attributes.forEach((attr) => { _%>
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
      <%_ } _%>
      </div>
    </div>
    <%_ }) _%>

    <%_ schema.relations.forEach((rel) => { _%>
    <div class="col-lg-6">
      <div class="form-group">
        <label class='mb-0'>
          <%= rel.alias.label %>
          <% if (rel.required) { %><span class='text-danger'>*</span><% } %>
        </label>
        <%_ if (rel.type === 'BELONGS_TO') { _%>
        <select type="text" class="form-control" placeholder="<%= rel.alias.label %>" v-model="model.<%=rel.alias.identifier%>_id">
          <option :value="<%=rel.schema.identifier%>._id" v-for="<%= rel.alias.identifier %> in <%= rel.schema.identifier_plural %>">
            {{ <%= rel.alias.identifier %>.<%= rel.related_lead_attribute %> }}
          </option>
        </select>
      <%_ } else if (rel.type === 'HAS_MANY') { _%>
        <select type="text" multiple class="form-control" placeholder="<%= rel.alias.label %>" v-model="model.<%=rel.alias.identifier%>_ids">
          <option :value="<%=rel.schema.identifier%>._id" v-for="<%=rel.schema.identifier%> in <%= rel.schema.identifier_plural %>">{{ <%= rel.schema.identifier %>.<%= rel.related_lead_attribute %> }}</option>
        </select>
      <%_ } _%>
      </div>
    </div>
    <%_ }) _%>

  </div>
</template>

<!-- // // // //  -->

<script>
// TODO - integrate RelationDropdown & abstract collection logic from this component
import RelationDropdown from '@/components/RelationDropdown'

export default {
  name: '<%= schema.identifier %>_form',
  props: ['model'],
  components: {
    RelationDropdown
  },
  created () {
    <%_ schema.relations.forEach((rel) => { _%>
    this.$store.dispatch('<%= rel.schema.identifier %>/fetchCollection')
    <%_ }) _%>
  },
  computed: {
    <%_ schema.relations.forEach((rel) => { _%>
    <%= rel.schema.identifier_plural %> () {
      return this.$store.getters['<%= rel.schema.identifier %>/collection']
    },
    <%_ }) _%>
  }
}
</script>
