const _ = require('lodash')
const Generator = require('blazeplate_generator/generators/util/generator')

// // // //

module.exports = class VueJsMenus extends Generator {
  async write () {

    let app = this.options.build.app

    // Destination helpers & constants
    let vueSrc = this.options.build.dest.client.src

    // Variables sent to the template
    let componentImports = []
    let tabs = []
    let menuItems = []

    function buildImport (s) {
      componentImports.push(`import ${ s.class_name_plural } from './pages/${ s.class_name_plural }.vue'`)
    }

    function buildTab (s) {
      tabs.push(
      `{
          label: '${s.label_plural}',
          page: ${s.class_name_plural},
          theme: blue
        }`)
    }

    function buildMenuItem (s) {
      menuItems.push(
      `{
          title: '${s.label_plural}',
          icon: 'ion-edit, material:md-edit'
        }`)
    }

    // Defaults
    const defaultModules = []

    // TODO - these should all be opt-in
    _.each(defaultModules, (m) => {
      buildImport(m)
      buildTab(m)
      buildMenuItem(m)
    })


    // client/src/store/index.js
    // TODO - abstract into separate generator class definition
    _.each(app.schemas, (s) => {
      buildImport(s)
      buildTab(s)
      buildMenuItem(s)
    })

    // Generates /src/AppTabbar.vue
    await this.copyTemplate(
      this.templatePath(__dirname, 'AppTabbar.vue'),
      this.destinationPath(this.options.build.dest.client.src + '/AppTabbar.vue'),
      { app: app, componentImports: componentImports.join("\n"), tabs: tabs, menuItems: menuItems  }
    );

    // Generates /src/pages/Menu.vue
    await this.copyTemplate(
      this.templatePath(__dirname, 'Menu.vue'),
      this.destinationPath(this.options.build.dest.client.src + '/pages/Menu.vue'),
      { app: app, componentImports: componentImports.join("\n"), tabs: tabs, menuItems: menuItems  }
    );

  }
}


