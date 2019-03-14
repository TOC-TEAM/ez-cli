const { getGitUser, getManager, getPkgBoilerplates } = require('../helper')

module.exports = function pkg(yargs) {
  return yargs
    .usage('$0 pkg <pkgname> [options]')
    .example('$0 pkg react-modal')
    .example('$0 pkg @react/modal')
    .positional('pkgname', {
      describe: 'package name, can contain `@scope/` prefix as a scope package',
    })
    .options({
      author: {
        alias: 'a',
        describe: 'author of the repository',
        type: 'string',
        default: getGitUser().name,
      },
      license: {
        alias: 'l',
        describe: 'package license',
        type: 'string',
        default: 'MIT',
      },
      manager: {
        alias: 'm',
        describe: 'package manager to use',
        choices: ['npm', 'yarn'],
        default: getManager(),
      },
      test: {
        describe: 'test framework to use',
        choices: ['jest', 'ava'],
        default: 'jest',
      },
      template: {
        alias: 't',
        describe: 'template to use',
        choices: getPkgBoilerplates(),
        default: 'default',
      },
      git: {
        describe: 'exect `git init` automatically',
        type: 'boolean',
        default: true,
      },
      silent: {
        describe: "don't ask, just use default value",
        type: 'boolean',
        default: false,
      },
      repo: {
        describe: 'github repository, eg: webpack-contrib/file-loader',
        type: 'string',
        default: '',
      },
    })
}
