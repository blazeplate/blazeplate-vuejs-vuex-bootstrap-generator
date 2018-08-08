const _ = require('lodash')
const Generator = require('../../util/generator')

// // // //

module.exports = class VueJsAuth extends Generator {

  async write() {
    let app = this.options.build.app

    await this.copyDir(
      this.templatePath(__dirname, 'store'),
      this.destinationPath(this.options.build.dest.vue.src + 'store')
    );

    await this.copyDir(
      this.templatePath(__dirname, 'containers'),
      this.destinationPath(this.options.build.dest.vue.src + 'containers')
    );

  }

};

