import UserList from './pages/list'
import UserShow from './pages/show'

const UserListRoute = {
  path: '/users',
  component: UserList
}

const UserShowRoute = {
  path: '/users/:id',
  component: UserShow,
  props: true
}

export default [
  UserListRoute,
  UserShowRoute
]
