<template>
  <div class="container h-100">
    <div class="row d-flex justify-content-center">
      <div class="col-lg-4">

        <Loading v-if="fetching" />
        <div class="card card-body" v-else>
          <h4 class="card-title">Register</h4>
          <form>
            <fieldset>
              <FormInput v-model="register_user.name" label='Name' placeholder='Name'/>
              <FormInput v-model="register_user.email" label='Email' placeholder='Email'/>
              <FormInput v-model="register_user.username"  label='Username' placeholder='Username'/>
              <FormInput v-model="register_user.password" label='Password' placeholder='Password' type='password'/>
              <FormInput v-model="register_user.passwordverify" label='Confirm Password' placeholder='Confirm Password' type='password'/>

              <button class="btn btn-outline-success btn-block" @click="register()">
                <i class="fa fa-check mr-2"></i>
                Register
              </button>

              <p v-if="register_user.error" class="error">Bad registration information</p>

            </fieldset>
          </form>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import Loading from '@/components/Loading'
import FormInput from '@/components/FormInput'
import FormSubmit from '@/components/FormSubmit'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'auth_register',
  metaInfo: {
    title: 'Auth - Register'
  },
  components: {
    Loading,
    FormInput,
    FormSubmit
  },
  computed: mapGetters({
    fetching: 'auth/logging_in',
    register_user: 'auth/register_user'
  }),
  methods: mapActions({
    register: 'auth/register'
  })
}
</script>
