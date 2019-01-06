const path = require('path')
const fse = require('fs-extra')
const config = require('../config')

module.exports = function rename(argv) {
  let { oldname, newname } = argv
  const oldDir = path.dirname(oldname)
  const newDir = path.dirname(newname)

  if (oldDir !== newDir) {
    // index.js => account/index.js
    newname = path.join(oldDir, newname)
  }

  const basePath = path.join(process.cwd(), 'src/pages')
  const oldFullPath = path.join(basePath, oldname)
  const newFullPath = path.join(basePath, newname)
  ;['.js', '.html', `.${config.get('ezConfig').cssPreprocessor}`].forEach(
    ext => {
      fse.renameSync(
        oldFullPath.replace(/\.js$/, ext),
        newFullPath.replace(/\.js$/, ext)
      )
    }
  )
}
