'use strict'

const config = require('./config')
const ask = require('./ask')
const action = require('./action/action')
const generate = require('./generate')
const argv = require('./argv')

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
    case 'tree':
      action.treeAction(argv)
      break
    default:
      const anwsers = await ask()
      await generate(anwsers)
      config.set('ezConfig', anwsers)
  }
}

module.exports(argv)
