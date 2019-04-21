
module.exports = {
  name: 'ModuleStore',
  async forEachSchema({ blueprint, configuration, schema }) {

    // Isolates API Actions metadata
    let api_actions = configuration.api_actions[schema.identifier] || []

    // Defines the newModel data
    let newModel = this.buildDefault({ schemas: blueprint.schemas, schema: schema })

    // Ensures presence of requisite directory module + store directory
    await this.ensureDir('src/modules/' + schema.identifier)
    await this.ensureDir('src/modules/' + schema.identifier + '/store')

    // src/store/resource/index.js
    await this.renderComponent({
      src: 'index.js',
      dest: 'src/modules/' + schema.identifier + '/store/index.js',
      data: { schema, api_actions }
    });

    // src/store/resource/constants.js
    // TODO - how can we get newModel to print as a JavaScript object, rather than stringified JSON?
    await this.renderComponent({
      src: 'constants.js',
      dest: 'src/modules/' + schema.identifier + '/store/constants.js',
      data: { schema: schema, newModel: JSON.stringify(newModel, null, 2) }
    });

    // Iterates over each relation, creates associatd module
    for (var i = schema.relations.length - 1; i >= 0; i--) {
      let rel = schema.relations[i]

      let pluralization
      if (['BELONGS_TO', 'HAS_ONE'].includes(rel.type)) {
        pluralization = rel.alias.class_name
      } else {
        pluralization =  rel.alias.class_name_plural
      }

      await this.renderComponent({
        src: 'relationModule.js',
        dest: 'src/modules/' + schema.identifier + '/store/related' + pluralization + 'Module.js',
        data: { schema, rel }
      });
    }

  }

};
