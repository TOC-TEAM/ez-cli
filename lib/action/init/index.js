const ask = require('./ask')
const request = require('../../helper/request')
const { untildify, log, error, warn } = require('../../helper')

module.exports = async function init(argv) {
  const { boilerplate, branch, dir } = await ask(argv)
  try {
    await request.download({
      repository: boilerplate,
      branch,
      destination: untildify(dir),
    })
    log(`Success: ${boilerplate} has download to ${dir}`)
  } catch (e) {
    error(e)
    if (e.message && e.message.includes('status 128')) {
      warn('Permission denied, you can try it as root permission!')
    }
  }
}
