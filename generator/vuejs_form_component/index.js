// Generator index file
var Generator = require('../../util/generator');
var classify = require('underscore.string/classify');

// // // //

module.exports = class VueJsFormComponent extends Generator {

  async write() {

    let vueSrc = this.options.build.dest.vue.src

    // Iterates over each schema in the this.options.build.app.schemas array
    for (var i = this.options.build.app.schemas.length - 1; i >= 0; i--) {

      // Isolates the individual schema
      let schema = this.options.build.app.schemas[i]

      // Isolates relevant options for template
      let { ui_framework } = this.options.build.app.stack
      let options = { ui_framework }

      // client/src/components/resource_form.vue
      await this.copyTemplate(
        this.templatePath(__dirname, 'form_component.vue'),
        this.destinationPath(vueSrc + 'components/' + schema.class_name + 'Form.vue'),
        { schema, options }
      )

    } // END LOOP

  }

};

