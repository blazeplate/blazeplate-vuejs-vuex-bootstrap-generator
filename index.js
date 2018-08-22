const Codotype = require('codotype-generator')

// const app = require('codotype-generator/examples/todo-list.json')
const app = require('codotype-generator/examples/library.json')

const build = {
  stages: [{
    project_path: 'web_client', // TODO - pull this from the generator
    generator_path: './generator', // TODO - pull this from codotype-meta.json, potentially refactor this approach?
    configuration: {}, // TODO - this will be populated by the UI
  }]
}

// Invoke runtime directly with parameters
// TODO - this should be removed and replaced by a CLI command in packge.json
// TODO - refactor this so these options are passed into the `execute` method of this instance
const runtime = new Codotype.runtime()

// Executes the build
runtime.execute({ app, build })

// // NOTE - in-progress generator metadata structure
// // QUESTION - should this be encapsulated in package.json? ...probably not
// module.exports = {
//   name: 'Vue.js + Vue Router + Vuex + Bootstrap Generator',
//   keywords: [],
//   generator: generator,
//   destination_dir: 'vue_bootstrap',
//   additional_options: []
// }