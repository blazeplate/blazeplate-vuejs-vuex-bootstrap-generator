<template>
  <div class='row'>
  <%_ schema.attributes.forEach((attr) => { _%>
    <div class="col-lg-6">
      <div class="form-group">
        <label class='mb-0'>
          <%= attr.label %>
          <%_ if (attr.required) { %><span class='text-danger'>*</span><% } _%>
        </label>
        <%_ if (attr.help) { _%>
        <small class="form-text text-muted mb-2"><%= attr.help %></small>
        <%_ } _%>
      <%_ if (attr.datatype === 'BOOL') { _%>
        <input type="checkbox" v-model="model.<%=attr.identifier%>">
      <%_ } else if (attr.datatype === 'TEXT') { _%>
        <input type="text" class="form-control" placeholder="<%= attr.label %>" v-model="model.<%=attr.identifier%>">
      <%_ } else if (attr.datatype === 'STRING_ARRAY') { _%>
        <InputTag placeholder="<%= attr.label %>" :tags.sync="model.<%=attr.identifier%>"/>
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
    <%_ if (['BELONGS_TO', 'HAS_ONE', 'HAS_MANY'].includes(rel.type)) { _%>
    <div class="col-lg-6">
      <div class="form-group">
        <label class='mb-0'>
          <%= rel.alias.label %>
          <%_ if (rel.required) { %><span class='text-danger'>*</span><% } _%>
        </label>
        <%_ if (rel.type === 'BELONGS_TO') { _%>
        <select type="text" class="form-control" placeholder="<%= rel.alias.label %>" v-model="model.<%=rel.alias.identifier%>_id">
          <option :value="<%=rel.schema.identifier%>._id" v-for="<%= rel.schema.identifier %> in <%= rel.alias.identifier_plural %>">
            {{ <%= rel.schema.identifier %>.<%= rel.related_lead_attribute %> }}
          </option>
        </select>
      <%_ } else if (rel.type === 'HAS_MANY') { _%>
        <select type="text" multiple class="form-control" placeholder="<%= rel.alias.label %>" v-model="model.<%=rel.alias.identifier%>_ids">
          <option :value="<%=rel.schema.identifier%>._id" v-for="<%=rel.schema.identifier%> in <%= rel.alias.identifier_plural %>">{{ <%= rel.schema.identifier %>.<%= rel.related_lead_attribute %> }}</option>
        </select>
      <%_ } else if (rel.type === 'HAS_ONE') { _%>
        <select type="text" class="form-control" placeholder="<%= rel.alias.label %>" v-model="model.<%=rel.alias.identifier%>_id">
          <option :value="<%=rel.schema.identifier%>._id" v-for="<%=rel.schema.identifier%> in <%= rel.alias.identifier_plural %>">{{ <%= rel.schema.identifier %>.<%= rel.related_lead_attribute %> }}</option>
        </select>
      <%_ } _%>
      </div>
    </div>
    <%_ } _%>
    <%_ }) _%>

  </div>
</template>

<!-- // // // //  -->

<script>
import InputTag from 'vue-input-tag'

export default {
  name: '<%= schema.identifier %>_form',
  props: ['model'],
  components: {
    InputTag
  },
  created () {
    <%_ schema.relations.forEach((rel) => { _%>
    <%_ if (rel.type !== 'REF_BELONGS_TO') { _%>
    this.$store.dispatch('<%= rel.schema.identifier %>/fetchCollection')
    <%_ } _%>
    <%_ }) _%>
  },
  computed: {
    <%_ let filteredRelations = schema.relations.filter(r => r.type !== 'REF_BELONGS_TO') _%>
    <%_ filteredRelations.forEach((rel, index) => { _%>
    <%= rel.alias.identifier_plural %> () {
      return this.$store.getters['<%= rel.schema.identifier %>/collection']
    }<%= helpers.trailingComma(filteredRelations, index) %>
    <%_ }) _%>
  }
}
</script>
