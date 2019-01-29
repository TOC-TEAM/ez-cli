const inquirer = require('inquirer')
const { handlerSubpackages, getAppJson } = require('../../helper')
const fse = require('fs-extra')
module.exports = function ask(argv) {
  const { skip } = argv
  if (skip) {
    argv.packageName = 'pages'
    return argv
  } else {
    return inquirer.prompt([
      {
        type: 'list',
        name: 'packageName',
        message: 'Package',
        choices: handlerSubpackages(getAppJson()),
        default: 'pages',
      },
      {
        type: 'input',
        name: 'newPackageName',
        message:
          'please input the new subpackage name,\n' +
          " don't input the keyword newPackage or the" +
          ' exits subpackage ',
        when: answer => {
          return 'newPackage' === answer.package
        },
        validate: input => {
          return !fse.existsSync(`${process.cwd()}/${input}`)
        },
      },
    ])
  }
}
