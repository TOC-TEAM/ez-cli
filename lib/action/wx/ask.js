const inquirer = require('inquirer')
const { handlerSubpackages, getAppJson } = require('../../helper')
const { isMiniProgramProject, warn } = require('../../helper')
const fse = require('fs-extra')
module.exports = function ask(argv) {
  if (!isMiniProgramProject()) {
    warn(
      'This project is not an weixinMiniProgram' +
        ' project,\nyou need app.json'
    )
    process.exit(1)
  }
  const { skip } = argv
  if (skip) {
    argv.package = 'pages'
    return argv
  } else {
    const list = handlerSubpackages(getAppJson())
    return inquirer.prompt([
      {
        type: 'list',
        name: 'package',
        message: 'Package',
        choices: list,
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
