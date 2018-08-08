<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Navbar',
  computed: mapGetters({
    isAuthenticated: 'auth/is_authenticated',
    currentUser: 'auth/current_user'
  }),
  methods: mapActions({
    logout: 'auth/logout'
  })
}
</script>

