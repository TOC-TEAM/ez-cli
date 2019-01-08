const _ = require('lodash')

const conf = jest.genMockFromModule('../config')

conf.data = {}

conf.set = function set(key, value) {
  if (_.isPlainObject(key)) {
    _.merge(this.data, key)
  } else {
    this.data[key] = value
  }
}

conf.get = function get(key, defaultValue = {}) {
  return this.data[key] || defaultValue
}

module.exports = conf
