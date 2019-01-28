module.exports = function add(yargs) {
  return yargs
    .positional('entries', {
      describe: 'a list of files as the webpack entry',
    })
    .example(
      '$0 add account/login.js',
      'Add an entry login.js in account directory'
    )
    .example('$0 add account/login.js position/add.js', 'Add multiple entires')
    .option('o', {
      alias: 'only',
      describe: 'not create relatived assets of the entry',
      type: 'boolean',
    })
    .option('css', {
      describe: 'css preprocessor to use',
      choices: ['scss', 'stylus', 'less'],
      default: 'scss',
    })
    .option('scss', {
      describe: 'use scss processor',
      type: 'boolean',
    })
    .option('styl', {
      describe: 'use stylus processor',
      type: 'boolean',
    })
    .option('less', {
      describe: 'use less processor',
      type: 'boolean',
    })
    .help()
}
