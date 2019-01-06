exports.camel = function camel(name) {
  return name.replace(/[_-]+(\w)/g, (_, $1) => ($1 ? $1.toUpperCase() : ''))
}

exports.pascal = function pascal(name) {
  return exports.camel(name).replace(/^[a-z]/, s => (s ? s.toUpperCase() : ''))
}

exports.underscore = function underscore(name) {
  return name
    .replace(/[A-Z]/g, s => (s ? '_' + s : ''))
    .replace(/[-_]+/g, '_')
    .replace(/^_/, '')
    .toLowerCase()
}

exports.hyphen = function hyphen(name) {
  return exports.underscore(name).replace('_', '-')
}
