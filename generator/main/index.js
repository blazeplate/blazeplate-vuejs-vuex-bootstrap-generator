module.exports = {
  name: 'Main',
  async write ({ blueprint }) {
    this.renderComponent({ src: 'App.vue', dest: 'src/App.vue' })
    this.renderComponent({ src: 'index.html', dest: 'index.html' })
  }
};
