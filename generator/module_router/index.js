const Generator = require('@codotype/generator');

// // // //

module.exports = class ModuleRouter extends Generator {
  async write({ blueprint }) {
    // console.log('WRITING MODULE STORE')

    // Iterates over each schema in the this.options.build.blueprint.schemas array
    // blueprint.schemas.forEach(async (schema) => {
    for (var i = blueprint.schemas.length - 1; i >= 0; i--) {
      const schema = blueprint.schemas[i]

      // client/src/routers/resource.js
      await this.copyTemplate(
        this.templatePath('router.js'),
        this.destinationPath('src/modules/' + schema.identifier + '/router.js'),
        { schema }
      )
    // })
    }
    // console.log('WROTE MODULE STORE')
  }
}
