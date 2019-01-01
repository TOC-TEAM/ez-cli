'use strict'

const ask = require('./ask')
const builder = require('./builder/builder')
const action = require('./action/action')
const generate = require('./generate')
const argv = require('yargs')
  .command('init', 'create a project', builder.initBuilder)
  .command('add', 'add a module', builder.addBuilder)
  .command('rm', 'remove a module', builder.rmBuilder)
  .command('tree', 'print the constructure of a directory', builder.treeBuilder)
  .option('i', {
    alias: 'interactive',
    describe: 'open a interactive termination',
    global: false,
  })
  .epilog(
    'For more information, you can visit https://github.com/TOC-TEAM/ez-cli'
  ).argv

module.exports = async function command(argv) {
  const command = argv._[0]
  switch (command) {
    case 'add':
      action.addAction(argv)
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
      break
  }
}

module.exports(argv)
