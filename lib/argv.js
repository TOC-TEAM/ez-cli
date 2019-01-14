'use strict'

const builder = require('./builder/builder')

const yargs = require('yargs')
  .command('init', 'create a project', builder.initBuilder)
  .command('add <entries..>', 'add an entry', builder.addBuilder)
  .command(
    'rename [oldname] [newname]',
    'rename an entry',
    builder.renameBuilder
  )
  .command('rm <entries..>', 'remove an entry', builder.rmBuilder)
  .command('tree', 'print the constructure of a directory', builder.treeBuilder)
  .command('pkg <pkgname>', 'create a modular package', builder.pkgBuilder)
  .help('h')
  .epilog(
    'For more information, you can visit https://github.com/TOC-TEAM/ez-cli'
  )

module.exports = function parseArgv(...args) {
  if (args.length > 0) {
    return yargs.parse(args)
  }
  return yargs.parse()
}
