
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
        await this.renderComponent({
          src: 'list_page.vue',
          dest: moduleRoot + '/pages/' + action.uri + '.vue',
          data: { schema, schemaOptions, api_actions, action }
        })
      })
    }

    // src/modules/resource/pages/list.vue
    await this.renderComponent({
      src: 'list_page.vue',
      dest: moduleRoot + '/pages/list.vue',
      data: { schema, schemaOptions, api_actions, action: false }
    })

    // src/modules/resource/pages/new/index.vue
    await this.renderComponent({
      src: 'new_page.vue',
      dest: moduleRoot + '/pages/new.vue',
      data: { schema }
    })

    // src/modules/resource/pages/edit.vue
    await this.renderComponent({
      src: 'edit_page.vue',
      dest: moduleRoot + '/pages/edit.vue',
      data: { schema }
    })

    // src/modules/resource/pages/show.vue
    await this.renderComponent({
      src: 'show_page.vue',
      dest: moduleRoot + '/pages/show.vue',
      data: { schema }
    })

  }
};
