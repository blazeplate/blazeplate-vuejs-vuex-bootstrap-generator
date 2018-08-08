// Generator index file
var Generator = require('../../util/generator');
var classify = require('underscore.string/classify');
var _ = require('lodash');

// // // //

module.exports = class VueJsShowContainer extends Generator {

  async write() {

    let vueSrc = this.options.build.dest.vue.src

    // Iterates over each schema in the this.options.build.app.schemas array
    for (var i = this.options.build.app.schemas.length - 1; i >= 0; i--) {

      // Isolates the individual schema
      let schema = this.options.build.app.schemas[i]

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

      // client/src/components/resource_ShowWidget.vue
      await this.copyTemplate(
        this.templatePath(__dirname, 'index.vue'),
        this.destinationPath(vueSrc + 'components/' + listWidget.name + '.vue'),
        { widget: listWidget }
      );
      // client/src/components/resource_ListWidget.vue
      await this.copyTemplate(
        this.templatePath(__dirname, 'index.vue'),
        this.destinationPath(vueSrc + 'components/' + showWidget.name + '.vue'),
        { widget: showWidget }
      );

    } // END LOOP

  }

};

