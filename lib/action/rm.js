const fse = require('fs-extra')
const path = require('path')
const { paths } = require('../helper')
const chalk = require('chalk')
const config = require('../config')

module.exports = function rm(argv) {
  const { entries, all } = argv
  const { cssPreprocessor, jsAsset } = config.get('ezConfig')

  entries.forEach(entry => {
    const dirname = path.dirname(entry)
    const basename = path.basename(entry, '.js')
    const relatedAsset = path.join(
      paths['PATH_ASSETS'],
      jsAsset,
      dirname,
      basename
    )

    if (!dirname || dirname === '.') {
      return console.warn(
        chalk.yellow('Missing module name, ignored this entry\n')
      )
    }
    const fullPath = path.join(paths['PATH_PAGES'], dirname, basename)
    fse.removeSync(fullPath + '.js')
    fse.removeSync(fullPath + '.html')
    fse.removeSync(fullPath + `.${cssPreprocessor}`)

    if (all) {
      fse.rmdirSync(relatedAsset)
    }
  })
}
