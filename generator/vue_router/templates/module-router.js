// <%= schema.class_name %> Containers
import <%= schema.class_name %>List from './pages/list'
<%_ api_actions.filter(a => ['GET'].includes(a.verb) && a.scope === 'ROOT').forEach((action) => { _%>
import <%= schema.class_name %><%= action.class_name %> from './pages/<%= action.uri %>'
<%_ }) _%>
import <%= schema.class_name %>New from './pages/new'
import <%= schema.class_name %>Show from './pages/show'
import <%= schema.class_name %>Edit from './pages/edit'
import Middleware from '@/routers/middleware'

const <%= schema.class_name %>ListRoute = {
  path: '/<%= schema.identifier_plural %>',
  component: <%= schema.class_name %>List,
  beforeEnter: Middleware.requireAuth
}

<%_ api_actions.filter(a => ['GET'].includes(a.verb) && a.scope === 'ROOT').forEach((action) => { _%>
const <%= schema.class_name %><%= action.class_name %>Route = {
  path: '/<%= schema.identifier_plural %>/<%= action.uri %>',
  component: <%= schema.class_name %><%= action.class_name %>,
  beforeEnter: Middleware.requireAuth
}

<%_ }) _%>
const <%= schema.class_name %>NewRoute = {
  path: '/<%= schema.identifier_plural %>/new',
  component: <%= schema.class_name %>New,
  beforeEnter: Middleware.requireAuth
}

const <%= schema.class_name %>ShowRoute = {
  path: '/<%= schema.identifier_plural %>/:id',
  component: <%= schema.class_name %>Show,
  props: true,
  beforeEnter: Middleware.requireAuth
  // beforeEnter: Middleware.requireRole('MENTOR')
}

const <%= schema.class_name %>EditRoute = {
  path: '/<%= schema.identifier_plural %>/:id/edit',
  component: <%= schema.class_name %>Edit,
  props: true,
  beforeEnter: Middleware.requireAuth
}

export default [
  <%= schema.class_name %>ListRoute,
  <%_ api_actions.filter(a => ['GET'].includes(a.verb) && a.scope === 'ROOT').forEach((action) => { _%>
  <%= schema.class_name %><%= action.class_name %>Route,
  <%_ }) _%>
  <%= schema.class_name %>NewRoute,
  <%= schema.class_name %>ShowRoute,
  <%= schema.class_name %>EditRoute
]
