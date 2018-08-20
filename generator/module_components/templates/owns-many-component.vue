
<template>
  <div class="card mb-2">
    <div class="card-header"><%= rel.alias.label_plural %></div>
    <div class="card-body">
      <table class="table table-striped table-hover">

        <!-- Table Header -->
        <thead>
          <%_ related_schema.attributes.forEach((attr) => { _%>
          <%_ if (attr.help) { _%>
          <th>
            <%= attr.label %>
            <i class="fa fa-fw fa-question-circle-o" v-b-tooltip.hover.bottom title="<%= attr.help %>" ></i>
          </th>
          <%_ } else { _%>
          <th><%= attr.label %></th>
          <%_ } _%>
          <%_ }) _%>
          <%_ related_schema.relations.forEach((r) => { _%>
          <%_ if (r.related_schema_id === schema._id) { _%>
          <%_ } else if (r.type === 'BELONGS_TO') {_%>
          <th>
            <%= r.alias.label %>
          </th>
          <%_ } _%>
          <%_ }) _%>
          <th></th>
        </thead>

        <!-- Table Body -->
        <tbody>

          <!-- Empty Table Row -->
          <tr class='tr-warning' v-if="!collection[0]">
            <%_ related_schema.attributes.forEach((attr) => { _%>
            <%_ if (index === '0') { _%>
            <td>Empty</td>
            <%_ } else { _%>
            <td></td>
            <%_ } _%>
            <%_ }) _%>
            <%_ related_schema.relations.forEach((r) => { _%>
            <%_ if (r.type === 'BELONGS_TO') { _%>
            <td></td>
            <%_ } _%>
            <%_ }) _%>
            <td></td>
          </tr>

          <tr v-for="m in collection" :key="m._id">
          <%_ related_schema.attributes.forEach((attr) => { _%>
            <%_ if (attr.unique) { _%>
            <td>
              <a :href=" '#/<%= related_schema.identifier_plural %>/' + m._id ">
                {{ m.<%=attr.identifier%> }}
              </a>
            </td>
            <%_ } else if (attr.datatype === 'BOOL') { _%>
            <td>
              <span>
                <i class="fa fa-fw fa-check-square-o" v-if="m.<%=attr.identifier%>"></i>
                <i class="fa fa-fw fa-square-o" v-if="!m.<%=attr.identifier%>"></i>
              </span>
            </td>
            <%_ } else if (attr.datatype === 'HAS_MANY') { _%>
            <td>
              {{ m.<%=attr.identifier%>.length }}
            </td>
            <%_ } else { _%>
            <td>{{m.<%= attr.identifier %>}}</td>
            <%_ } _%>
          <%_ }) _%>

          <%_ related_schema.relations.forEach((r) => { _%>
            <%_ if (r._id === rel.reverse_relation_id) { return } _%>
            <%_ if (r.type === 'BELONGS_TO') { _%>
            <td>
              <router-link :to="'/<%= r.schema.identifier_plural %>/' + m.<%= r.alias.identifier + '_id' %>">
                {{m.<%= r.alias.identifier %>.<%= r.related_lead_attribute %>}}
              </router-link>
            </td>
            <%_ } _%>
          <%_ }) _%>
            <!-- Edit <%= related_schema.label %>-->
            <td class='text-right'>
              <a class="btn btn-sm btn-outline-primary" :href=" '#/<%= related_schema.identifier_plural %>/' + m._id">
                <i class="fa fa-fw fa-eye"></i>
              </a>

              <a class="btn btn-sm btn-outline-warning" :href=" '#/<%= related_schema.identifier_plural %>/' + m._id + '/edit' ">
                <i class="fa fa-fw fa-pencil"></i>
              </a>

              <button class="btn btn-sm btn-outline-danger" v-b-modal="'modal_' + m._id">
                <i class="fa fa-fw fa-trash"></i>
              </button>

              <!-- Bootstrap Modal Component -->
              <b-modal :id="'modal_' + m._id"
                :title="'Destroy <%= related_schema.label %>?'"
                @ok="onConfirmDestroy(m)"
                ok-variant='danger'
                ok-title='DESTROY'
                cancel-title='Cancel'
              >
                <p class="text-left">Are you sure you want to destroy this <%= related_schema.label %>?</p>
              </b-modal>

            </td>
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
  props: ['collection'],
  methods: mapActions({
    onConfirmDestroy: '<%= related_schema.identifier %>/deleteModel'
  })
}
</script>
