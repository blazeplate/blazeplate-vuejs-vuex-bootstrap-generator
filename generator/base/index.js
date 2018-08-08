const Generator = require('blazeplate_generator/generators/util/generator')

// // // //

module.exports = class VueJsBase extends Generator {
  async write () {

    await this.ensureDir(this.options.build.dest.client.root)

    await this.copyDir(
      __dirname + '/templates',
      this.options.build.dest.client.root
    )

  }
}

