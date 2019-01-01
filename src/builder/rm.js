module.exports = function rm(yargs) {
  return yargs.option('f', {
    alias: 'file',
    describe: 'remove a serial files',
    demandOption: true,
    type: 'array',
  })
}
