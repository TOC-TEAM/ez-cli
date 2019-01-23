'use strict'

const nunjucks = require('nunjucks')
const fse = require('fs-extra')
const ora = require('ora')
const path = require('path')
const pEachSeries = require('p-each-series')
const _ = require('lodash')
const helper = require('../../helper')

nunjucks.configure({ trimBlocks: true, lstripBlocks: true })

module.exports = async function createLibrary(answers) {
  const { template, pkgName, templatePath, git } = answers
  // handle scoped package names
  const parts = pkgName.split('/')
  answers.shortName = parts.pop()

  const toDir = path.join(process.cwd(), answers.shortName)
  answers.toDir = toDir
  // TODO: download boilerplate from remote server
  const fromDir =
    template === 'custom'
      ? path.resolve(process.cwd(), templatePath)
      : path.join(__dirname, '../../../', 'boilerplate', template)
  // make path can contains glob
  const files = await helper.getTargetFiles(fromDir)

  const promise = pEachSeries(files, async file => {
    return copyTemplateFile({
      file,
      fromDir,
      toDir,
      answers,
    })
  })
  ora.promise(
    promise,
    `Copying ${template} template to ${helper.tildify(toDir)}`
  )
  await promise

  // The order of initGit and initPackage is important:
  // husky bind git hooks need git first
  if (git) {
    const promise = helper.initGitRepo({ cwd: toDir })
    ora.promise(promise, 'Initializing git repo')
    await promise
  }

  return toDir
}

async function copyTemplateFile(opts) {
  let pkgObj = null
  const { file, fromDir, toDir, answers } = opts
  const fileRelativePath = path.relative(fromDir, file)
  const toFilePath = path.join(toDir, fileRelativePath)
  const { base, dir } = path.parse(toFilePath)

  if (base === 'package.json') {
    pkgObj = require(file)
    pkgObj = _.merge(pkgObj, helper.getToolConfig(answers.test))
    pkgObj = JSON.stringify(pkgObj, null, 2)
  }
  let content = ''
  const template = nunjucks.compile(pkgObj || fse.readFileSync(file, 'utf8'))
  try {
    content = template.render({
      ...answers,
    })
  } catch (e) {}

  await fse.mkdirp(dir)
  return new Promise((resolve, reject) => {
    fse.writeFile(toFilePath, content, 'utf8', err => {
      if (err) return reject(err)
      resolve()
    })
  })
}
