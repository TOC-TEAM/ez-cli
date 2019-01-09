const path = require('path')
const config = require('../config')
const _ = require('lodash')

const cwd = process.cwd()
const PATH_PAGES = path.join(cwd, 'src/pages')
const PATH_ASSETS = path.join(cwd, 'src/assets')

exports.getFullPath = function getFullPath(entry = {}) {}

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

exports.paths = {
  PATH_PAGES,
  PATH_ASSETS,
}
