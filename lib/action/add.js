const fse = require('fs-extra')
const path = require('path')
const config = require('../config')
const { updateConfig, paths } = require('../helper')

module.exports = function add(argv) {
  const { entries, only, css } = argv
  const { jsAsset } = config.get('ezConfig')
  const keys = Object.keys(argv)
  const cssPreprocessor =
    keys.find(
      key =>
        ['scss', 'stylus', 'styl', 'less'].includes(key) && argv[key] === true
    ) || css

  updateConfig('cssPreprocessor', cssPreprocessor)
  /**
   * { '/path/src/pages/account': ['index.js', 'login.js'] }
   */
  const map = new Map()
  entries.forEach(key => {
    const dir = path.dirname(key)
    const fullPath = path.join(paths['PATH_PAGES'], dir)
    const values = map.get(fullPath) || []
    values.push({
      basename: path.basename(key, '.js'),
      dir,
    })
    map.set(fullPath, values)
  })

  for (const [fullPath, values] of map) {
    for (const info of values) {
      fse.createFileSync(path.join(fullPath, info.basename + '.js'))
      fse.createFileSync(
        path.join(fullPath, info.basename + `.${cssPreprocessor}`)
      )
      fse.createFileSync(path.join(fullPath, info.basename + '.html'))

      if (!only) {
        fse.mkdirpSync(
          path.join(paths['PATH_ASSETS'], jsAsset, info.dir, info.basename)
        )
      }
    }
  }
}
