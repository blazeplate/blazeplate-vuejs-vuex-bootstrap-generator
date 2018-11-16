
<template>
  <div class="card mb-3">
    <div class="card-body">

      <!-- Bootstrap Modal Component -->
      <b-modal :id="'destroyModal'"
        :title="'Destroy <%= schema.label %>?'"
        @ok="onConfirmDestroy(model)"
        ok-variant='danger'
        ok-title='DESTROY'
        cancel-title='Cancel'
      >
        <p class="text-left">Are you sure you want to destroy this <%= schema.label %>?</p>
      </b-modal>

      <div class="row">
        <div class="col-sm-8">
          <h2>
            {{ header || '<%= schema.label %> Detail' }}
          </h2>
        </div>
        <div class="col-sm-4 text-right">

          <!-- Edit -->
          <b-button size="sm" variant="outline-warning" :to="'/<%= schema.identifier_plural %>/' + model._id + '/edit'">
            <i class="fa fa-fw fa-edit"></i>
          </b-button>

          <!-- Destroy -->
          <b-button size="sm" variant="outline-danger" v-b-modal="'destroyModal'">
            <i class="fa fa-fw fa-trash"></i>
          </b-button>

        </div>
      </div>

      <table class="table" v-if='!fetching'>

        <!-- Table Header -->
        <tbody>
        <%_ schema.attributes.forEach((attr) => { _%>
          <tr>
            <td><%= attr.label %></td>
            <%_ if (attr.datatype === 'STRING_ARRAY') { _%>
            <td>{{model.<%= attr.identifier %>.join(', ')}}</td>
            <%_ } else if (attr.datatype === 'BOOL') { _%>
            <td>
              <span>
                <i class="fa fa-fw fa-check-square" v-if="model.<%= attr.identifier%>"></i>
                <i class="fa fa-fw fa-square" v-if="!model.<%= attr.identifier%>"></i>
              </span>
            </td>
            <%_ } else { _%>
            <td>{{model.<%= attr.identifier %>}}</td>
            <%_ } _%>
          </tr>
        <%_ }) _%>
        <%_ schema.relations.forEach((rel) => { _%>
        <%_ if (['BELONGS_TO', 'HAS_ONE'].includes(rel.type)) { _%>
          <tr>
            <td><%= rel.alias.label %></td>
            <td v-if="model.<%= rel.alias.identifier %>_id">
              <router-link :to="'/<%= rel.schema.identifier_plural %>/' + model.<%= rel.alias.identifier + '_id' %>">
                {{model.<%= rel.alias.identifier %>.<%= rel.related_lead_attribute %>}}
              </router-link>
            </td>
            <td v-else>N/A</td>
          </tr>
        <%_ } else if (['HAS_MANY'].includes(rel.type)) { _%>
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
import { mapActions } from 'vuex'
import Loading from '@/components/Loading'

export default {
  props: ['id', 'model', 'fetching', 'header'],
  name: '<%= schema.class_name %>ShowWidget',
  components: {
    Loading
  },
  methods: mapActions({
    onConfirmDestroy: '<%= schema.identifier %>/deleteModel'
  })
}
</script>
