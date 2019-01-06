const execa = require('execa')
const omit = require('lodash/omit')

module.exports = function tree(argv) {
  const args = []
  const target = omit(argv, ['_', '$0'])
  Object.keys(target).forEach(key => {
    const value = target[key]
    if (key.length === 1) {
      key = '-' + key
    } else {
      key = '--' + key
    }
    args.push(key, value)
  })

  const { stdout } = execa.sync('tree', args)
  console.log(stdout)
}
