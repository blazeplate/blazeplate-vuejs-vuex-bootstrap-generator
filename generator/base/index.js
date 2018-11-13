module.exports = {
  name: 'Base',
  async write () {
    await this.copyDir(
      this.templatePath(),
      this.destinationPath()
    )
  }
}
