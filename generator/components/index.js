const _ = require('lodash')
const Generator = require('blazeplate_generator/generators/util/generator')

// // // //

module.exports = class VueJsComponents extends Generator {
  async write () {

    let app = this.options.build.app

    // Destination helpers & constants
    let vueSrc = this.options.build.dest.client.src

    // Makes a Page component for each schema
    for (let i = app.schemas.length - 1; i >= 0; i--) {
      let schema = app.schemas[i]
      // Generates /src/pages/{schema.class_name_plural}.vue
      await this.copyTemplate(
        this.templatePath(__dirname, 'PageComponent.vue'),
        this.destinationPath(this.options.build.dest.client.src + '/pages/' + schema.class_name_plural + '.vue'),
        { schema }
      );
    }

  }
}


