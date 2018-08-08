// Generator index file
var Generator = require('../../util/generator');
var classify = require('underscore.string/classify');

// // // //

module.exports = class VueJsRouter extends Generator {

  // writing to file
  async write() {

    // Iterates over each schema in the this.options.build.app.schemas array
    for (var i = this.options.build.app.schemas.length - 1; i >= 0; i--) {

      // Isolates the individual schema
      let schema = this.options.build.app.schemas[i]

      // client/src/routers/resource.js
      await this.copyTemplate(
        this.templatePath(__dirname, 'router.js'),
        this.destinationPath(this.options.build.dest.vue.src + 'routers/' + schema.identifier + '.js'),
        { schema: schema }
      )

    } // END LOOP

  }

}