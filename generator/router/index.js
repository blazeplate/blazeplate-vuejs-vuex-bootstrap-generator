
module.exports = {
  name: 'Router',
  async write ({ blueprint }) {

    // Variables sent to the template
    let routeImports = []
    let routeModules = []

    function buildImport (s) {
      routeImports.push(`import ${ s.class_name }Routes from '@/modules/${ s.identifier }/router'`)
    }

    function buildModule (s) {
      routeModules.push(`...${ s.class_name }Routes`)
    }

    // Defaults
    const defaultModules = [
      { class_name: 'Home', identifier: 'home' },
      { class_name: 'Auth', identifier: 'auth' },
      { class_name: 'User', identifier: 'user' }
    ]

    // TODO - these should all be opt-in
    defaultModules.forEach((m) => {
      buildImport(m)
      buildModule(m)
    })

    // client/src/store/index.js
    // TODO - abstract into separate generator class definition
    blueprint.schemas.forEach((s) => {
      if (s.identifier !== 'user') {
        buildImport(s)
        buildModule(s)
      }
    })

    await this.copyTemplate(
      this.templatePath('router.js'),
      this.destinationPath('src/routers/index.js'),
      {
        routeImports: routeImports.join("\n"),
        routeModules: routeModules.join(",\n    ")
      }
    );

  }
}
