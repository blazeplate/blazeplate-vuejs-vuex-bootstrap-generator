// Generator index file
const { Generator } = require('codotype-generator');
var _ = require('lodash');

// // // //

module.exports = class ModuleComponents extends Generator {

  async write({ app }) {

    // Iterates over each schema in the app.schemas array
    app.schemas.forEach(async (schema) => {

      // Destination for module / components directory
      const moduleComponentsDest = 'src/modules/' + schema.identifier + '/components/'

      // Ensures module components directory
      this.ensureDir(moduleComponentsDest)

      // client/src/modules/resource/components/ResourceForm.vue
      await this.copyTemplate(
        this.templatePath('form_component.vue'),
        this.destinationPath(moduleComponentsDest + schema.class_name + 'Form.vue'),
        { schema }
      )

      // client/src/modules/resource/components/ResourceShowWidget.vue
      await this.copyTemplate(
        this.templatePath('list-component.vue'),
        this.destinationPath(moduleComponentsDest + schema.class_name + 'ListWidget.vue'),
        { schema }
      );
      // client/src/modules/resource/components/ResourceShowWidget.vue
      // client/src/components/resource_ListWidget.vue
      await this.copyTemplate(
        this.templatePath('detail-component.vue'),
        this.destinationPath(moduleComponentsDest + schema.class_name + 'ShowWidget.vue'),
        { schema }
      );

      // Generate relational components
      schema.relations.forEach(async (rel) => {
        let related_schema = app.schemas.find(s => s._id === rel.related_schema_id)

        if (rel.type === 'BELONGS_TO') {
          await this.copyTemplate(
            this.templatePath('belongs-to-component.vue'),
            this.destinationPath(moduleComponentsDest + rel.alias.class_name + '.vue'),
            { schema, related_schema, rel }
          )
        } else if (rel.type === 'OWNS_MANY') {
          await this.copyTemplate(
            this.templatePath('owns-many-component.vue'),
            this.destinationPath(moduleComponentsDest + rel.alias.class_name_plural + '.vue'),
            { schema, related_schema, rel }
          )
        }
      })

    })

  }

};

