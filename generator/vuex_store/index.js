
module.exports = {
  name: 'VuexStore',
  async write({ blueprint }) {

    // src/store/index.js
    await this.renderComponent({
      src: 'index.js',
      dest: 'src/store/index.js',
      data: { storeModules: blueprint.schemas.map(s => s.identifier).join(",\n    ") }
    })

  }
}
