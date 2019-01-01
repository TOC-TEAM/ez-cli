module.exports = function add(yargs) {
  return yargs
    .option('f', {
      alias: 'file',
      describe: 'add a serial files',
      demandOption: true,
      type: 'array',
    })
    .option('s', {
      alias: 'single',
      describe: 'create a single file',
      type: 'boolean',
    })
    .help()
}
