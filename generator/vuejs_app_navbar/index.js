const _ = require('lodash')
const Generator = require('../../util/generator')
const classify = require('underscore.string/classify')

// // // //

module.exports = class VueJsNavbar extends Generator {
  // TODO - remove hard-coded resource schema
  async write () {

    let app = this.options.build.app
    let destinationRoot = this.options.build.dest.root
    let vueSrc = this.options.build.dest.vue.src

    // Isolates relevant options for template
    let { ui_framework } = this.options.build.app.stack
    let options = { ui_framework }

    let headerLinks = []

    function buildHeaderLink (s) {
      headerLinks.push({ text: s.label_plural, href: '#/' + s.identifier_plural })
    }

    // client/src/store/index.js
    _.each(app.schemas, (s) => {
      if (s.identifier !== 'user') {
        buildHeaderLink(s)
      }
    })

    await this.copyTemplate(
      this.templatePath(__dirname, 'Navbar.vue'),
      this.destinationPath(vueSrc + 'components/Navbar.vue'),
      { appSchema: app, headerLinks: headerLinks, options }
    );

  }

};
