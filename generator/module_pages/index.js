// Generator index file
const { Generator } = require('codotype-generator');

// // // //

module.exports = class ModulePages extends Generator {

  async write() {

    let vueSrc = this.options.build.dest.client.root + 'src/modules/'

    // Iterates over each schema in the this.options.build.app.schemas array
    this.options.build.app.schemas.forEach(async (schema) => {

      await this.ensureDir(vueSrc + schema.identifier + '/pages/list')
      await this.ensureDir(vueSrc + schema.identifier + '/pages/new')
      await this.ensureDir(vueSrc + schema.identifier + '/pages/edit')
      await this.ensureDir(vueSrc + schema.identifier + '/pages/show')

      // client/src/modules/resource/pages/list/index.vue
      await this.copyTemplate(
        this.templatePath(__dirname, 'list_page.vue'),
        this.destinationPath(vueSrc + schema.identifier + '/pages/list/index.vue'),
        { schema }
      )

      // client/src/modules/resource/pages/new/index.vue
      await this.copyTemplate(
        this.templatePath(__dirname, 'new_page.vue'),
        this.destinationPath(vueSrc + schema.identifier + '/pages/new/index.vue'),
        { schema }
      )

      // client/src/modules/resource/pages/edit/index.vue
      await this.copyTemplate(
        this.templatePath(__dirname, 'edit_page.vue'),
        this.destinationPath(vueSrc + schema.identifier + '/pages/edit/index.vue'),
        { schema }
      )

      // client/src/modules/resource/pages/show/index.vue
      await this.copyTemplate(
        this.templatePath(__dirname, 'show_page.vue'),
        this.destinationPath(vueSrc + schema.identifier + '/pages/show/index.vue'),
        { schema }
      )

    })

  }

};

