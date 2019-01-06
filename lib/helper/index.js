const path = require('path')
const config = require('../config')
const _ = require('lodash')

const PAGE_BASE_PATH = 'src/pages'
const JS_BASE_PATH = 'src/assets'

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
