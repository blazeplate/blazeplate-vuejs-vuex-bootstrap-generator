// TODO - this file should be moved into a test directory
const CodotypeRuntime = require('@codotype/runtime')

// const blueprint = require('@codotype/blueprints/lib/team-lists.json')
// const blueprint = require('@codotype/blueprints/lib/textbook-library.json')
const blueprint = require('@codotype/blueprints/lib/twitter.json')

// Each stage can accept its own app - this is done to simplify challenges introduc
// TODO - pull `generator_id` from codotype-meta.json, potentially refactor this approach?
// TODO - ensure presence of valid configuration object
const build = {
  blueprint: blueprint,
  stages: [{
    generator_id: 'codotype-generator-vuejs-vuex-bootstrap',
    configuration: {}
  }]
}

// Invoke runtime directly with parameters
const runtime = new CodotypeRuntime()

// Registers this generator via relative path
runtime.registerGenerator({ relative_path: './' })

// Executes the build
runtime.execute({ build })
.then(() => {
  console.log('TEST SUCCESSFUL')
})
