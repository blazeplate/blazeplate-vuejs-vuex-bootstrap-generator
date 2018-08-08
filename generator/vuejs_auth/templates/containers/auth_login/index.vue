<template>
  <div class="container h-100">
    <div class="row d-flex justify-content-center">
      <div class="col-lg-4">
        <Loading v-if="fetching" />
        <div class="card card-body" v-else>
          <h4 class="card-title">Sign In</h4>
          <fieldset>

              <div class="form-group">
                <input class="form-control" placeholder="E-mail" v-model="login_user.username" type="text">
              </div>

              <div class="form-group">
                <input class="form-control" placeholder="Password" v-model="login_user.password" type="password" value="">
              </div>

              <button class="btn btn-outline-success btn-block" @click="login()">
                <i class="fa fa-check mr-2"></i>
                Login
              </button>

          </fieldset>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FormInput from '@/components/FormInput'
import Loading from '@/components/Loading'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'auth_login',
  metaInfo: {
    title: 'Auth - Login'
  },
  components: {
    FormInput,
    Loading
  },
  computed: mapGetters({
    login_user: 'auth/login_user',
    fetching: 'auth/logging_in'
  }),
  methods: mapActions({
    login: 'auth/login'
  })
}
</script>
