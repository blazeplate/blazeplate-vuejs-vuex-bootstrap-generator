// Generator index file
const Generator = require('@codotype/generator');

// // // //

module.exports = class ModuleComponents extends Generator {

  async write({ blueprint }) {

    // Iterates over each schema in the blueprint.schemas array
    blueprint.schemas.forEach(async (schema) => {

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
        let related_schema = blueprint.schemas.find(s => s._id === rel.related_schema_id)
        // TODO - add HAS_MANY UI
        if (['BELONGS_TO', 'HAS_ONE'].includes(rel.type)) {
          await this.copyTemplate(
            this.templatePath('belongs-to-component.vue'),
            this.destinationPath(moduleComponentsDest + rel.alias.class_name + '.vue'),
            { schema, related_schema, rel }
          )
        } else if (rel.type === 'HAS_MANY') {
          await this.copyTemplate(
            this.templatePath('owns-many-component.vue'),
            this.destinationPath(moduleComponentsDest + rel.alias.class_name_plural + '.vue'),
            { schema, related_schema, rel }
          )
        } else if (rel.type === 'REF_BELONGS_TO') {
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
