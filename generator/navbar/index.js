const _ = require('lodash')
const { Generator } = require('codotype-generator')

// // // //

module.exports = class VueJsNavbar extends Generator {
  async write ({ app }) {

    let headerLinks = []

    function buildHeaderLink (s) {
      headerLinks.push({ text: s.label_plural, href: '#/' + s.identifier_plural })
    }

    // Generates the header links for each model/schema
    _.each(app.schemas, (s) => { buildHeaderLink(s) })

    await this.copyTemplate(
      this.templatePath('Navbar.vue'),
      this.destinationPath('src/components/Navbar.vue'),
      { headerLinks: headerLinks }
    );
  }

};
