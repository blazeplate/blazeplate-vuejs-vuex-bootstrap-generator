
module.exports = {
  name: 'ModulePages',
  async forEachSchema({ blueprint, configuration, schema }) {

    // Pulls model options from configuration object
    const schemaOptions = configuration.ui_option[schema.identifier] || {}

    // Defines destination directory for files in this loop
    const moduleRoot =  'src/modules/' + schema.identifier

    // Isolates API Actions metadata
    let api_actions = configuration.api_actions[schema.identifier] || []
    // if (!api_actions[0]) { api_actions = [] }

    // Ensures existence of pages directory
    await this.ensureDir(moduleRoot + '/pages')

    // Generates API actions pages
    if (api_actions) {
      api_actions.filter(a => a.scope === 'ROOT' && a.verb === 'GET').forEach(async (action) => {

        // TODO - only handles list page at the moment
        // Should expand to handle actions with 'MODEL' scope
        await this.copyTemplate(
          this.templatePath('list_page.vue'),
          this.destinationPath(moduleRoot + '/pages/' + action.uri + '.vue'),
          { schema, schemaOptions, api_actions, action }
        )
      })
    }

    // src/modules/resource/pages/list.vue
    await this.copyTemplate(
      this.templatePath('list_page.vue'),
      this.destinationPath(moduleRoot + '/pages/list.vue'),
      { schema, schemaOptions, api_actions, action: false }
    )

    // src/modules/resource/pages/new/index.vue
    await this.copyTemplate(
      this.templatePath('new_page.vue'),
      this.destinationPath(moduleRoot + '/pages/new.vue'),
      { schema }
    )

    // src/modules/resource/pages/edit.vue
    await this.copyTemplate(
      this.templatePath('edit_page.vue'),
      this.destinationPath(moduleRoot + '/pages/edit.vue'),
      { schema }
    )

    // src/modules/resource/pages/show.vue
    await this.copyTemplate(
      this.templatePath('show_page.vue'),
      this.destinationPath(moduleRoot + '/pages/show.vue'),
      { schema }
    )

  }
};
