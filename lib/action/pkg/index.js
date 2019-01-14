'use strict'

const createLibrary = require('./create-library')
const ask = require('./ask')
const config = require('../../config')
const { log, warn, tildify } = require('../../helper')

module.exports = async argv => {
  let answers = {}
  if (argv.silent) {
    answers = config.get('pkgConfig')
  } else {
    answers = await ask(argv)
  }
  if (!answers) {
    warn('Not get valid package info, fallback to ask')
    answers = await ask(argv)
  }
  const toDir = tildify(await createLibrary(answers))

  log(`
Your module has been created at ${toDir}.

  To get started, in one tab, run:
  $ cd ${answers.shortName} && ${answers.manager} start`)

  return toDir
}
