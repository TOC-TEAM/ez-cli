module.exports = function init(yargs) {
  return yargs
    .option('type', {
      describe: 'boilerplate type',
    })
    .option('dir', {
      describe: 'target directory',
    })
    .option('f', {
      alias: 'force',
      describe: 'force to override directory',
    })
    .option('template', {
      describe: 'local path to boilerplate',
    })
    .option('package', {
      describe: 'boilerplate package name',
    })
    .option('r', {
      alias: 'registry',
      describe:
        'npm registry, support china/npm/custom, default to auto detect',
    })
    .option('silent', {
      describe: "don't ask, just use default value",
    })
    .help()
}
