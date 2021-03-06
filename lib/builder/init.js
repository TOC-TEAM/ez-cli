const { tildify } = require('../helper')

module.exports = function init(yargs) {
  return yargs
    .usage('init [dir] [options]')
    .example('$0 init zhinanzhen')
    .example('$0 init zhinanzhen --repo webpack-contrib/file-loader')
    .positional('dir', {
      describe: 'destination that download to',
    })
    .option('repo', {
      alias: 'p',
      describe: 'github group',
      default: 'toc-boilerplate',
      type: 'string',
    })
    .option('branch', {
      alias: 'b',
      describe: 'github branch',
      default: 'master',
      type: 'string',
    })
    .help()
}
