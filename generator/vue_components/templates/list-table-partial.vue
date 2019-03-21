<%_ const filteredActions = api_actions.filter(a => ['POST', 'PUT'].includes(a.verb) && a.payload && a.scope === 'MODEL') _%>
<template>
  <table class="table table-hover">

    <%_ filteredActions.forEach((action) => { _%>
    <<%=action.class_name + 'Modal' %> v-if="isAuthenticated" />

    <%_ }) _%>
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
      <%_ if ([RELATION_TYPE_BELONGS_TO, RELATION_TYPE_HAS_ONE].includes(rel.type)) { _%>
      <th><%= rel.alias.label %></th>
      <%_ } else if (rel.type === RELATION_TYPE_HAS_MANY) { _%>
      <th><%= rel.alias.label_plural %></th>
      <%_ } _%>
      <%_ }) _%>
      <th></th>
    </thead>

    <!-- Table Body -->
    <tbody>

      <!-- Empty Table Row -->
      <tr class='table-warning' v-if="!collection[0]">
        <%_ schema.attributes.forEach((attr, indx) => { _%>
        <%_ if (indx === 0) { _%>
        <td>No <%= schema.label_plural %> Available</td>
        <%_ } else { _%>
        <td></td>
        <%_ } _%>
        <%_ }) _%>
        <%_ schema.relations.forEach((rel) => { _%>
        <%_ if ([RELATION_TYPE_BELONGS_TO, RELATION_TYPE_HAS_MANY, RELATION_TYPE_HAS_ONE].includes(rel.type)) { _%>
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
        <%_ } else if (attr.datatype === 'BOOLEAN') { _%>
        <td>
          <span>
            <i class="fas fa-fw fa-check-square" v-if="m.<%=attr.identifier%>"></i>
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
      <%_ if ([RELATION_TYPE_BELONGS_TO, RELATION_TYPE_HAS_ONE].includes(rel.type)) { _%>
        <td v-if="m.<%= rel.alias.identifier %>_id">
          <router-link :to="'/<%= rel.schema.identifier_plural %>/' + m.<%= rel.alias.identifier + '_id' %>">
            {{m.<%= rel.alias.identifier %>.<%= rel.related_lead_attribute %>}}
          </router-link>
        </td>
        <td v-else></td>
      <%_ } else if (rel.type === RELATION_TYPE_HAS_MANY) { _%>
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

          <b-dropdown right size="sm">
            <b-dropdown-item :to=" '/<%= schema.identifier_plural %>/' + m._id">
              <i class="fa fa-fw fa-eye"></i>
              View
            </b-dropdown-item>

            <b-dropdown-item v-if="isAuthenticated" :to=" '/<%= schema.identifier_plural %>/' + m._id + '/edit' ">
              <i class="far fa-fw fa-edit"></i>
              Edit
            </b-dropdown-item>

            <b-dropdown-item v-if="isAdmin" v-b-modal="'modal_' + m._id">
              <i class="far fa-fw fa-trash-alt"></i>
              Delete
            </b-dropdown-item>

            <%_ if (api_actions.filter(a => a.scope === 'MODEL').length) { _%>
            <b-dropdown-divider/>
            <%_ api_actions.filter(a => a.scope === 'MODEL').forEach((action) => { _%>
            <%_ if (action.payload) { _%>
            <b-dropdown-item
              v-if="isAdmin"
              @click="$store.commit('<%= schema.identifier %>/<%= action.uri %>/state', { showingModal: true, scope: m._id, payload: {}})"
            >
              <%= action.label %>
            </b-dropdown-item>

            <%_ } else { _%>
            <b-dropdown-item
              v-if="isAdmin"
              @click="<%= action.function_name %>(m._id)"
            >
              <%= action.label %>
            </b-dropdown-item>

            <%_ } _%>
            <%_ }) _%>
            <%_ } _%>
          </b-dropdown>

          <!-- Bootstrap Modal Component -->
          <b-modal
            lazy
            v-if="isAdmin"
            :id="'modal_' + m._id"
            :title="'Destroy <%= schema.label %>?'"
            @ok="onConfirmDestroy(m._id)"
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
import { mapActions, mapGetters } from 'vuex'
<%_ filteredActions.forEach((action) => { _%>
import <%=action.class_name + 'Modal' %> from '@/modules/<%= schema.identifier %>/components/<%= action.class_name %>Modal'
<%_ }) _%>

export default {
  props: ['collection'],
  components: {
    <%_ filteredActions.forEach((action) => { _%>
    <%=action.class_name + 'Modal' %>,
    <%_ }) _%>
  },
  methods: mapActions({
    <%_ if (api_actions) { _%>
    <%_ api_actions.filter(a => ['POST', 'PUT', 'DELETE'].includes(a.verb) && a.scope === 'MODEL' && !a.payload).forEach((action) => { _%>
    <%= action.function_name %>: '<%= schema.identifier %>/<%= action.function_name %>',
    <%_ }) _%>
    <%_ } _%>
    onConfirmDestroy: '<%= schema.identifier %>/destroy'
  }),
  computed: mapGetters({
    currentUser: 'auth/current_user',
    isAuthenticated: 'auth/is_authenticated',
    isAdmin: 'auth/isAdmin'
  })
}
</script>
