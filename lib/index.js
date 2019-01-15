'use strict'

const config = require('./config')
const ask = require('./ask')
const action = require('./action/action')
const generate = require('./generate')
const parseArgv = require('./argv')
const { isEggProject, warn } = require('./helper')

module.exports = async function command(argv) {
  const command = argv._[0]

  switch (command) {
    case 'add':
      action.addAction(argv)
      break
    case 'rename':
      action.renameAction(argv)
      break
    case 'rm':
      action.rmAction(argv)
      break
    case 'pkg':
      action.pkgAction(argv)
      break
    case 'init':
      action.initAction(argv)
      break
    default:
      if (!isEggProject()) {
        warn(
          'This command is based on egg project,\n' +
            'so you can use `egg-init` to init an egg boilerplate first.'
        )
        process.exit(1)
      }
      const anwsers = await ask()
      await generate(anwsers)
      config.set('ezConfig', anwsers)
  }
}

module.exports(parseArgv())
