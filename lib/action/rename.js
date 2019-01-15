const path = require('path')
const fse = require('fs-extra')
const transform = require('../helper/transform-name')
const chalk = require('chalk')
const config = require('../config')
const { paths, getTargetFiles, error, log } = require('../helper')

module.exports = function rename(argv) {
  const { oldname, newname, style, file } = argv
  if (oldname && newname) {
    return modifyName(oldname, newname)
  }
  if (style) {
    return formatName(style, file)
  }

  console.log(chalk.red('Invalid arguments.'))
  console.log(
    chalk.blue(
      'Abount the usage of `ez rename`, you can enter: `ez rename --help`'
    )
  )
}

function formatName(style, file = []) {
  const cssPreprocessor = config.get('ezConfig').cssPreprocessor
  let patterns = [`**/*.{js,html,${cssPreprocessor}}`]
  if (file && file.length > 0) {
    patterns = file
  }
  patterns = patterns.map(p => path.join(process.cwd(), p))
  return getTargetFiles(patterns).then(result => {
    if (!result || result.length < 1) return
    result = result.map(from => {
      return new Promise((resolve, reject) => {
        const dirname = path.dirname(from)
        const basename = path.basename(from)
        const toBasename = transform[style](basename)
        const to = path.join(dirname, toBasename)
        fse.rename(from, to, err => {
          if (err) {
            reject(err)
          } else {
            console.log(`${basename}-->${chalk.blue(toBasename)}`)
            resolve()
          }
        })
      })
    })
    return Promise.all(result)
      .then(() => {
        log('Rename completed')
      })
      .catch(e => error(e))
  })
}

function modifyName(oldname, newname) {
  const oldDir = path.dirname(oldname)
  const newDir = path.dirname(newname)

  if (oldDir !== newDir) {
    // index.js => account/index.js
    newname = path.join(oldDir, newname)
  }

  const basePath = paths['PATH_PAGES']
  const oldFullPath = path.join(basePath, oldname)
  const newFullPath = path.join(basePath, newname)
  const cssPreprocessor = config.get('ezConfig').cssPreprocessor
  ;['.js', '.html', `.${cssPreprocessor}`].forEach(ext => {
    fse.renameSync(
      oldFullPath.replace(/\.js$/, ext),
      newFullPath.replace(/\.js$/, ext)
    )
  })
}
