<%_ const filteredActions = api_actions.filter(a => ['POST', 'PUT'].includes(a.verb) && a.payload && a.scope === 'MODEL') _%>
<template>
  <div class="card mb-3">
    <div class="card-body">
      <%_ filteredActions.forEach((action) => { _%>
      <<%=action.class_name + 'Modal' %> v-if="isAuthenticated" />

      <%_ }) _%>
      <!-- Bootstrap Modal Component -->
      <!-- TODO - abstract into a separate component -->
      <b-modal :id="'destroyModal'"
        :title="'Destroy <%= schema.label %>?'"
        @ok="onConfirmDestroy(model._id)"
        footer-bg-variant='danger'
        ok-variant='danger'
        ok-title='DESTROY'
        cancel-title='Cancel'
        cancel-variant='light'
      >
        <p class="text-left">Are you sure you want to destroy this <%= schema.label %>?</p>
      </b-modal>

      <b-row>
        <div class="col-sm-8">
          <h2>
            <i class="<%= schemaOptions.fontawesome_icon %>"></i>
            {{ header || '<%= schema.label %> Detail' }}
          </h2>
        </div>
        <div class="col-sm-4 text-right">

          <b-dropdown right size="sm">

            <b-dropdown-item v-if="isAuthenticated" :to=" '/<%= schema.identifier_plural %>/' + model._id + '/edit' ">
              <i class="far fa-fw fa-edit"></i>
              Edit
            </b-dropdown-item>

            <b-dropdown-item v-if="isAdmin" v-b-modal="'modal_' + model._id">
              <i class="far fa-fw fa-trash-alt"></i>
              Delete
            </b-dropdown-item>

            <%_ if (api_actions.filter(a => a.scope === 'MODEL').length) { _%>
            <b-dropdown-divider/>
            <%_ api_actions.filter(a => a.scope === 'MODEL').forEach((action) => { _%>
            <%_ if (action.payload) { _%>
            <b-dropdown-item
              v-if="isAdmin"
              @click="$store.commit('<%= schema.identifier %>/<%= action.uri %>/state', { showingModal: true, scope: model._id, payload: {}})"
            >
              <%= action.label %>
            </b-dropdown-item>

            <%_ } else { _%>
            <b-dropdown-item
              v-if="isAdmin"
              @click="<%= action.function_name %>(model._id)"
            >
              <%= action.label %>
            </b-dropdown-item>

            <%_ } _%>
            <%_ }) _%>
            <%_ } _%>
          </b-dropdown>

        </div>
      </b-row>

      <table class="table" v-if='!fetching'>

        <!-- Table Header -->
        <tbody>
        <%_ schema.attributes.forEach((attr) => { _%>
          <tr>
            <td><%= attr.label %></td>
            <%_ if (attr.datatype === 'STRING_ARRAY') { _%>
            <td>{{model.<%= attr.identifier %>.join(', ')}}</td>
            <%_ } else if (attr.datatype === 'BOOLEAN') { _%>
            <td>
              <span>
                <i class="fas fa-fw fa-check-square" v-if="model.<%= attr.identifier%>"></i>
                <i class="fa fa-fw fa-square-o" v-if="!model.<%= attr.identifier%>"></i>
              </span>
            </td>
            <%_ } else { _%>
            <td>{{model.<%= attr.identifier %>}}</td>
            <%_ } _%>
          </tr>
        <%_ }) _%>
        <%_ schema.relations.forEach((rel) => { _%>
        <%_ if ([RELATION_TYPE_BELONGS_TO, RELATION_TYPE_HAS_ONE].includes(rel.type)) { _%>
          <tr>
            <td><%= rel.alias.label %></td>
            <td v-if="model.<%= rel.alias.identifier %>_id">
              <router-link :to="'/<%= rel.schema.identifier_plural %>/' + model.<%= rel.alias.identifier + '_id' %>">
                {{model.<%= rel.alias.identifier %>.<%= rel.related_lead_attribute %>}}
              </router-link>
            </td>
            <td v-else>N/A</td>
          </tr>
        <%_ } else if ([RELATION_TYPE_HAS_MANY].includes(rel.type)) { _%>
          <tr>
            <td><%= rel.alias.label_plural %></td>
            <td>{{model.<%= rel.alias.identifier %>_ids.length }} <%= rel.alias.label_plural %></td>
          </tr>
        <%_ } _%>
        <%_ }) _%>
        </tbody>

      </table>
      <Loading v-else />

    </div>
  </div>
</template>

<!-- // // // //  -->

<script>
import { mapActions, mapGetters } from 'vuex'
<%_ filteredActions.forEach((action) => { _%>
import <%=action.class_name + 'Modal' %> from '@/modules/<%= schema.identifier %>/components/<%= action.class_name %>Modal'
<%_ }) _%>
import Loading from '@/components/Loading'

export default {
  props: ['id', 'model', 'fetching', 'header'],
  name: '<%= schema.class_name %>Detail',
  components: {
    <%_ filteredActions.forEach((action) => { _%>
    <%=action.class_name + 'Modal' %>,
    <%_ }) _%>
    Loading
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
