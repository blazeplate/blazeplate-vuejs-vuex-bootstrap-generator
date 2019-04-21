module.exports = {
  name: 'ModuleRouter',
  async write({ blueprint, configuration }) {

    // Variables sent to the template
    let routeImports = []
    let routeModules = []

    function buildImport (s) {
      routeImports.push(`import ${ s.class_name }Routes from '@/modules/${ s.identifier }/router'`)
    }

    function buildModule (s) {
      routeModules.push(`...${ s.class_name }Routes`)
    }

    // Defaults module imports
    const defaultModules = [
      { class_name: 'Home', identifier: 'home' },
      { class_name: 'Auth', identifier: 'auth' }
    ]

    // TODO - these should all be opt-in (??)
    defaultModules.forEach((m) => {
      buildImport(m)
      buildModule(m)
    })

    // src/store/index.js
    blueprint.schemas.forEach((s) => {
      buildImport(s)
      buildModule(s)
    })

    // Renders the src/routers/index.js
    await this.renderComponent({
      src: 'router.js',
      dest: 'src/routers/index.js',
      data: {
        routeImports: routeImports.join("\n"),
        routeModules: routeModules.join(",\n    ")
      }
    });
  },
  async forEachSchema({ schema, configuration }) {
    // Isolates API Actions metadata
    let api_actions = configuration.api_actions[schema.identifier] || []

    // src/routers/resource.js
    await this.renderComponent({
      src: 'module-router.js',
      dest: 'src/modules/' + schema.identifier + '/router.js',
      data: { schema, api_actions }
    })
  }
}
