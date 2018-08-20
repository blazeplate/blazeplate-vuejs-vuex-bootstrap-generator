const _ = require('lodash')
const { Generator } = require('codotype-generator')

// // // //

module.exports = class VueJsNavbar extends Generator {
  // TODO - remove hard-coded resource schema
  async write () {

    let app = this.options.build.app
    let destinationRoot = this.options.build.dest.root

    let headerLinks = []

    function buildHeaderLink (s) {
      headerLinks.push({ text: s.label_plural, href: '#/' + s.identifier_plural })
    }

    // Generates the header links for each model/schema
    _.each(app.schemas, (s) => { buildHeaderLink(s) })

    await this.copyTemplate(
      this.templatePath(__dirname, 'Navbar.vue'),
      this.destinationPath(this.options.build.dest.client.root + 'src/components/Navbar.vue'),
      { appSchema: app, headerLinks: headerLinks }
    );

  }

};
