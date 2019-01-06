module.exports = function rm(yargs) {
  return yargs
    .usage('$0 rm <entries>')
    .example('$0 rm account/login.js', 'remove login.js from account directory')
    .example(
      '$0 rm account/login.js position/index.js',
      'remove multiple entries'
    )
    .option('a', {
      alias: 'all',
      describe: 'remove relatived assets of the entry',
      type: 'array',
    })
}
