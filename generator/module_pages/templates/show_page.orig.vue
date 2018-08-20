<template>
  <div class="container">

    <!-- ADD SHOW WIDGET BACK HERE -->
    <<%= schema.label %>ShowWidget :model="model" :fetching="fetching" />

    <div class="row">
      <%_ for (index in schema.relations) { _%>
      <%_ let relation = schema.relations[index] _%>
      <div class="col-lg-12 mt-2">

        <%_ if (relation.type === 'LIST') { _%>
        <<%= relation.name %> :header="'<%= relation.name %>'" :fetching="false" :collection="<%= relation.getter %>" />
        <%_ } else { _%>
        <<%= relation.name %> :header="'<%= relation.name %>'" :fetching="false" :model="<%= relation.getter %>" />
        <%_ } _%>
      </div>
      <%_ } _%>
    </div>

  </div>
</template>

<!-- // // // //  -->

<script>
import { mapGetters, mapActions } from 'vuex'
import Loading from '@/components/Loading'
import <%= schema.class_name %>ShowWidget from '@/modules/<%= schema.identifier %>/components/<%= schema.class_name %>ShowWidget'
// <%_ for (index in schema.relations) { _%>
// import <%= rel.alias.name %> from '@/module/<%= rel.schema.identifier %>'
// <%_ } _%>

export default {
  props: ['id'],
  name: '<%= schema.identifier %>_show',
  metaInfo: {
    title: '<%= schema.label %>s - Show'
  },
  components: {
    // <%_ for (index in schema.relations) { _%>
    // <%= schema.relations[index].name %>,
    // <%_ } _%>
    <%= schema.class_name %>ShowWidget,
    Loading
  },
  created () {
    this.fetch(this.id)
    // <%_ for (index in schema.relations) { _%>
    // this.<%= schema.relations[index].method %>(this.id)
    // <%_ } _%>
  },
  methods: mapActions({
    // <%_ for (index in schema.relations) { _%>
    // <%= schema.relations[index].method %>: '<%= schema.relations[index].module %>/<%= schema.relations[index].action %>',
    // <%_ } _%>
    fetch: '<%= schema.identifier %>/fetchModel',
    onConfirmDestroy: '<%= schema.identifier %>/deleteModel'
  }),
  computed: mapGetters({
    // <%_ for (index in schema.relations) { _%>
    // <%= schema.relations[index].computed %>: '<%= schema.relations[index].module %>/<%= schema.relations[index].getter %>',
    // <%_ } _%>
    model: '<%= schema.identifier %>/model',
    fetching: '<%= schema.identifier %>/fetching'
  })
}
</script>
