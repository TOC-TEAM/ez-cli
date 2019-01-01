module.exports = function tree(yargs) {
  return yargs
    .option('d', {
      describe: 'List directories only',
    })
    .option('L', {
      describe: 'Descend only level directories deep',
    })
}
