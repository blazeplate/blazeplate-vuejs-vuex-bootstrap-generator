// Generator index file
const Generator = require('@codotype/generator');

// // // //

module.exports = class ModulePages extends Generator {

  async write({ blueprint, configuration }) {
    // console.log('WRITING MODULE PAGES')

    // Iterates over each schema in the this.options.build.blueprint.schemas array
    // blueprint.schemas.forEach(async (schema) => {
    for (var i = blueprint.schemas.length - 1; i >= 0; i--) {
      const schema = blueprint.schemas[i]

      // Pulls model options from configuration object
      const schemaOptions = configuration.model_options[schema._id]

      // Defines destination directory for files in this loop
      const moduleRoot =  'src/modules/' + schema.identifier

      await this.ensureDir(moduleRoot + '/pages/list')
      await this.ensureDir(moduleRoot + '/pages/new')
      await this.ensureDir(moduleRoot + '/pages/edit')
      await this.ensureDir(moduleRoot + '/pages/show')

      // client/src/modules/resource/pages/list/index.vue
      await this.copyTemplate(
        this.templatePath('list_page.vue'),
        this.destinationPath(moduleRoot + '/pages/list/index.vue'),
        { schema, schemaOptions }
      )

      // client/src/modules/resource/pages/new/index.vue
      await this.copyTemplate(
        this.templatePath('new_page.vue'),
        this.destinationPath(moduleRoot + '/pages/new/index.vue'),
        { schema }
      )

      // client/src/modules/resource/pages/edit/index.vue
      await this.copyTemplate(
        this.templatePath('edit_page.vue'),
        this.destinationPath(moduleRoot + '/pages/edit/index.vue'),
        { schema }
      )

      // client/src/modules/resource/pages/show/index.vue
      await this.copyTemplate(
        this.templatePath('show_page.vue'),
        this.destinationPath(moduleRoot + '/pages/show/index.vue'),
        { schema }
      )

    // }) // FOR EACH
    } // FOR
    // console.log('WROTE MODULE PAGES')

  }

};
