
module.exports = {
  name: 'ModuleComponents',
  async forEachSchema({ blueprint, configuration, schema }) {

    // Pulls model options from configuration object
    const schemaOptions = configuration.ui_option[schema.identifier] || {}

    // Isolates API Actions metadata
    // console.log(configuration)
    let api_actions = configuration.api_actions[schema.identifier] || []

    // Destination for module / components directory
    const moduleComponentsDest = 'src/modules/' + schema.identifier + '/components/'

    // Ensures module components directory
    this.ensureDir(moduleComponentsDest)

    // src/modules/resource/components/ResourceForm.vue
    await this.renderComponent({
      src: 'form_component.vue',
      dest: moduleComponentsDest + schema.class_name + 'Form.vue',
      data: { schema }
    })

    // src/modules/resource/components/ResourceListWidget.vue
    await this.renderComponent({
      src: 'list-component.vue',
      dest: moduleComponentsDest + schema.class_name + 'List.vue',
      data: { schema, schemaOptions, api_actions }
    });

    // src/modules/resource/components/ResourceDetail.vue
    await this.renderComponent({
      src: 'detail-component.vue',
      dest: moduleComponentsDest + schema.class_name + 'Detail.vue',
      data: { schema, schemaOptions, api_actions }
    });

    // Generates API Action modals
    if (api_actions[0]) {
      api_actions.forEach(async (action) => {
        await this.renderComponent({
          src: 'action-modal.vue',
          dest: moduleComponentsDest + action.class_name + 'Modal.vue',
          data: { schema, action }
        })
      })
    }

    // Generate relational components
    // TODO - abstract this into a separate component, maybe
    let rel;
    let related_schema;
    let related_api_actions;
    for (var j = schema.relations.length - 1; j >= 0; j--) {
      // Assign local values
      rel = schema.relations[j]
      related_schema = blueprint.schemas.find(s => s.id === rel.related_schema_id)
      related_api_actions = configuration.api_actions[related_schema.identifier] || []

      // TODO - add HAS_MANY UI
      // TODO - replace these strings with relational constants pulled from @codotype/types
      if (['BELONGS_TO', 'HAS_ONE'].includes(rel.type)) {
        await this.renderComponent({
          src: 'belongs-to-component.vue',
          dest: moduleComponentsDest + 'Related' + rel.alias.class_name + 'Detail.vue',
          data: { schema, related_schema, rel, api_actions: related_api_actions }
        })
      } else if (rel.type === 'HAS_MANY') {
        await this.renderComponent({
          src: 'owns-many-component.vue',
          dest: moduleComponentsDest + 'Related' + rel.alias.class_name_plural + 'List.vue', // TODO - RENAME THIS
          data: { schema, related_schema, rel, api_actions: related_api_actions }
        })
      } else if (rel.type === 'REF_BELONGS_TO') {
        await this.renderComponent({
          src: 'owns-many-component.vue',
          dest: moduleComponentsDest + 'Related' + rel.alias.class_name_plural + 'List.vue', // TODO - RENAME THIS
          data: { schema, related_schema, rel, api_actions: related_api_actions }
        })
      }
    }

  }

};
