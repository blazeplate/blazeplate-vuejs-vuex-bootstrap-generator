const _ = require('lodash')
const Generator = require('../../util/generator')

// // // //

module.exports = class VueJsAppStore extends Generator {

  async write() {
    let app = this.options.build.app

    // client/src/store/index.js
    // TODO - move into separate generator class definition
    let storeModules = []
    _.each(app.schemas, (s) => {
      storeModules.push(s.identifier)
    })

    await this.copyTemplate(
      this.templatePath(__dirname, 'index.js'),
      this.destinationPath(this.options.build.dest.vue.src + 'store/index.js'),
      { appSchema: app, storeModules: storeModules.join(",\n    ")  } // TODO - constantize indentation size?
    );

    await this.copyDir(
      this.templatePath(__dirname, 'lib'),
      this.destinationPath(this.options.build.dest.vue.src + 'store/lib')
    );

  }

};

