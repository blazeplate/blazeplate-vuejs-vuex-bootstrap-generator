const _ = require('lodash')
const Generator = require('blazeplate_generator/generators/util/generator')

// // // //

module.exports = class VueJsStore extends Generator {

  async write() {

    let vueSrc = this.options.build.dest.client.src

    // Builds the Vuex store interface for the application
    let storeModules = this.options.build.app.schemas.map(s => s.identifier)

    // Generates /src/store.js
    await this.copyTemplate(
      this.templatePath(__dirname, 'store.js'),
      this.destinationPath(this.options.build.dest.client.src + 'store/index.js'),
      { app: this.options.build.app, storeModules  }
    );

    // Copies the `store/lib` directory
    // Stores REST API helpers & vuex store mixins
    await this.copyDir(
      this.templatePath(__dirname, 'lib'),
      this.destinationPath(this.options.build.dest.client.src + 'store/lib')
    );

    // Builds a Vuex module for each schema
    for (var i = this.options.build.app.schemas.length - 1; i >= 0; i--) {

      // Isolates the individual schema
      let schema = this.options.build.app.schemas[i]

      let newModel = {}
      _.each(schema.attributes, (attr) => {
        if (attr.datatype === 'RELATION' && attr.datatypeOptions.relationType === 'HAS_MANY') {
          newModel[attr.identifier] = []
        } else if (attr.datatype === 'NUMBER') {
          newModel[attr.identifier] = 0
        } else if (attr.datatype === 'JSON') {
          newModel[attr.identifier] = {}
        } else {
          newModel[attr.identifier] = ''
        }
      })

      // Ensures presence of requisite directory
      await this.ensureDir(vueSrc + 'store/' + schema.identifier)

      // client/src/store/resource/actions.js
      await this.copyTemplate(
        this.templatePath(__dirname, 'module/actions.js'),
        this.destinationPath(vueSrc + 'store/' + schema.identifier + '/actions.js'),
        { schema: schema }
      );

      // client/src/store/resource/getters.js
      await this.copyTemplate(
        this.templatePath(__dirname, 'module/getters.js'),
        this.destinationPath(vueSrc + 'store/' + schema.identifier + '/getters.js'),
        { schema: schema }
      );

      // client/src/store/resource/index.js
      await this.copyTemplate(
        this.templatePath(__dirname, 'module/index.js'),
        this.destinationPath(vueSrc + 'store/' + schema.identifier + '/index.js'),
        { schema: schema }
      );

      // client/src/store/resource/constants.js
      // TODO - how can we get newModel to print as a JavaScript object, rather than stringified JSON?
      await this.copyTemplate(
        this.templatePath(__dirname, 'module/constants.js'),
        this.destinationPath(vueSrc + 'store/' + schema.identifier + '/constants.js'),
        { schema: schema, newModel: JSON.stringify(newModel, null, 2) }
      );

      // client/src/store/resource/mutations.js
      await this.copyTemplate(
        this.templatePath(__dirname, 'module/mutations.js'),
        this.destinationPath(vueSrc + 'store/' + schema.identifier + '/mutations.js'),
        { schema: schema }
      );

      // client/src/store/resource/state.js
      await this.copyTemplate(
        this.templatePath(__dirname, 'module/state.js'),
        this.destinationPath(vueSrc + 'store/' + schema.identifier + '/state.js'),
        { schema: schema }
      );

    } // END LOOP

  }

};

