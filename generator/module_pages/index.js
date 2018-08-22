// Generator index file
const { Generator } = require('codotype-generator');

// // // //

module.exports = class ModulePages extends Generator {

  async write({ app }) {

    // Iterates over each schema in the this.options.build.app.schemas array
    app.schemas.forEach(async (schema) => {

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
        { schema }
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

    })

  }

};

