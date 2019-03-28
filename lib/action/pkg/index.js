'use strict'

const createLibrary = require('./create-library')
const ask = require('./ask')
const config = require('../../config')
const { log, warn, error, tildify } = require('../../helper')
const ora = require('ora')

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

  let toDir
  const spinner = ora()
  try {
    spinner.start('Creating, please wait a minute...')
    toDir = tildify(await createLibrary(answers))
    spinner.succeed('Created successfully!')
    log(`
Your module has been created at ${toDir}.

  To get started, in one tab, run:
  $ cd ${answers.shortName} && ${answers.manager} start`)
    return toDir
  } catch (e) {
    spinner.fail('Create failed')
    error(e)
  }
}
