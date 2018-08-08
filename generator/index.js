const { Generator, Helpers } = require('codotype-generator')

const Base = require('./base')
const Navbar = require('./navbar')
// const VueAppRouter = require('./vuejs_app_router')
// const VueAppStore = require('./vuejs_app_store')
// const VueAuth = require('./vuejs_auth')
// const VueRouter = require('./vuejs_router')
// const VueStore = require('./vuejs_store')
// const VueFormComponent = require('./vuejs_form_component')
// const VueHomeContainer = require('./vuejs_home_container')
// const VueNewContainer = require('./vuejs_new_container')
// const VueEditContainer = require('./vuejs_edit_container')
// const VueListContainer = require('./vuejs_list_container')
// const VueShowContainer = require('./vuejs_show_container')
// const VueWidgetComponent = require('./vuejs_widget_component')

module.exports = class VueJsGenerator extends Generator {

    // constructor
    // Sets required input parameters
    constructor(options) {

      // Invokes super
      super(options)

      // // // //
      // TODO - abstract this into helpers.js

      // Global build configuration
      let build = {
        dest: {
          id: '',
          root: null,
          out: '',
          client: {}
        }
      }

      // Assigngs build.app from options
      build.app = options['appconfig']

      // Isolates the buildId
      const buildId = options['buildId']
      build.id = buildId

      // // // //
      // Destination helpers & constants
      // TODO - use this.env.cwd & path library, instead of hardcoded relative path
      build.dest.out = './build/' + buildId + '/'
      build.dest.root = build.dest.out + build.app.identifier + '/'

      // TODO - pull CLIENT_DEST outside of generator, should be done automatically
      const CLIENT_DEST = 'vue_bootstrap/'
      build.dest.client.root = build.dest.root + CLIENT_DEST

      //
      // // // //

      // Sets this.options.build
      this.options = { build: Helpers.formatBuild(build) }

      // Returns the generator instance
      return this

    }

    async write () {
        await this.composeWith(Base)
        await this.composeWith(Navbar)
        // await this.composeWith(VueAppRouter)
        // await this.composeWith(VueAppStore)
        // await this.composeWith(VueAuth)
        // await this.composeWith(VueRouter)
        // await this.composeWith(VueStore)
        // await this.composeWith(VueFormComponent)
        // await this.composeWith(VueHomeContainer)
        // await this.composeWith(VueNewContainer)
        // await this.composeWith(VueEditContainer)
        // await this.composeWith(VueListContainer)
        // await this.composeWith(VueShowContainer)
        // await this.composeWith(VueWidgetComponent)
    }
}