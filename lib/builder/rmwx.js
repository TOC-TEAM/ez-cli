module.exports = function rmwxBuilder(yargs) {
  return yargs
    .usage('$0 rm <entries..>')
    .example(
      '$0 rmp pages/login.js',
      'remove login.js' + ' from account directory'
    )
    .example(
      '$0 rmp account/login.js position/add.js',
      'remove multiple entries'
    )
    .option('a', {
      alias: 'all',
      describe: 'remove the config in app.json',
      type: 'boolean',
    })
}
