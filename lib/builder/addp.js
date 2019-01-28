module.exports = function addpBuilder(yargs) {
  return yargs
    .positional('entries', {
      describe: 'a list of names of weixin miniprogram page',
    })
    .example('$0 addp login', 'add page login in weixin miniprogram')
    .example('$0 addp login search', 'add two page login and search')
    .options('package', {
      describe:
        'these pages are in the these package,' + ' default is the sub-package',
      alias: 'p',
      type: 'string',
    })
    .options('skip', {
      describe: 'skip choosing package',
      alias: 's',
      type: 'boolean',
      default: false,
    })
    .help()
}
