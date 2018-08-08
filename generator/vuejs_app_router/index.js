const _ = require('lodash')
const Generator = require('../../util/generator')

// // // //

module.exports = class VueJsAppRouter extends Generator {
  async write () {

    let app = this.options.build.app

    // Destination helpers & constants
    let destinationRoot = this.options.build.dest.root
    let vueSrc = this.options.build.dest.vue.src

    // Variables sent to the template
    let routeImports = []
    let routeModules = []

    function buildImport (s) {
      routeImports.push(`import ${ s.class_name }Routes from './${ s.identifier }'`)
    }

    function buildModule (s) {
      routeModules.push(`...${ s.class_name }Routes`)
    }

    // Defaults
    const defaultModules = [
      { class_name: 'Main', identifier: 'main' },
      { class_name: 'Auth', identifier: 'auth' },
      { class_name: 'User', identifier: 'user' }
    ]

    // TODO - these should all be opt-in
    _.each(defaultModules, (m) => {
      buildImport(m)
      buildModule(m)
    })


    // client/src/store/index.js
    // TODO - abstract into separate generator class definition
    _.each(app.schemas, (s) => {
      if (s.identifier !== 'user') {
        buildImport(s)
        buildModule(s)
      }
    })

    await this.copyTemplate(
      this.templatePath(__dirname, 'router.js'),
      this.destinationPath(vueSrc + 'routers/index.js'),
      { appSchema: app, routeImports: routeImports.join("\n"), routeModules: routeModules.join(",\n    ")  }
    );

  }

};
