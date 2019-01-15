const ask = require('./ask')
const { download } = require('../../helper/request')
const { untildify, log, error, warn } = require('../../helper')

module.exports = async function init(argv) {
  const { boilerplate, branch, dir } = await ask(argv)
  try {
    await download({ repository: boilerplate, branch }, untildify(dir))
    log(`Success: ${boilerplate} has download to ${dir}`)
  } catch (e) {
    error(e)
    if (e.message && e.message.includes('status 128')) {
      warn('Permission denied, you can try it as root permission!')
    }
  }
}
