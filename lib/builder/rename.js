module.exports = function rename(yargs) {
  return yargs
    .usage('$0 rename <oldname> <newname>')
    .example(
      '$0 rename account/show.js hide.js',
      'from account/show.js to account/hide.js'
    )
    .option('s', {
      alias: 'style',
      describe: 'style for file name',
      choices: ['camel', 'underscore', 'hyphen', 'pascal'],
    })
}
