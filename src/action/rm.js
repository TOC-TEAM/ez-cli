const fse = require('fs-extra')
const path = require('path')

module.exports = function rm(argv, options) {
  const { file, single } = argv
  const map = new Map()
  file.forEach(key => {
    const dir = path.join(process.cwd(), 'src', 'pages', path.dirname(key))
    const basenames = map.get(dir) || []
    basenames.push(path.basename(key, '.js'))
    map.set(dir, basenames)
  })

  for (const [dir, basenames] of map) {
    for (const basename of basenames) {
      fse.removeSync(path.join(dir, basename + '.js'))
      fse.removeSync(path.join(dir, basename + '.scss'))
      fse.removeSync(path.join(dir, basename + '.html'))
    }
  }
}
