const _ = require('lodash')
const { Generator } = require('codotype-generator');

// // // //

module.exports = class ModuleStore extends Generator {

  async write() {

    let vueRoot = this.options.build.dest.client.root

    // Iterates over each schema in the this.options.build.app.schemas array
    this.options.build.app.schemas.forEach(async (schema) => {

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

      // Ensures presence of requisite directory module + store directory
      await this.ensureDir(vueRoot + 'src/modules/' + schema.identifier)
      await this.ensureDir(vueRoot + 'src/modules/' + schema.identifier + '/store')

      // client/src/store/resource/actions.js
      await this.copyTemplate(
        this.templatePath(__dirname, 'actions.js'),
        this.destinationPath(vueRoot + 'src/modules/' + schema.identifier + '/store/actions.js'),
        { schema: schema }
      );

      // client/src/store/resource/getters.js
      await this.copyTemplate(
        this.templatePath(__dirname, 'getters.js'),
        this.destinationPath(vueRoot + 'src/modules/' + schema.identifier + '/store/getters.js'),
        { schema: schema }
      );

      // client/src/store/resource/index.js
      await this.copyTemplate(
        this.templatePath(__dirname, 'index.js'),
        this.destinationPath(vueRoot + 'src/modules/' + schema.identifier + '/store/index.js'),
        { schema: schema }
      );

      // client/src/store/resource/constants.js
      // TODO - how can we get newModel to print as a JavaScript object, rather than stringified JSON?
      await this.copyTemplate(
        this.templatePath(__dirname, 'constants.js'),
        this.destinationPath(vueRoot + 'src/modules/' + schema.identifier + '/store/constants.js'),
        { schema: schema, newModel: JSON.stringify(newModel, null, 2) }
      );

      // client/src/store/resource/mutations.js
      await this.copyTemplate(
        this.templatePath(__dirname, 'mutations.js'),
        this.destinationPath(vueRoot + 'src/modules/' + schema.identifier + '/store/mutations.js'),
        { schema: schema }
      );

      // client/src/store/resource/state.js
      await this.copyTemplate(
        this.templatePath(__dirname, 'state.js'),
        this.destinationPath(vueRoot + 'src/modules/' + schema.identifier + '/store/state.js'),
        { schema: schema }
      );

    })

  }

};

