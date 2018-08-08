const _ = require('lodash')
const Generator = require('../../util/generator');
const classify = require('underscore.string/classify');

// // // //

module.exports = class VueJsStore extends Generator {

  async write() {

    let vueSrc = this.options.build.dest.vue.src

    // Iterates over each schema in the this.options.build.app.schemas array
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
        this.templatePath(__dirname, 'actions.js'),
        this.destinationPath(vueSrc + 'store/' + schema.identifier + '/actions.js'),
        { schema: schema }
      );

      // client/src/store/resource/getters.js
      await this.copyTemplate(
        this.templatePath(__dirname, 'getters.js'),
        this.destinationPath(vueSrc + 'store/' + schema.identifier + '/getters.js'),
        { schema: schema }
      );

      // client/src/store/resource/index.js
      await this.copyTemplate(
        this.templatePath(__dirname, 'index.js'),
        this.destinationPath(vueSrc + 'store/' + schema.identifier + '/index.js'),
        { schema: schema }
      );

      // client/src/store/resource/constants.js
      // TODO - how can we get newModel to print as a JavaScript object, rather than stringified JSON?
      await this.copyTemplate(
        this.templatePath(__dirname, 'constants.js'),
        this.destinationPath(vueSrc + 'store/' + schema.identifier + '/constants.js'),
        { schema: schema, newModel: JSON.stringify(newModel, null, 2) }
      );

      // client/src/store/resource/mutations.js
      await this.copyTemplate(
        this.templatePath(__dirname, 'mutations.js'),
        this.destinationPath(vueSrc + 'store/' + schema.identifier + '/mutations.js'),
        { schema: schema }
      );

      // client/src/store/resource/state.js
      await this.copyTemplate(
        this.templatePath(__dirname, 'state.js'),
        this.destinationPath(vueSrc + 'store/' + schema.identifier + '/state.js'),
        { schema: schema }
      );

    } // END LOOP

  }

};

