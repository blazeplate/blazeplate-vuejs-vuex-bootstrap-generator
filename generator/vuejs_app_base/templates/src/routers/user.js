// User Containers
import UserList from '@/containers/user_list'
import UserShow from '@/containers/user_show'

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
