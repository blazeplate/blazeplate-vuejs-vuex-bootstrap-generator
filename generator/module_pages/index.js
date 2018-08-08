// Generator index file
const { Generator } = require('codotype-generator');

// // // //

module.exports = class VueJsEditContainer extends Generator {

  async write() {

    let vueSrc = this.options.build.dest.client + 'src/modules/'

    // Iterates over each schema in the this.options.build.app.schemas array
    for (var i = this.options.build.app.schemas.length - 1; i >= 0; i--) {

      // Isolates the individual schema
      let schema = this.options.build.app.schemas[i]

      await this.ensureDir(vueSrc + 'containers/' + schema.identifier + '_edit')

      // client/src/containers/resource_edit/index.vue
      await this.copyTemplate(
        this.templatePath(__dirname, 'edit_page.vue'),
        this.destinationPath(vueSrc + schema.identifier + '/pages/edit/index.vue'),
        { schema }
      )

    } // END LOOP

  }

};

