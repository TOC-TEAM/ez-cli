const path = require('path')
const config = require('../config')
const _ = require('lodash')
const getGitConfigPath = require('git-config-path')
const parseGitConfig = require('parse-git-config')
const which = require('which')
const chalk = require('chalk')
const execa = require('execa')
const home = require('os').homedir()
const globby = require('globby')
const fse = require('fs-extra')

const cwd = process.cwd()
const PATH_PAGES = path.join(cwd, 'src/pages')
const PATH_ASSETS = path.join(cwd, 'src/assets')

exports.getPkgBoilerplates = function getPkgBoilerplates() {
  return fse
    .readdirSync(path.join(__dirname, '..', '..', 'boilerplate'))
    .filter(dir => !dir.startsWith('.'))
    .concat('custom')
}

exports.getManager = function getManager() {
  return which.sync('yarn', { nothrow: true }) ? 'yarn' : 'npm'
}

exports.getGitUser = function getGitUser() {
  const defaults = { name: '', email: '' }
  const gitConfigPath = getGitConfigPath('global')
  if (gitConfigPath) {
    return parseGitConfig.sync({ path: gitConfigPath }).user || defaults
  }
  return defaults
}

exports.updateConfig = function updateConfig(key, value) {
  let prev = config.get('ezConfig') || {}

  if (_.isString(key)) {
    prev[key] = value
  }
  if (_.isObject(key)) {
    prev = _.merge(prev, key)
  }
  config.set('ezConfig', prev)
}

exports.log = function log(...args) {
  console.log(chalk.green(...args))
}

exports.warn = function warn(...args) {
  console.warn(chalk.yellow(...args))
}

exports.error = function error(...args) {
  console.error(chalk.red(...args))
}

exports.info = function info(...args) {
  console.log(chalk.blue(...args))
}

exports.initGitRepo = function initGitRepo({ cwd, stdio = 'inherit' }) {
  return execa.shell(`git init && git add . && git commit -m 'init commit'`, {
    cwd,
    stdio,
  })
}

exports.getTestConfig = function getToolConfig(type) {
  const pkgInfos = {
    'ava-default': require('../../test-config/ava-default/package.json'),
    'jest-default': require('../../test-config/jest-default/package.json'),
    'jest-typescript': require('../../test-config/jest-typescript/package.json'),
  }
  return pkgInfos[type] || pkgInfos
}

exports.tildify = function tildify(str) {
  if (!str) return ''
  str = path.normalize(str) + path.sep
  return (str.indexOf(home) === 0
    ? str.replace(home + path.sep, '~' + path.sep)
    : str
  ).slice(0, -1)
}

exports.untildify = function untildify(input) {
  if (typeof input !== 'string') {
    throw new TypeError(`Expected a string, got ${typeof input}`)
  }

  return home ? input.replace(/^~(?=$|\/|\\)/, home) : input
}

exports.getTargetFiles = function getTargetFiles(pattern, options = {}) {
  return globby(
    pattern,
    Object.assign(
      {
        dot: true,
        gitignore: true,
      },
      options
    )
  )
}

exports.isEggProject = function isEggProject() {
  const pkgPath = path.join(process.cwd(), 'package.json')
  if (!fse.existsSync(pkgPath)) return false

  const dependencies = require(pkgPath).dependencies
  return (
    Reflect.has(dependencies, 'egg') && Reflect.has(dependencies, 'egg-scripts')
  )
}

exports.paths = {
  PATH_PAGES,
  PATH_ASSETS,
}
