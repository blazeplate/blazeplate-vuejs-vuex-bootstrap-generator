// Generator index file
const { Generator } = require('codotype-generator');
var _ = require('lodash');

// // // //

module.exports = class ModuleComponents extends Generator {

  async write() {

    let vueSrc = this.options.build.dest.client.root + 'src/'

    // Iterates over each schema in the this.options.build.app.schemas array
    this.options.build.app.schemas.forEach(async (schema) => {

      // Options sent to each Widget component
      const listWidget = {
        name: `${schema.class_name}ListWidget`,
        type: 'WIDGET_TYPE_LIST',
        schema: schema,
      }

      const showWidget = {
        name: `${schema.class_name}ShowWidget`,
        type: 'WIDGET_TYPE_SHOW',
        schema: schema,
      }

      // Ensures module components directory
      this.ensureDir(vueSrc + 'modules/' + schema.identifier + '/components')

      // client/src/modules/resource/components/ResourceForm.vue
      await this.copyTemplate(
        this.templatePath(__dirname, 'form_component.vue'),
        this.destinationPath(vueSrc + 'modules/' + schema.identifier + '/components/' + schema.class_name + 'Form.vue'),
        { schema }
      )

      // client/src/modules/resource/components/ResourceShowWidget.vue
      await this.copyTemplate(
        this.templatePath(__dirname, 'list-component.vue'),
        this.destinationPath(vueSrc + 'modules/' + schema.identifier + '/components/' + listWidget.name + '.vue'),
        { widget: listWidget }
      );
      // client/src/modules/resource/components/ResourceShowWidget.vue
      // client/src/components/resource_ListWidget.vue
      await this.copyTemplate(
        this.templatePath(__dirname, 'detail-component.vue'),
        this.destinationPath(vueSrc + 'modules/' + schema.identifier + '/components/' + showWidget.name + '.vue'),
        { widget: showWidget }
      );

      // Generate relational components
      schema.relations.forEach(async (rel) => {
        let related_schema = this.options.build.app.schemas.find(s => s._id === rel.related_schema_id)

        if (rel.type === 'BELONGS_TO') {
          await this.copyTemplate(
            this.templatePath(__dirname, 'belongs-to-component.vue'),
            this.destinationPath(vueSrc + 'modules/' + schema.identifier + '/components/' + rel.alias.class_name + '.vue'),
            { schema, related_schema, rel }
          )
        } else if (rel.type === 'OWNS_MANY') {
          await this.copyTemplate(
            this.templatePath(__dirname, 'owns-many-component.vue'),
            this.destinationPath(vueSrc + 'modules/' + schema.identifier + '/components/' + rel.alias.class_name_plural + '.vue'),
            { schema, related_schema, rel }
          )
        }
      })

    })

  }

};

