module.exports = function rename(yargs) {
  return yargs
    .usage('$0 rename [<oldname> <newname>] [-s] [-f]')
    .example(
      '$0 rename account/show.js hide.js',
      'from account/show.js to account/hide.js'
    )
    .example('$0 rename -s underscore', 'rename file name to underscore style')
    .example(
      '$0 rename -s undescore -f src/**/*.js',
      'rename files under src directory and its subdirectories'
    )
    .option('s', {
      alias: 'style',
      describe: 'style for file name',
      choices: ['camel', 'underscore', 'hyphen', 'pascal'],
    })
    .option('f', {
      alias: 'file',
      describe: 'glob patterns to match files',
      type: 'array',
    })
}
