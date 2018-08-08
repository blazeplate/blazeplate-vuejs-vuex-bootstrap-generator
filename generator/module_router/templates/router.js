// <%= schema.class_name %> Containers
import <%= schema.class_name %>List from '@/containers/<%= schema.identifier %>_list'
import <%= schema.class_name %>New from '@/containers/<%= schema.identifier %>_new'
import <%= schema.class_name %>Show from '@/containers/<%= schema.identifier %>_show'
import <%= schema.class_name %>Edit from '@/containers/<%= schema.identifier %>_edit'

const <%= schema.class_name %>ListRoute = {
  path: '/<%= schema.identifier_plural %>',
  component: <%= schema.class_name %>List
}

const <%= schema.class_name %>NewRoute = {
  path: '/<%= schema.identifier_plural %>/new',
  component: <%= schema.class_name %>New
}

const <%= schema.class_name %>ShowRoute = {
  path: '/<%= schema.identifier_plural %>/:id',
  component: <%= schema.class_name %>Show,
  props: true
}

const <%= schema.class_name %>EditRoute = {
  path: '/<%= schema.identifier_plural %>/:id/edit',
  component: <%= schema.class_name %>Edit,
  props: true
}

export default [
  <%= schema.class_name %>ListRoute,
  <%= schema.class_name %>NewRoute,
  <%= schema.class_name %>ShowRoute,
  <%= schema.class_name %>EditRoute
]
