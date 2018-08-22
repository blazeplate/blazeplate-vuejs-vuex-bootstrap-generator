const { Generator } = require('codotype-generator')

module.exports = class VueJs extends Generator {
  async write () {
    await this.composeWith('./base')
    await this.composeWith('./navbar')
    await this.composeWith('./router')
    await this.composeWith('./store')
    await this.composeWith('./module_store')
    await this.composeWith('./module_router')
    await this.composeWith('./module_pages')
    await this.composeWith('./module_components')
  }
}