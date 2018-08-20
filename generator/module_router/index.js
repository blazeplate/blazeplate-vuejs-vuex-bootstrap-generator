// Generator index file
const { Generator } = require('codotype-generator');

// // // //

module.exports = class ModuleRouter extends Generator {
  async write() {

    let vueRoot = this.options.build.dest.client.root

    // Iterates over each schema in the this.options.build.app.schemas array
    this.options.build.app.schemas.forEach(async (schema) => {

      // client/src/routers/resource.js
      await this.copyTemplate(
        this.templatePath(__dirname, 'router.js'),
        this.destinationPath(vueRoot + '/src/modules/' + schema.identifier + '/router.js'),
        { schema: schema }
      )

    })

  }

}