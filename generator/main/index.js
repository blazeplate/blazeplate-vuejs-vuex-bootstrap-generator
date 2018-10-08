const Generator = require('@codotype/generator')

// // // //

module.exports = class VueMain extends Generator {
  async write ({ blueprint }) {

    // Generates /src/App.vue
    await this.copyTemplate(
      this.templatePath('App.vue'),
      this.destinationPath('src/App.vue')
    );

    // Generates /index.html
    await this.copyTemplate(
      this.templatePath('index.html'),
      this.destinationPath('index.html')
    );

  }
};
