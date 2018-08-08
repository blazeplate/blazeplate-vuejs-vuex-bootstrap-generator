// Generator index file
var Generator = require('../../util/generator');
var classify = require('underscore.string/classify');

// // // //

module.exports = class VueJsListContainer extends Generator {

  async write() {

    let vueSrc = this.options.build.dest.vue.src

    // Iterates over each schema in the this.options.build.app.schemas array
    for (var i = this.options.build.app.schemas.length - 1; i >= 0; i--) {

      // Isolates the individual schema
      let schema = this.options.build.app.schemas[i]

      await this.ensureDir(vueSrc + 'containers/' + schema.identifier + '_list/components')

      // Bootstrap or Onsen?
      const ui_framework = this.options.build.app.stack.ui_framework

      // client/src/containers/resource_list/index.vue
      await this.copyTemplate(
        this.templatePath(__dirname, 'index.vue'),
        this.destinationPath(vueSrc + 'containers/' + schema.identifier + '_list/index.vue'),
        { schema, ui_framework }
      );

    } // END LOOP

  }

};

