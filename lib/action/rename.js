const path = require('path')
const fse = require('fs-extra')
const globby = require('globby')
const transform = require('../helper/transform-name')
const chalk = require('chalk')
const config = require('../config')
const { paths } = require('../helper')

module.exports = function rename(argv) {
  const { oldname, newname, style, file } = argv
  if (oldname && newname) {
    modifyName(oldname, newname)
  } else if (style) {
    formatName(style, file)
  } else {
    console.log(chalk.red('Invalid arguments.'))
    console.log(
      chalk.blue(
        'Abount the usage of `ez rename`, you can enter: `ez rename --help`'
      )
    )
  }
}

function formatName(style, file = []) {
  const cssPreprocessor = config.get('ezConfig').cssPreprocessor
  let patterns = [`**/*.{js,html,${cssPreprocessor}}`]
  if (file && file.length > 0) {
    patterns = file
  }
  patterns = patterns.map(p => path.join(process.cwd(), p))

  const result = globby.sync(patterns, {
    gitignore: true,
  })
  if (result && result.length > 0) {
    result.forEach(from => {
      const dirname = path.dirname(from)
      const basename = path.basename(from)
      const toBasename = transform[style](basename)
      const to = path.join(dirname, toBasename)
      fse.renameSync(from, to)
      console.log(`${basename}-->${chalk.green(toBasename)}`)
    })
  }
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
