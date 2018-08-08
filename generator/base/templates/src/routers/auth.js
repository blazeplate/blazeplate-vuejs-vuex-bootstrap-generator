// Auth Containers
import AuthLogin from '@/containers/auth_login'
import AuthRegister from '@/containers/auth_register'

const AuthLoginRoute = {
  path: '/auth/login',
  component: AuthLogin
}

const AuthRegisterRoute = {
  path: '/auth/register',
  component: AuthRegister
}

export default [
  AuthLoginRoute,
  AuthRegisterRoute
]
