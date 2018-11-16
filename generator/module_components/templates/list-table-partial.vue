<template>
  <table class="table table-hover">

    <!-- Table Header -->
    <thead>
      <%_ schema.attributes.forEach((attr) => { _%>
      <%_ if (attr.help) { _%>
      <th>
        <%= attr.label %>
        <i class="fa fa-fw fa-question-circle-o" v-b-tooltip.hover.bottom title="<%= attr.help %>" ></i>
      </th>
      <%_ } else { _%>
      <th><%= attr.label %></th>
      <%_ } _%>
      <%_ }) _%>
      <%_ schema.relations.forEach((rel) => { _%>
      <%_ if (['BELONGS_TO', 'HAS_ONE'].includes(rel.type)) { _%>
      <th><%= rel.alias.label %></th>
      <%_ } else if (rel.type === 'HAS_MANY') { _%>
      <th><%= rel.alias.label_plural %></th>
      <%_ } _%>
      <%_ }) _%>
      <th></th>
    </thead>

    <!-- Table Body -->
    <tbody>

      <!-- Empty Table Row -->
      <tr class='table-warning' v-if="!collection[0]">
        <%_ schema.attributes.forEach((attr, index) => { _%>
        <%_ if (index === 0) { _%>
        <td>Empty</td>
        <%_ } else { _%>
        <td></td>
        <%_ } _%>
        <%_ }) _%>
        <%_ schema.relations.forEach((rel) => { _%>
        <%_ if (['BELONGS_TO', 'HAS_MANY', 'HAS_ONE'].includes(rel.type)) { _%>
        <td></td>
        <%_ } _%>
        <%_ }) _%>
        <td></td>
      </tr>

      <tr v-for="m in collection" :key="m._id">
      <%_ schema.attributes.forEach((attr, index) => { _%>
        <%_ if (attr.unique) { _%>
        <td>
          <router-link :to=" '/<%= schema.identifier_plural %>/' + m._id ">
            {{ m.<%=attr.identifier%> }}
          </router-link>
        </td>
        <%_ } else if (attr.datatype === 'BOOL') { _%>
        <td>
          <span>
            <i class="fa fa-fw fa-check-square-o" v-if="m.<%=attr.identifier%>"></i>
            <i class="fa fa-fw fa-square-o" v-if="!m.<%=attr.identifier%>"></i>
          </span>
        </td>
        <%_ } else if (attr.datatype === 'STRING_ARRAY') { _%>
        <td>{{m.<%= schema.attributes[index].identifier %>.join(', ')}}</td>
        <%_ } else { _%>
        <td>{{m.<%= schema.attributes[index].identifier %>}}</td>
        <%_ } _%>
      <%_ }) _%>
      <%_ schema.relations.forEach((rel) => { _%>
      <%_ if (['BELONGS_TO', 'HAS_ONE'].includes(rel.type)) { _%>
        <td v-if="m.<%= rel.alias.identifier %>_id">
          <router-link :to="'/<%= rel.schema.identifier_plural %>/' + m.<%= rel.alias.identifier + '_id' %>">
            {{m.<%= rel.alias.identifier %>.<%= rel.related_lead_attribute %>}}
          </router-link>
        </td>
        <td v-else></td>
      <%_ } else if (rel.type === 'HAS_MANY') { _%>
        <td v-if="m.<%=rel.alias.identifier %>_ids">
          {{ m.<%=rel.alias.identifier %>_ids.length }} <%=rel.alias.label_plural %>
        </td>
        <td v-else>
          None
        </td>
      <%_ } _%>
      <%_ }) _%>
        <!-- Edit <%= schema.label %>-->
        <td class='text-right'>
          <b-button size="sm" variant="outline-primary" :to=" '/<%= schema.identifier_plural %>/' + m._id">
            <i class="fa fa-fw fa-eye"></i>
          </b-button>

          <b-button size="sm" variant="outline-warning" :to=" '/<%= schema.identifier_plural %>/' + m._id + '/edit' ">
            <i class="fa fa-fw fa-edit"></i>
          </b-button>

          <b-button size="sm" variant="outline-danger" v-b-modal="'modal_' + m._id">
            <i class="fa fa-fw fa-trash"></i>
          </b-button>

          <!-- Bootstrap Modal Component -->
          <b-modal :id="'modal_' + m._id"
            :title="'Destroy <%= schema.label %>?'"
            @ok="onConfirmDestroy(m)"
            ok-variant='danger'
            ok-title='DESTROY'
            cancel-title='Cancel'
          >
            <p class="text-left">Are you sure you want to destroy this <%= schema.label %>?</p>
          </b-modal>

        </td>
      </tr>
    </tbody>

  </table>
</template>

<!-- // // // //  -->

<script>
import { mapActions } from 'vuex'

export default {
  props: ['collection'],
  methods: mapActions({
    onConfirmDestroy: '<%= schema.identifier %>/deleteModel'
  })
}
</script>
