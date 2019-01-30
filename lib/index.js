'use strict'

const config = require('./config')
const ask = require('./ask')
const action = require('./action/action')
const generate = require('./generate')
const parseArgv = require('./argv')
const { isEggProject, warn, isMiniProgramProject } = require('./helper')
const execa = require('execa')
const eggInitBinPath = require.resolve('egg-init/bin/egg-init')

module.exports = async function command(argv) {
  const command = argv._[0]

  switch (command) {
    case 'addwx':
      if (!isMiniProgramProject()) {
        warn(
          'This project is not an weixinMiniProgram' +
            ' project,\nyou need app.json'
        )
        process.exit(0)
      }
      action.addpAction(argv)
      break
    case 'add':
      action.addAction(argv)
      break
    case 'rename':
      action.renameAction(argv)
      break
    case 'rm':
      action.rmAction(argv)
      break
    case 'rmwx':
      action.rmpAction(argv)
      break
    case 'pkg':
      action.pkgAction(argv)
      break
    case 'init':
      action.initAction(argv)
      break
    default:
      let targetDir = ''
      if (!isEggProject()) {
        warn(
          'This project is not an egg project,\n' +
            'run `egg-init` automatically...\n'
        )
        targetDir = process.argv.slice(2)[0]
        await execa(eggInitBinPath, [targetDir], { stdio: 'inherit' })
      }
      const anwsers = await ask()
      if (targetDir) {
        anwsers.targetDir = targetDir
      }
      await generate(anwsers)
      log('\ncreate project completed!\n')
      config.set('ezConfig', anwsers)
  }
}

module.exports(parseArgv())
