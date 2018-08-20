const { Generator, Helpers } = require('codotype-generator')

// const menus = require('./menus')
const Base = require('./base')
const Navbar = require('./navbar')
const Router = require('./router')
const Store = require('./store')
const ModuleStore = require('./module_store')
const ModuleRouter = require('./module_router')
const ModulePages = require('./module_pages')
const ModuleComponents = require('./module_components')

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

    // TODO - update the write method to accept commonly used args
    // i.e. `async write ({ app, models, options }) { ... })`
    async write () {
      await this.composeWith(Base)
      await this.composeWith(Navbar)
      await this.composeWith(Store)
      await this.composeWith(Router)
      await this.composeWith(ModuleStore)
      await this.composeWith(ModuleRouter)
      await this.composeWith(ModulePages)
      await this.composeWith(ModuleComponents)
    }
}