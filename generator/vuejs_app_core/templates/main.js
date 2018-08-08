// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
<%_ if (options.ui_framework.id === 'bootstrap') { _%>
import BootstrapVue from 'bootstrap-vue' // TODO - conditionally include
<%_ } else if (options.ui_framework.id === 'onsenui') { _%>
import 'onsenui/css/onsenui.css'
import 'onsenui/css/onsen-css-components.css'
import 'onsenui/css/dark-onsen-css-components.css'
import VueOnsen from 'vue-onsenui'
<%_ } _%>
import Vue from 'vue'
import Meta from 'vue-meta'
import App from '@/App'
import router from '@/routers'
import store from '@/store'

// vue-meta
// supports `meta` object returned with `module.defaults`
Vue.use(Meta)

<%_ if (options.ui_framework.id === 'bootstrap') { _%>
// bootstrap-vue
// Bootstrap components and directives
Vue.use(BootstrapVue)
<%_ } else if (options.ui_framework.id === 'onsenui') { _%>
// vue-onsenui
// OnsenUI components and directives
Vue.use(VueOnsen)
<%_ } _%>

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router: router,
  template: '<App/>',
  components: { App }
})
