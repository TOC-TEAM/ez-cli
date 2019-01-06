import _ from 'lodash'

const data = {}

export default {
  set(key, value) {
    if (_.isPlainObject(key)) {
      _.merge(data, key)
    } else {
      data[key] = value
    }
  },
  get(key, defaultValue) {
    return data[key] || defaultValue
  },
}
