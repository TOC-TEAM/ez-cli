const path = require('path')
const config = require('../config')
const _ = require('lodash')
const getGitConfigPath = require('git-config-path')
const parseGitConfig = require('parse-git-config')
const which = require('which')
const chalk = require('chalk')
const execa = require('execa')

const cwd = process.cwd()
const PATH_PAGES = path.join(cwd, 'src/pages')
const PATH_ASSETS = path.join(cwd, 'src/assets')

exports.hasYarn = function hasYarn() {
  return which.sync('yarn', { nothrow: true })
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

exports.initGitRepo = async function initGitRepo({ cwd }) {
  return execa.shell(`git init && git add . && git commit -m 'init commit'`, {
    cwd,
  })
}

exports.getToolConfig = function getToolConfig(type) {
  const pkgInfos = {
    ava: require('../../tool-config/ava/package.json'),
    jest: require('../../tool-config/jest/package.json'),
  }
  return pkgInfos[type] || pkgInfos
}

exports.paths = {
  PATH_PAGES,
  PATH_ASSETS,
}
