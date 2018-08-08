
<template>
  <table class="table table-striped table-hover">

    <!-- Table Header -->
    <thead>
    <%_ for (index in widget.schema.attributes) { _%>
    <%_ let attr = widget.schema.attributes[index] _%>
    <%_ if (attr.datatype === 'RELATION' && attr.datatypeOptions.relationType === 'OWNS_MANY') continue _%>
      <%_ if (attr.help) { _%>
      <th>
        <%= attr.label %>
        <i class="fa fa-fw fa-question-circle-o" v-b-tooltip.hover.bottom title="<%= attr.help %>" ></i>
      </th>
      <%_ } else { _%>
      <th><%= attr.label %></th>
      <%_ } _%>
    <%_ } _%>
      <th></th>
    </thead>

    <!-- Table Body -->
    <tbody>

      <!-- Empty Table Row -->
      <tr class='tr-warning' v-if="!collection[0]">
        <%_ for (index in widget.schema.attributes) { _%>
        <%_ if (index === '0') { _%>
        <td>Empty</td>
        <%_ } else { _%>
        <td></td>
        <%_ } _%>
        <%_ } _%>
        <td></td>
      </tr>

      <tr v-for="m in collection" :key="m._id">
      <%_ for (index in widget.schema.attributes) { _%>
      <%_ let attr = widget.schema.attributes[index] _%>
        <%_ if (attr.unique) { _%>
        <td>
          <a :href=" '#/<%= widget.schema.identifier_plural %>/' + m._id ">
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
        <td>{{m.<%= widget.schema.attributes[index].identifier %>}}</td>
        <%_ } _%>
      <%_ } _%>
        <!-- Edit <%= widget.schema.label %>-->
        <td class='text-right'>
          <a class="btn btn-sm btn-outline-primary" :href=" '#/<%= widget.schema.identifier_plural %>/' + m._id">
            <i class="fa fa-fw fa-eye"></i>
          </a>

          <a class="btn btn-sm btn-outline-warning" :href=" '#/<%= widget.schema.identifier_plural %>/' + m._id + '/edit' ">
            <i class="fa fa-fw fa-pencil"></i>
          </a>

          <button class="btn btn-sm btn-outline-danger" v-b-modal="'modal_' + m._id">
            <i class="fa fa-fw fa-trash"></i>
          </button>

          <!-- Bootstrap Modal Component -->
          <b-modal :id="'modal_' + m._id"
            :title="'Destroy <%= widget.schema.label %>?'"
            @ok="onConfirmDestroy(m)"
            header-bg-variant='dark'
            header-text-variant='light'
            body-bg-variant='dark'
            body-text-variant='light'
            footer-bg-variant='danger'
            footer-text-variant='light'
            ok-variant='danger'
            ok-title='DESTROY'
            cancel-title='Cancel'
            cancel-variant='dark'
          >
            <p class="text-left">Are you sure you want to destroy this <%= widget.schema.label %>?</p>
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
    onConfirmDestroy: '<%= widget.schema.identifier %>/deleteModel'
  })
}
</script>
