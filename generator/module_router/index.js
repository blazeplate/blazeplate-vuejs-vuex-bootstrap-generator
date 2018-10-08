const Generator = require('@codotype/generator');

// // // //

module.exports = class ModuleRouter extends Generator {
  async write({ blueprint }) {
    // Iterates over each schema in the this.options.build.blueprint.schemas array
    blueprint.schemas.forEach(async (schema) => {
      // client/src/routers/resource.js
      await this.copyTemplate(
        this.templatePath('router.js'),
        this.destinationPath('src/modules/' + schema.identifier + '/router.js'),
        { schema }
      )
    })
  }
}
