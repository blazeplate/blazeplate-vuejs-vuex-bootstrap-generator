import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import Meta from 'vue-meta'
import App from '@/App'
import router from '@/routers'
import store from '@/store'
import Toasted from 'vue-toasted'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// register Vue toasted plugin
Vue.use(Toasted)
// you can also pass options, check options reference below
// Vue.use(Toasted, Options)

// vue-meta
// supports `meta` object returned with `module.defaults`
Vue.use(Meta)

// bootstrap-vue
// Bootstrap components and directives
Vue.use(BootstrapVue)

Vue.config.productionTip = false

new Vue({
  store,
  router: router,
  render: h => h(App)
}).$mount('#app')
