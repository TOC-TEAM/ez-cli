'use strict'

const path = require('path')
const fs = require('fs')
const inquirer = require('inquirer')
const validateNpmName = require('validate-npm-package-name')
const chalk = require('chalk')
const { getPkgBoilerplates } = require('../../helper')

module.exports = function ask(argv) {
  const pkgName = argv.pkgname
  if (!pkgName) {
    throw new Error('package name must be not empty!')
  }
  if (pkgName && !validateNpmName(pkgName).validForNewPackages) {
    throw new Error(`invalid package name "${pkgName}"`)
  }

  return inquirer.prompt([
    {
      type: 'input',
      name: 'pkgName',
      message: 'Package Name',
      validate: input => {
        if (input && validateNpmName(input).validForNewPackages) {
          return true
        }
        return 'Invalid package name'
      },
      default: pkgName,
    },
    {
      type: 'input',
      name: 'override',
      default: 'y/Y',
      message(answers) {
        const shortName = answers.pkgName.split('/').pop()
        return `The directory ${chalk.yellow(
          shortName
        )} has already exists. Do you want to override it？`
      },
      when(answers) {
        return fs.existsSync(
          path.join(process.cwd(), answers.pkgName.split('/').pop())
        )
      },
      validate(input) {
        if (input.toLowerCase() === 'y' || input === 'y/Y') {
          return true
        }
        process.exit(1)
      },
    },
    {
      type: 'input',
      name: 'description',
      message: 'Package Description',
    },
    {
      type: 'input',
      name: 'author',
      message: "Author's GitHub",
      default: argv.author,
    },
    {
      type: 'input',
      name: 'repo',
      message: 'GitHub Repo Path',
      default(answers) {
        return answers.author + '/' + answers.pkgName.replace(/^@\w+\//, '')
      },
    },
    {
      type: 'input',
      name: 'license',
      message: 'License',
      default: argv.license,
    },
    {
      type: 'list',
      name: 'manager',
      message: 'Package Manager',
      choices: ['npm', 'yarn'],
      default: argv.manager,
    },
    {
      type: 'list',
      name: 'template',
      message: 'Template',
      choices: getPkgBoilerplates(),
      default: argv.template,
    },
    {
      type: 'input',
      name: 'templatePath',
      message: 'Template Path',
      when: ({ template }) => template === 'custom',
      validate: input =>
        new Promise(resolve => {
          let fullPath = path.resolve(process.cwd(), input)
          if (path.isAbsolute(input)) {
            fullPath = input
          }
          fs.stat(fullPath, err => {
            if (err) {
              return resolve(`Cannot resolve directory at: ${fullPath}`)
            }
            resolve(true)
          })
        }),
    },
    {
      type: 'list',
      name: 'test',
      message: 'Test Framework',
      choices: ['jest', 'ava'],
      default: argv.test,
    },
    {
      type: 'confirm',
      name: 'git',
      message: 'Init git automatically',
      default: argv.git,
    },
  ])
}
