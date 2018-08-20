const generator = require('./generator')

// Invoke generator directly with the ToDo List example
// TODO - this should be removed
new generator({
  // appconfig: require('codotype-generator/examples/todo-list.json'),
  appconfig: require('codotype-generator/examples/grocery-list.json'),
  buildId: 'app_5acfeea85535afdb753d55f7'
}).write()


// NOTE - in-progress generator metadata structure
// QUESTION - should this be encapsulated in package.json? ...probably not
module.exports = {
  name: 'Vue.js + Vue Router + Vuex + Bootstrap Generator',
  keywords: [],
  generator: generator,
  destination_dir: 'vue_bootstrap',
  additional_options: []
}