// TODO - this should be `blazeplate-generator`
const generator = require('./generator')

// Invoke generator directly with the ToDo List example
new generator({
  appconfig: require('blazeplate_generator/examples/todo-list.json'),
  buildId: 'app_5acfeea85535afdb753d55f7'
}).write()


// NOTE - in-progress generator metadata structure
// QUESTION - should this be encapsulated in package.json? ...probably not
module.exports = {
  name: 'Vue.js + Vuex + OnsenUI Generator',
  keywords: [],
  generator: generator,
  destination_dir: 'vue_bootstrap',
  // TODO - rename `additional_options`
  // QUESTION - should these just reuse the standard blazeplate attribute data structure?
  // ^^ This is a great idea and it enables this to get integrated quickly :)
  additional_options: []
}