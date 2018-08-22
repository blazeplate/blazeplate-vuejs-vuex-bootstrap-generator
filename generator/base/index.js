const { Generator } = require('codotype-generator')

// // // //

module.exports = class VueJsBase extends Generator {
  async write () {
    await this.copyDir(
      this.templatePath(),
      this.destinationPath()
    )
  }
}
