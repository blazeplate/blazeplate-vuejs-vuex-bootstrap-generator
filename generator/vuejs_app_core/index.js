const Generator = require('../../util/generator')

// // // //

module.exports = class VueJsCore extends Generator {
  async write () {

    let { ui_framework } = this.options.build.app.stack
    let options = { ui_framework }

    // web_client/package.json
    await this.copyTemplate(
      this.templatePath(__dirname, 'package.json'),
      this.destinationPath(this.options.build.dest.vue.root + 'package.json'),
      { options }
    );

    // web_client/src/main.js
    await this.copyTemplate(
      this.templatePath(__dirname, 'main.js'),
      this.destinationPath(this.options.build.dest.vue.src + 'main.js'),
      { options }
    );

    // Bootstrap or Onsen?
    let appTemplate = `App.${options.ui_framework.id}.vue`

    // web_client/src/App.vue
    await this.copyTemplate(
      this.templatePath(__dirname, appTemplate),
      this.destinationPath(this.options.build.dest.vue.src + 'App.vue'),
      { }
    );

  }
}

